// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title DataWar
/// @notice Encrypted mini-game where players receive encrypted random numbers and can claim encrypted points.
contract DataWar is SepoliaConfig {
    struct PlayerData {
        euint32[3] numbers;
        euint32 score;
        bool joined;
        bool hasClaimed;
    }

    mapping(address => PlayerData) private players;
    uint256 private joinNonce;

    event GameJoined(address indexed player);
    event PointsClaimed(address indexed player, uint8 indexed numberIndex);

    /// @notice Join the game and receive three encrypted random numbers between 1 and 100.
    function joinGame() external {
        PlayerData storage player = players[msg.sender];
        require(!player.joined, "Player already joined");

        joinNonce++;
        uint256 seed = uint256(
            keccak256(abi.encodePacked(block.prevrandao, block.number, block.timestamp, msg.sender, joinNonce))
        );

        for (uint8 i = 0; i < 3; i++) {
            seed = uint256(keccak256(abi.encodePacked(seed, i)));
            uint32 randomValue = uint32(seed % 100) + 1;
            euint32 encryptedValue = FHE.asEuint32(randomValue);

            player.numbers[i] = encryptedValue;
            FHE.allowThis(player.numbers[i]);
            FHE.allow(player.numbers[i], msg.sender);
        }

        player.score = FHE.asEuint32(0);
        FHE.allowThis(player.score);
        FHE.allow(player.score, msg.sender);

        player.joined = true;
        player.hasClaimed = false;

        emit GameJoined(msg.sender);
    }

    /// @notice Claim encrypted points using one of the previously generated numbers.
    /// @param numberIndex The index of the encrypted number to use (0, 1, or 2).
    function claimPoints(uint8 numberIndex) external {
        PlayerData storage player = players[msg.sender];
        require(player.joined, "Player not registered");
        require(!player.hasClaimed, "Points already claimed");
        require(numberIndex < 3, "Invalid number index");

        euint32 selectedNumber = player.numbers[numberIndex];

        // Ensure the contract and the player retain access to the selected number.
        FHE.allowThis(selectedNumber);
        FHE.allow(selectedNumber, msg.sender);

        player.score = FHE.add(player.score, selectedNumber);
        FHE.allowThis(player.score);
        FHE.allow(player.score, msg.sender);

        player.hasClaimed = true;

        emit PointsClaimed(msg.sender, numberIndex);
    }

    /// @notice Get the encrypted numbers assigned to a player.
    /// @param playerAddress The address of the player.
    /// @return An array with three encrypted numbers.
    function getEncryptedNumbers(address playerAddress) external view returns (euint32[3] memory) {
        PlayerData storage player = players[playerAddress];
        require(player.joined, "Player not registered");
        return player.numbers;
    }

    /// @notice Get the encrypted score for a player.
    /// @param playerAddress The address of the player.
    /// @return The encrypted score handle.
    function getEncryptedScore(address playerAddress) external view returns (euint32) {
        PlayerData storage player = players[playerAddress];
        require(player.joined, "Player not registered");
        return player.score;
    }

    /// @notice Retrieve the status of a player in the game.
    /// @param playerAddress The address to query.
    /// @return joined Whether the player has joined the game.
    /// @return hasClaimed Whether the player already claimed points.
    function getPlayerStatus(address playerAddress) external view returns (bool joined, bool hasClaimed) {
        PlayerData storage player = players[playerAddress];
        return (player.joined, player.hasClaimed);
    }
}
