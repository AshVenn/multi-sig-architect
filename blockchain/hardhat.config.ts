import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@nomicfoundation/hardhat-verify';
import 'dotenv/config';

const config: HardhatUserConfig = {
    solidity: '0.8.19',
    networks: {
        // sepolia: {
        //     url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        //     accounts: [process.env.SEPOLIA_PRIVATE_KEY as string],
        // },
        localhost: {
        url: "http://127.0.0.1:8545"
        },
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

export default config;
