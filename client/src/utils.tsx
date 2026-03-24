// added akm
import { hardhat } from 'viem/chains';
//  and added
import { WalletAbi } from './contracts/WalletAbi';
import {
    Address,
    GetContractReturnType,
    PublicClient,
    WalletClient,
    createPublicClient,
    createWalletClient,
    custom,
    getContract,
    http,
    publicActions,
} from 'viem';

export type WalletContract = GetContractReturnType<
    typeof WalletAbi,
    PublicClient,
    WalletClient
>;

export type Transfer = {
    id: bigint;
    amount: bigint;
    to: Address;
    approvals: bigint;
    sent: boolean;
};

export const WALLET_ADDRESS = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

export const getWallet = async (
    walletClient: WalletClient,
    publicClient: PublicClient
) => {
    const wallet = getContract({
        address: WALLET_ADDRESS,
        abi: WalletAbi,
        walletClient,
        publicClient,
    });
    return wallet;
};



export function getPublicClient() {
    return createPublicClient({
        chain: hardhat,
        transport: http('http://127.0.0.1:8545'),
    });
}

export function getWalletClient() {
    return createWalletClient({
        chain: hardhat,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        transport: custom(window.ethereum),
    }).extend(publicActions);
}
