import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers, fhevm } from "hardhat";
import { EncryptedNumbersGame, EncryptedNumbersGame__factory } from "../types";
import { FhevmType } from "@fhevm/hardhat-plugin";

type Signers = {
  deployer: HardhatEthersSigner;
  alice: HardhatEthersSigner;
  bob: HardhatEthersSigner;
};

async function deployFixture() {
  const factory = (await ethers.getContractFactory("EncryptedNumbersGame")) as EncryptedNumbersGame__factory;
  const contract = (await factory.deploy()) as EncryptedNumbersGame;
  const contractAddress = await contract.getAddress();

  return { contract, contractAddress };
}

async function decryptNumbers(
  encrypted: readonly string[],
  contractAddress: string,
  signer: HardhatEthersSigner,
) {
  const clearNumbers: number[] = [];

  for (const handle of encrypted) {
    const clear = await fhevm.userDecryptEuint(FhevmType.euint32, handle, contractAddress, signer);
    clearNumbers.push(Number(clear));
  }

  return clearNumbers;
}

describe("EncryptedNumbersGame", function () {
  let signers: Signers;
  let contract: EncryptedNumbersGame;
  let contractAddress: string;

  before(async function () {
    const ethSigners: HardhatEthersSigner[] = await ethers.getSigners();
    signers = { deployer: ethSigners[0], alice: ethSigners[1], bob: ethSigners[2] };
  });

  beforeEach(async function () {
    if (!fhevm.isMock) {
      console.warn(`This hardhat test suite cannot run on Sepolia Testnet`);
      this.skip();
    }

    ({ contract, contractAddress } = await deployFixture());
  });

  it("assigns three encrypted numbers within range when joining", async function () {
    await contract.connect(signers.alice).joinGame();

    const encryptedNumbers = await contract.getEncryptedNumbers(signers.alice.address);
    expect(encryptedNumbers.length).to.eq(3);

    const clearNumbers = await decryptNumbers(encryptedNumbers, contractAddress, signers.alice);
    for (const value of clearNumbers) {
      expect(value).to.be.gte(1);
      expect(value).to.be.lte(100);
    }

    const encryptedScore = await contract.getEncryptedScore(signers.alice.address);
    const clearScore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedScore,
      contractAddress,
      signers.alice,
    );
    expect(Number(clearScore)).to.eq(0);

    const status = await contract.getPlayerStatus(signers.alice.address);
    expect(status.joined).to.eq(true);
    expect(status.hasClaimed).to.eq(false);
  });

  it("adds the selected encrypted number to the score", async function () {
    await contract.connect(signers.alice).joinGame();
    const encryptedNumbers = await contract.getEncryptedNumbers(signers.alice.address);
    const clearNumbers = await decryptNumbers(encryptedNumbers, contractAddress, signers.alice);

    const targetIndex = clearNumbers.indexOf(Math.max(...clearNumbers));

    await contract.connect(signers.alice).claimPoints(targetIndex);

    const encryptedScore = await contract.getEncryptedScore(signers.alice.address);
    const clearScore = await fhevm.userDecryptEuint(
      FhevmType.euint32,
      encryptedScore,
      contractAddress,
      signers.alice,
    );

    expect(Number(clearScore)).to.eq(clearNumbers[targetIndex]);

    const status = await contract.getPlayerStatus(signers.alice.address);
    expect(status.hasClaimed).to.eq(true);
  });

  it("prevents joining twice", async function () {
    await contract.connect(signers.alice).joinGame();
    await expect(contract.connect(signers.alice).joinGame()).to.be.revertedWith("Player already joined");
  });

  it("prevents claiming twice", async function () {
    await contract.connect(signers.alice).joinGame();
    await contract.connect(signers.alice).claimPoints(0);

    await expect(contract.connect(signers.alice).claimPoints(0)).to.be.revertedWith("Points already claimed");
  });

  it("reverts when claiming with invalid index", async function () {
    await contract.connect(signers.alice).joinGame();
    await expect(contract.connect(signers.alice).claimPoints(3)).to.be.revertedWith("Invalid number index");
  });
});
