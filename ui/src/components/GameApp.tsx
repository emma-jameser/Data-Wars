import { useMemo, useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { ethers } from 'ethers';

import { Header } from './Header';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { useEthersSigner } from '../hooks/useEthersSigner';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import '../styles/GameApp.css';

type PlayerStatus = {
  joined: boolean;
  hasClaimed: boolean;
};

type HexString = `0x${string}`;

const NUMBER_INDICES = [0, 1, 2] as const;

export function GameApp() {
  const { address, isConnected } = useAccount();
  const { instance, isLoading: isInstanceLoading, error: instanceError } = useZamaInstance();
  const signer = useEthersSigner();

  const [contractAddress, setContractAddress] = useState<string>(CONTRACT_ADDRESS);
  const [addressInput, setAddressInput] = useState<string>(CONTRACT_ADDRESS);
  const [joining, setJoining] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [decryptingNumbers, setDecryptingNumbers] = useState(false);
  const [decryptingScore, setDecryptingScore] = useState(false);
  const [decryptedNumbers, setDecryptedNumbers] = useState<number[] | null>(null);
  const [decryptedScore, setDecryptedScore] = useState<number | null>(null);

  const hasValidContract =
    /^0x[a-fA-F0-9]{40}$/i.test(contractAddress) &&
    contractAddress !== '0x0000000000000000000000000000000000000000';
  const contractAddressTyped = contractAddress as HexString;

  const { data: statusData, refetch: refetchStatus } = useReadContract({
    address: contractAddressTyped,
    abi: CONTRACT_ABI,
    functionName: 'getPlayerStatus',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(hasValidContract && isConnected && address),
    },
  });

  const playerStatus: PlayerStatus = useMemo(() => {
    if (!statusData) {
      return { joined: false, hasClaimed: false };
    }

    if (Array.isArray(statusData)) {
      const [joined, hasClaimed] = statusData as readonly [boolean, boolean];
      return { joined, hasClaimed };
    }

    if (
      typeof statusData === 'object' &&
      statusData !== null &&
      'joined' in statusData &&
      'hasClaimed' in statusData
    ) {
      const { joined, hasClaimed } = statusData as {
        joined: unknown;
        hasClaimed: unknown;
      };
      return {
        joined: Boolean(joined),
        hasClaimed: Boolean(hasClaimed),
      };
    }

    return { joined: false, hasClaimed: false };
  }, [statusData]);

  const { data: encryptedNumbers, refetch: refetchNumbers } = useReadContract({
    address: contractAddressTyped,
    abi: CONTRACT_ABI,
    functionName: 'getEncryptedNumbers',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(hasValidContract && isConnected && address && playerStatus.joined),
    },
  });

  const { data: encryptedScore, refetch: refetchScore } = useReadContract({
    address: contractAddressTyped,
    abi: CONTRACT_ABI,
    functionName: 'getEncryptedScore',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(hasValidContract && isConnected && address && playerStatus.joined),
    },
  });

  const resetDecryptions = () => {
    setDecryptedNumbers(null);
    setDecryptedScore(null);
  };

  const applyContractAddress = () => {
    if (!/^0x[a-fA-F0-9]{40}$/i.test(addressInput)) {
      alert('Enter a valid contract address.');
      return;
    }

    setContractAddress(addressInput);
    resetDecryptions();
  };

  const handleJoin = async () => {
    if (!hasValidContract) {
      alert('Set a valid contract address before joining.');
      return;
    }

    if (!signer) {
      alert('Connect your wallet to join the game.');
      return;
    }

    try {
      setJoining(true);
      const signerInstance = await signer;
      if (!signerInstance) {
        throw new Error('Signer unavailable');
      }

      const contract = new ethers.Contract(contractAddressTyped, CONTRACT_ABI, signerInstance);
      const tx = await contract.joinGame();
      await tx.wait();

      resetDecryptions();
      await Promise.all([refetchStatus(), refetchNumbers(), refetchScore()]);
      alert('You have successfully joined the game!');
    } catch (error) {
      console.error('Failed to join game', error);
      alert(`Failed to join game: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setJoining(false);
    }
  };

  const handleClaim = async (index: number) => {
    if (!hasValidContract) {
      alert('Set a valid contract address before claiming points.');
      return;
    }

    if (!playerStatus.joined) {
      alert('Join the game before claiming points.');
      return;
    }

    if (playerStatus.hasClaimed) {
      alert('You already claimed your points.');
      return;
    }

    if (!signer) {
      alert('Connect your wallet to claim points.');
      return;
    }

    try {
      setClaiming(true);
      const signerInstance = await signer;
      if (!signerInstance) {
        throw new Error('Signer unavailable');
      }

      const contract = new ethers.Contract(contractAddressTyped, CONTRACT_ABI, signerInstance);
      const tx = await contract.claimPoints(index);
      await tx.wait();

      setDecryptedScore(null);
      await Promise.all([refetchStatus(), refetchScore()]);
      alert('Points claimed successfully!');
    } catch (error) {
      console.error('Failed to claim points', error);
      alert(`Failed to claim points: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setClaiming(false);
    }
  };

  const decryptNumbers = async () => {
    if (!hasValidContract) {
      alert('Set a valid contract address before decrypting numbers.');
      return;
    }

    if (!instance) {
      alert('Encryption service is not ready yet.');
      return;
    }

    if (!address || !encryptedNumbers) {
      alert('No encrypted numbers available to decrypt.');
      return;
    }

    if (!signer) {
      alert('Connect your wallet to decrypt numbers.');
      return;
    }

    try {
      setDecryptingNumbers(true);
      const signerInstance = await signer;
      if (!signerInstance) {
        throw new Error('Signer unavailable');
      }

      const rawHandles = Array.isArray(encryptedNumbers)
        ? encryptedNumbers
        : [encryptedNumbers];
      const numbersArray = rawHandles.filter(
        (handle): handle is HexString => typeof handle === 'string',
      );

      const keypair = instance.generateKeypair();
      const handleContractPairs = numbersArray.map((handle) => ({
        handle,
        contractAddress: contractAddressTyped,
      }));

      const startTimeStamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = '10';
      const contractAddresses = [contractAddressTyped];

      const eip712 = instance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimeStamp,
        durationDays,
      );

      const signature = await signerInstance.signTypedData(
        eip712.domain,
        {
          UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification,
        },
        eip712.message,
      );

      const decryptedResult = await instance.userDecrypt(
        handleContractPairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace('0x', ''),
        contractAddresses,
        address,
        startTimeStamp,
        durationDays,
      );

      const clearValues = numbersArray.map((handle) => {
        const raw = decryptedResult[handle];
        return Number(raw ?? 0);
      });

      setDecryptedNumbers(clearValues);
    } catch (error) {
      console.error('Failed to decrypt numbers', error);
      alert(`Failed to decrypt numbers: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDecryptingNumbers(false);
    }
  };

  const decryptScore = async () => {
    if (!hasValidContract) {
      alert('Set a valid contract address before decrypting your score.');
      return;
    }

    if (!instance) {
      alert('Encryption service is not ready yet.');
      return;
    }

    if (!address || !encryptedScore) {
      alert('No encrypted score available to decrypt.');
      return;
    }

    if (!signer) {
      alert('Connect your wallet to decrypt your score.');
      return;
    }

    try {
      setDecryptingScore(true);
      const signerInstance = await signer;
      if (!signerInstance) {
        throw new Error('Signer unavailable');
      }

      const handle = encryptedScore as string;
      const keypair = instance.generateKeypair();
      const handleContractPairs = [
        {
          handle,
          contractAddress: contractAddressTyped,
        },
      ];

      const startTimeStamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = '10';
      const contractAddresses = [contractAddressTyped];

      const eip712 = instance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimeStamp,
        durationDays,
      );

      const signature = await signerInstance.signTypedData(
        eip712.domain,
        {
          UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification,
        },
        eip712.message,
      );

      const decryptedResult = await instance.userDecrypt(
        handleContractPairs,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace('0x', ''),
        contractAddresses,
        address,
        startTimeStamp,
        durationDays,
      );

      const clearScoreValue = decryptedResult[handle];
      setDecryptedScore(clearScoreValue ? Number(clearScoreValue) : 0);
    } catch (error) {
      console.error('Failed to decrypt score', error);
      alert(`Failed to decrypt score: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDecryptingScore(false);
    }
  };

  return (
    <div className="game-app">
      <Header />
      <main className="game-main">
        <section className="game-card">
          <h2 className="card-title">Encrypted Numbers Game</h2>
          <p className="card-description">
            Join the game to receive three encrypted random numbers between 1 and 100. Decrypt them locally,
            choose your favorite, and claim encrypted points on-chain.
          </p>

          <div className="address-section">
            <label className="address-label" htmlFor="game-contract-address">
              Contract address
            </label>
            <div className="address-controls">
              <input
                id="game-contract-address"
                className="address-input"
                value={addressInput}
                onChange={(event) => setAddressInput(event.target.value)}
                placeholder="0x..."
              />
              <button
                type="button"
                className="secondary-button"
                onClick={() => applyContractAddress()}
                disabled={addressInput === contractAddress}
              >
                Apply
              </button>
            </div>
            {!hasValidContract ? (
              <p className="address-hint">Set the deployed contract address on Sepolia before interacting.</p>
            ) : null}
          </div>

          {!isConnected ? (
            <div className="info-banner">
              <p>Connect your wallet to get started.</p>
            </div>
          ) : null}

          {instanceError ? (
            <div className="error-banner">
              <p>{instanceError}</p>
            </div>
          ) : null}

          {isInstanceLoading ? (
            <div className="info-banner">
              <p>Preparing the encryption service...</p>
            </div>
          ) : null}

          {playerStatus.joined ? (
            <div className="status-badge success">Joined</div>
          ) : (
            <div className="status-badge muted">Not joined</div>
          )}

          {playerStatus.hasClaimed ? (
            <div className="status-badge claim">Points claimed</div>
          ) : null}

          <div className="actions">
            <button
              className="primary-button"
              onClick={handleJoin}
              disabled={joining || !isConnected || playerStatus.joined || !hasValidContract}
            >
              {joining ? 'Joining...' : playerStatus.joined ? 'Already Joined' : 'Join Game'}
            </button>
          </div>
        </section>

        {playerStatus.joined ? (
          <section className="game-card">
            <h3 className="section-title">Your Encrypted Numbers</h3>
            <p className="section-description">
              Decrypt your numbers locally with Zama FHE technology. Only you can view the clear values.
            </p>

            <div className="number-grid">
              {NUMBER_INDICES.map((index) => {
                const encryptedHandle = Array.isArray(encryptedNumbers)
                  ? (encryptedNumbers as readonly string[])[index]
                  : undefined;
                const decryptedValue = decryptedNumbers ? decryptedNumbers[index] : null;

                return (
                  <div className="number-card" key={index}>
                    <span className="number-label">Number {index + 1}</span>
                    <span className="number-handle">{encryptedHandle ?? '—'}</span>
                    <span className="number-value">
                      {decryptedValue !== null && decryptedValue !== undefined ? decryptedValue : 'Hidden'}
                    </span>
                    <button
                      className="secondary-button"
                      onClick={() => handleClaim(index)}
                      disabled={claiming || playerStatus.hasClaimed || !hasValidContract}
                    >
                      {playerStatus.hasClaimed ? 'Already Claimed' : claiming ? 'Claiming...' : 'Claim Points'}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="actions">
              <button
                className="primary-button"
                onClick={decryptNumbers}
                disabled={decryptingNumbers || !encryptedNumbers || !hasValidContract}
              >
                {decryptingNumbers ? 'Decrypting...' : 'Decrypt Numbers'}
              </button>
            </div>
          </section>
        ) : null}

        {playerStatus.joined ? (
          <section className="game-card">
            <h3 className="section-title">Encrypted Score</h3>
            <p className="section-description">
              Your score stays encrypted on-chain. Decrypt it locally whenever you want to check your progress.
            </p>

            <div className="score-display">
              <span className="score-label">Encrypted handle</span>
              <span className="score-handle">{(encryptedScore as string) ?? '—'}</span>
              <span className="score-value">
                {decryptedScore !== null && decryptedScore !== undefined ? decryptedScore : 'Hidden'}
              </span>
            </div>

            <div className="actions">
              <button
                className="primary-button"
                onClick={decryptScore}
                disabled={decryptingScore || !encryptedScore || !hasValidContract}
              >
                {decryptingScore ? 'Decrypting...' : 'Decrypt Score'}
              </button>
            </div>
          </section>
        ) : null}

        {playerStatus.joined ? (
          <section className="game-card">
            <h3 className="section-title">How it works</h3>
            <ul className="info-list">
              <li>Join to receive three encrypted random numbers between 1 and 100.</li>
              <li>Decrypt them locally with the Zama Relayer — only you can view the clear values.</li>
              <li>Pick one number to claim encrypted points. The score stays confidential on-chain.</li>
              <li>You can decrypt your score at any time to see your progress.</li>
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  );
}
