import { useState, useCallback } from 'react';
import {
    getWallet,
    getWalletClient,
    getPublicClient,
    WalletContract,
    Transfer,
    WALLET_ADDRESS,
} from './utils';
import Header from './Header';
import NewTransfer from './NewTransfer';
import TransferList from './TransferList';
import { shortenAddress } from './display';
import { Address, PublicClient } from 'viem';
import ConnectWallet from './ConnectWallet';

export default function App() {
    const [publicClient, setPublicClient] = useState<PublicClient | null>(null);
    const [accounts, setAccounts] = useState<Array<Address> | null>(null);
    const [wallet, setWallet] = useState<WalletContract | null>(null);
    const [approvers, setApprovers] = useState<readonly Address[] | null>(null);
    const [quorum, setQuorum] = useState<bigint | null>(null);
    const [transfers, setTransfers] = useState<Array<Transfer>>([]);
    const [balance, setBalance] = useState<bigint | null>(null);

    const getTransfers = useCallback(
        async (wallet: WalletContract) => {
            setTransfers([]);
            const transfers = await wallet.read.getTransfers();
            setTransfers(transfers);
        },
        []
    );

    const connectWallet = useCallback(async () => {
        const walletClient = getWalletClient();
        const publicClient = getPublicClient();
        const accounts = await walletClient.requestAddresses();
        setAccounts(accounts);
        const wallet = await getWallet(walletClient, publicClient);
        const approvers = await wallet.read.getApprovers();
        const quorum = await wallet.read.quorum();
        const balance = await publicClient.getBalance({
            address: wallet.address,
        });
        await getTransfers(wallet);
        setPublicClient(publicClient);
        setAccounts(accounts);
        setWallet(wallet);
        setApprovers(approvers);
        setQuorum(quorum);
        setBalance(balance);
    }, [getTransfers]);

    const createTransfer = async (transfer: { amount: string; to: string }) => {
        if (!wallet || !publicClient || !accounts) return;
        const hash = await wallet.write.createTransfer(
            [BigInt(transfer.amount), transfer.to as Address],
            {
                account: accounts[0],
            }
        );
        await publicClient.waitForTransactionReceipt({ hash });
        setTransfers([]);
        await getTransfers(wallet);
    };

    const approveTransfer = async (transferId: string) => {
        if (!wallet || !publicClient || !accounts) return;
        const hash = await wallet.write.approveTransfer([BigInt(transferId)], {
            account: accounts[0],
        });
        await publicClient.waitForTransactionReceipt({ hash });
        await getTransfers(wallet);
    };

    if (
        accounts === null ||
        wallet === null ||
        quorum === null ||
        balance === null ||
        approvers === null
    ) {
        return <ConnectWallet connectWallet={connectWallet} />;
    }

    const activeAccount = accounts[0];

    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/20 bg-[#111316]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <span className="font-headline text-xl font-black tracking-tight">
                                ARCHITECT
                            </span>
                            <span className="hidden rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary md:inline-flex">
                                Multisig Wallet
                            </span>
                        </div>
                        <div className="hidden gap-6 text-sm text-on-surface-variant md:flex">
                            <a className="transition-colors hover:text-on-surface" href="#wallet-summary">
                                Dashboard
                            </a>
                            <a className="transition-colors hover:text-on-surface" href="#ledger">
                                Ledger
                            </a>
                            <a className="transition-colors hover:text-on-surface" href="#transfer-form">
                                Propose
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="hidden text-right md:block">
                            <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                Connected Wallet
                            </p>
                            <p className="font-mono text-sm text-primary">
                                {shortenAddress(activeAccount, 7, 5)}
                            </p>
                        </div>
                        <button className="editorial-gradient rounded-lg px-4 py-2 text-sm font-headline font-bold text-on-primary shadow-lg shadow-black/20">
                            {shortenAddress(activeAccount, 5, 4)}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8">
                <header className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">
                            Connected Dashboard
                        </p>
                        <h1 className="mt-4 font-headline text-5xl font-extrabold tracking-tight">
                            Vault Dashboard
                        </h1>
                        <div className="mt-5 flex flex-wrap gap-3">
                            <span className="inline-flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                <span className="material-symbols-outlined text-secondary">public</span>
                                Hardhat Local
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-lg bg-surface-container-low px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                <span className="material-symbols-outlined text-primary">
                                    account_balance_wallet
                                </span>
                                {shortenAddress(WALLET_ADDRESS, 8, 5)}
                            </span>
                        </div>
                    </div>

                    <button
                        className="inline-flex items-center gap-2 rounded-lg bg-surface-container-high px-4 py-3 text-sm font-headline font-bold uppercase tracking-[0.14em] text-on-surface transition-colors hover:bg-surface-container-highest"
                        onClick={() => {
                            void connectWallet();
                        }}
                    >
                        <span className="material-symbols-outlined">refresh</span>
                        Refresh
                    </button>
                </header>

                <div id="wallet-summary">
                    <Header
                        approvers={approvers}
                        quorum={quorum}
                        balance={balance}
                        activeAccount={activeAccount}
                    />
                </div>

                <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
                    <div id="ledger" className="space-y-8 lg:col-span-8">
                        <TransferList
                            transfers={transfers}
                            approveTransfer={approveTransfer}
                        />
                    </div>

                    <div className="space-y-8 lg:col-span-4">
                        <div id="transfer-form">
                            <NewTransfer createTransfer={createTransfer} />
                        </div>

                        <aside className="rounded-[26px] border border-outline-variant/10 bg-surface-container-lowest p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <span className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_12px_rgba(102,221,139,0.5)]" />
                                <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-on-surface">
                                    Project Credits
                                </h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                        Makers
                                    </p>
                                    <p className="mt-2 font-headline text-xl font-bold">
                                        ZOUHAIRI Youness
                                    </p>
                                    <p className="mt-1 font-headline text-xl font-bold">
                                        MOUSSAOUI Abdelkarim
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                            Network
                                        </p>
                                        <p className="mt-2 font-headline text-lg font-bold">Hardhat</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                            Wallet
                                        </p>
                                        <p className="mt-2 font-mono text-sm text-on-surface">
                                            {shortenAddress(WALLET_ADDRESS, 7, 5)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>

                <footer className="mt-16 border-t border-outline-variant/20 py-10">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <p className="font-headline text-lg font-bold">ARCHITECT</p>
                            <p className="mt-2 text-xs uppercase tracking-[0.22em] text-on-surface-variant">
                                Academic multisig wallet built by ZOUHAIRI Youness and MOUSSAOUI Abdelkarim
                            </p>
                        </div>
                        <p className="text-xs uppercase tracking-[0.22em] text-on-surface-variant">
                            Connect, propose, approve, and monitor treasury activity.
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}
