import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, fhevm, deployments } from "hardhat";
import { EncryptedNumbersGame } from "../types";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  alice: HardhatEthersSigner;
};

describe("EncryptedNumbersGameSepolia", function () {
  let signers: Signers;
  let contract: EncryptedNumbersGame;
  let contractAddress: string;
  let step: number;
  let steps: number;

  function progress(message: string) {
    console.log(`${++step}/${steps} ${message}`);
  }

  before(async function () {
    if (fhevm.isMock) {
      console.warn(`This hardhat test suite can only run on Sepolia Testnet`);
      this.skip();
    }

    try {
      const deployment = await deployments.get("EncryptedNumbersGame");
      contractAddress = deployment.address;
      contract = (await ethers.getContractAt("EncryptedNumbersGame", deployment.address)) as EncryptedNumbersGame;
    } catch (e) {
      (e as Error).message += ". Call 'npx hardhat deploy --network sepolia'";
      throw e;
    }

    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { alice: ethSigners[0] };
  });

  beforeEach(async () => {
    step = 0;
    steps = 0;
  });

  it("joins the game and claims encrypted points", async function () {
    steps = 12;

    this.timeout(4 * 40000);

    progress("Checking player status...");
    const statusBefore = await contract.getPlayerStatus(signers.alice.address);

    if (!statusBefore.joined) {
      progress("Joining the encrypted numbers game...");
      const joinTx = await contract.connect(signers.alice).joinGame();
      await joinTx.wait();
    } else {
      progress("Player already joined; skipping join");
    }

    progress("Fetching encrypted numbers...");
    const encryptedNumbers = await contract.getEncryptedNumbers(signers.alice.address);
    for (const handle of encryptedNumbers) {
      expect(handle).to.not.eq(ethers.ZeroHash);
    }

    progress("Decrypting encrypted numbers...");
    const clearNumbers: number[] = [];
    for (const handle of encryptedNumbers) {
      const clear = await fhevm.userDecryptEuint(FhevmType.euint32, handle, contractAddress, signers.alice);
      clearNumbers.push(Number(clear));
    }
    progress(`Decrypted numbers: ${clearNumbers.join(", ")}`);

    progress("Fetching encrypted score before claim...");
    const encryptedScoreBefore = await contract.getEncryptedScore(signers.alice.address);
    const clearScoreBefore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedScoreBefore,
      contractAddress,
      signers.alice,
    );
    progress(`Clear score before claim: ${clearScoreBefore}`);

    const targetIndex = clearNumbers.indexOf(Math.max(...clearNumbers));

    if (!statusBefore.hasClaimed) {
      progress(`Claiming points with index ${targetIndex}...`);
      const claimTx = await contract.connect(signers.alice).claimPoints(targetIndex);
      await claimTx.wait();
    } else {
      progress("Points already claimed; skipping claim transaction");
    }

    progress("Fetching encrypted score after claim...");
    const encryptedScoreAfter = await contract.getEncryptedScore(signers.alice.address);
    const clearScoreAfter = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedScoreAfter,
      contractAddress,
      signers.alice,
    );
    progress(`Clear score after claim: ${clearScoreAfter}`);

    if (!statusBefore.hasClaimed) {
      expect(Number(clearScoreAfter)).to.eq(Math.max(...clearNumbers));
    }

    const statusAfter = await contract.getPlayerStatus(signers.alice.address);
    expect(statusAfter.joined).to.eq(true);
    expect(statusAfter.hasClaimed).to.eq(true);
  });
});
