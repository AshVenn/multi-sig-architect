import { PrimaryButton } from './components/PrimaryButton';

export type ConnectWalletProps = {
    connectWallet: () => Promise<void>;
};

export default function ConnectWallet({ connectWallet }: ConnectWalletProps) {
    return (
        <div className="min-h-screen bg-surface text-on-surface">
            <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/20 bg-[#111316]/80 backdrop-blur-xl">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <span className="font-headline text-xl font-black tracking-tight">
                            ARCHITECT
                        </span>
                        <span className="hidden rounded-full border border-secondary/20 bg-secondary-container/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-secondary md:inline-flex">
                            Academic Project Showcase
                        </span>
                    </div>
                    <div className="hidden items-center gap-8 text-sm text-on-surface-variant md:flex">
                        <a className="transition-colors hover:text-on-surface" href="#how-it-works">
                            How It Works
                        </a>
                        <a className="transition-colors hover:text-on-surface" href="#makers">
                            Makers
                        </a>
                        <a className="transition-colors hover:text-on-surface" href="#preview">
                            Dashboard
                        </a>
                    </div>
                    <PrimaryButton
                        action={connectWallet}
                        className="px-4 py-2 text-[11px] tracking-[0.18em]"
                    >
                        Connect Wallet
                    </PrimaryButton>
                </div>
            </nav>

            <main className="pt-20">
                <section className="mesh-gradient relative overflow-hidden px-6 py-20 md:px-8 md:py-28">
                    <div className="noise-overlay" />
                    <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                        <div className="relative z-10 max-w-3xl">
                            <div className="mb-6 inline-flex items-center rounded-full border border-secondary/20 bg-secondary-container/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-secondary">
                                Institutional Grade Academic Demo
                            </div>
                            <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface md:text-7xl md:leading-[0.92]">
                                The Ledger of <span className="metallic-text">Consensus.</span>
                            </h1>
                            <p className="mt-8 max-w-2xl text-base leading-8 text-on-surface-variant md:text-lg">
                                A multisignature wallet interface designed for an academic project on
                                decentralized governance. The experience showcases wallet connection,
                                quorum-based approvals, transfer proposals, and treasury visibility in a
                                premium architectural shell.
                            </p>
                            <p className="mt-4 text-sm uppercase tracking-[0.22em] text-on-primary-container">
                                Made by ZOUHAIRI Youness and MOUSSAOUI Abdelkarim
                            </p>
                            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                                <PrimaryButton
                                    action={connectWallet}
                                    className="w-full sm:w-auto"
                                >
                                    Launch Vault
                                </PrimaryButton>
                                <a
                                    className="inline-flex min-h-[46px] items-center justify-center rounded-lg border border-outline-variant/20 bg-surface-container-high/40 px-5 py-3 font-headline text-sm font-bold uppercase tracking-[0.14em] text-on-surface transition-colors hover:bg-surface-container-highest/60"
                                    href="#how-it-works"
                                >
                                    View Case Study
                                </a>
                            </div>
                        </div>

                        <div id="preview" className="relative z-10">
                            <div className="rounded-[28px] border border-outline-variant/20 bg-surface-container-low p-3 shadow-2xl shadow-black/40">
                                <div className="overflow-hidden rounded-[22px] border border-outline-variant/10 bg-surface-container">
                                    <div className="flex items-center justify-between border-b border-outline-variant/10 px-4 py-3">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                Dashboard Preview
                                            </p>
                                            <p className="font-headline text-lg font-bold">
                                                Vault Dashboard
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-surface-container-high px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-secondary">
                                            Hardhat Local
                                        </span>
                                    </div>
                                    <div className="space-y-4 p-4">
                                        <div className="grid gap-3 md:grid-cols-3">
                                            <div className="rounded-2xl bg-surface-container-low p-4">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                    Balance
                                                </p>
                                                <p className="mt-3 font-headline text-2xl font-extrabold">
                                                    1.00 <span className="text-sm text-primary">ETH</span>
                                                </p>
                                            </div>
                                            <div className="rounded-2xl bg-surface-container-low p-4">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                    Quorum
                                                </p>
                                                <p className="mt-3 font-headline text-2xl font-extrabold">2 / 3</p>
                                            </div>
                                            <div className="rounded-2xl bg-surface-container-low p-4">
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                    Signers
                                                </p>
                                                <p className="mt-3 font-headline text-2xl font-extrabold">
                                                    3 <span className="text-sm text-secondary">active</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-tertiary/20 bg-surface-container-lowest p-5">
                                            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                        Proposal
                                                    </p>
                                                    <p className="mt-1 font-headline text-xl font-bold">Transfer #102</p>
                                                    <p className="text-sm text-on-surface-variant">
                                                        Awaiting one more signature before execution.
                                                    </p>
                                                </div>
                                                <div className="min-w-[180px]">
                                                    <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                        <span>Approvals</span>
                                                        <span>2 / 3</span>
                                                    </div>
                                                    <div className="h-2 overflow-hidden rounded-full bg-surface-container">
                                                        <div className="h-full w-2/3 bg-tertiary" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-2xl border border-outline-variant/10 bg-surface-container-high/60 p-4">
                                            <div className="grid gap-3 md:grid-cols-2">
                                                <div className="space-y-2 rounded-xl bg-surface-container-low p-4">
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                        Recipient Address
                                                    </p>
                                                    <div className="h-11 rounded-lg bg-surface-container-highest" />
                                                </div>
                                                <div className="space-y-2 rounded-xl bg-surface-container-low p-4">
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                        Amount (wei)
                                                    </p>
                                                    <div className="h-11 rounded-lg bg-surface-container-highest" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section
                    id="makers"
                    className="border-y border-outline-variant/10 bg-surface-container-low px-6 py-20 md:px-8"
                >
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-10 max-w-2xl">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-tertiary">
                                Academic Project
                            </p>
                            <h2 className="mt-4 font-headline text-4xl font-bold tracking-tight">
                                Presented by the makers behind the vault.
                            </h2>
                            <p className="mt-4 leading-8 text-on-surface-variant">
                                This academic project demonstrates how a multisig wallet can require
                                multiple approvers before executing a transfer, making shared treasury
                                management safer and easier to understand.
                            </p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {[
                                ['ZOUHAIRI Youness', 'Smart contract architecture and project presentation', 'ZY'],
                                ['MOUSSAOUI Abdelkarim', 'Frontend integration and multisig workflow implementation', 'MA'],
                            ].map(([name, role, initials]) => (
                                <article
                                    key={name}
                                    className="glass-panel rounded-[28px] border border-outline-variant/10 p-6 shadow-glow"
                                >
                                    <div className="flex flex-col gap-6 md:flex-row md:items-center">
                                        <div className="editorial-gradient flex h-36 w-full max-w-[180px] items-center justify-center rounded-[24px] text-4xl font-headline font-extrabold text-on-primary">
                                            {initials}
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="font-headline text-2xl font-bold">{name}</h3>
                                            <p className="leading-7 text-on-surface-variant">{role}</p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="how-it-works" className="bg-surface px-6 py-20 md:px-8">
                    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                        <div className="space-y-5">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-secondary">
                                Workflow
                            </p>
                            <h2 className="font-headline text-4xl font-bold tracking-tight">
                                A clean approval lifecycle for a multisig treasury.
                            </h2>
                            <p className="max-w-xl leading-8 text-on-surface-variant">
                                The interface should communicate the three key stages clearly: create a
                                proposal, collect signatures from approvers, then execute once quorum is met.
                            </p>
                        </div>
                        <div className="space-y-5">
                            {[
                                ['01', 'Create Transfer', 'Draft a transaction proposal with a recipient and a wei amount inside a secure treasury dashboard.', 'account_balance_wallet', 'primary'],
                                ['02', 'Collect Approvals', 'Track quorum progress visually while each signer confirms the proposal from their connected account.', 'groups', 'secondary'],
                                ['03', 'Execute Transfer', 'After the required threshold is reached, the wallet finalizes the transfer and marks it as sent.', 'task_alt', 'tertiary'],
                            ].map(([step, title, description, icon, tone]) => (
                                <article
                                    key={step}
                                    className={`relative overflow-hidden rounded-[28px] border p-7 ${
                                        tone === 'secondary'
                                            ? 'border-secondary/20 bg-surface-container-high'
                                            : 'border-outline-variant/10 bg-surface-container'
                                    }`}
                                >
                                    <div className="absolute right-6 top-4 text-7xl font-headline font-extrabold text-on-surface/[0.04]">
                                        {step}
                                    </div>
                                    <span
                                        className={`material-symbols-outlined mb-5 text-4xl ${
                                            tone === 'primary'
                                                ? 'text-primary'
                                                : tone === 'secondary'
                                                  ? 'text-secondary'
                                                  : 'text-tertiary'
                                        }`}
                                    >
                                        {icon}
                                    </span>
                                    <h3 className="font-headline text-2xl font-bold">{title}</h3>
                                    <p className="mt-3 max-w-xl leading-7 text-on-surface-variant">
                                        {description}
                                    </p>
                                    {step === '02' ? (
                                        <div className="mt-6 max-w-sm">
                                            <div className="h-2 overflow-hidden rounded-full bg-surface-container-lowest">
                                                <div className="h-full w-2/3 bg-secondary" />
                                            </div>
                                            <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">
                                                <span>2 of 3 confirmed</span>
                                                <span>Pending signature</span>
                                            </div>
                                        </div>
                                    ) : null}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-surface-container-low px-6 py-20 md:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <p className="text-[10px] uppercase tracking-[0.22em] text-primary">
                                Project Overview
                            </p>
                            <h2 className="mt-4 font-headline text-4xl font-bold tracking-tight">
                                What this multisig wallet lets users do.
                            </h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-[28px] border border-outline-variant/10 bg-surface-container p-8 md:col-span-2">
                                <span className="material-symbols-outlined text-4xl text-primary">shield</span>
                                <h3 className="mt-6 font-headline text-3xl font-bold">
                                    Shared Wallet Protection
                                </h3>
                                <p className="mt-4 max-w-2xl leading-8 text-on-surface-variant">
                                    Funds stay inside a wallet that is controlled by several approvers
                                    instead of a single account. A transfer only goes through once the
                                    required number of approvals is reached.
                                </p>
                            </div>
                            <div className="rounded-[28px] border border-tertiary/20 bg-gradient-to-br from-tertiary-container/20 to-surface-container p-8">
                                <span className="material-symbols-outlined text-4xl text-tertiary">visibility</span>
                                <h3 className="mt-6 font-headline text-2xl font-bold">
                                    Clear Wallet Visibility
                                </h3>
                                <p className="mt-4 leading-7 text-on-surface-variant">
                                    Users can review the wallet balance, the quorum, the list of
                                    approvers, and the current state of transfer proposals in one place.
                                </p>
                            </div>
                            <div className="rounded-[28px] border border-outline-variant/10 bg-surface-container-highest p-8">
                                <span className="material-symbols-outlined text-4xl text-secondary">
                                    settings_input_component
                                </span>
                                <h3 className="mt-6 font-headline text-2xl font-bold">
                                    Transfer Proposals
                                </h3>
                                <p className="mt-4 leading-7 text-on-surface-variant">
                                    An approver can submit a recipient address and amount, create a new
                                    transfer proposal, and wait for the other signers to confirm it.
                                </p>
                            </div>
                            <div className="rounded-[28px] border border-outline-variant/10 bg-surface-container-low p-8 md:col-span-2">
                                <h3 className="font-headline text-3xl font-bold">Connected dashboard features</h3>
                                <div className="mt-6 grid gap-4 md:grid-cols-2">
                                    {[
                                        'Wallet connection and current account display',
                                        'Approver cards and quorum tracking',
                                        'Create transfer proposals using the existing contract logic',
                                        'Approval flow and sent status for each transfer',
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-start gap-3 rounded-2xl bg-surface-container p-4"
                                        >
                                            <span className="material-symbols-outlined text-secondary">
                                                check_circle
                                            </span>
                                            <p className="leading-7 text-on-surface-variant">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-outline-variant/20 bg-[#111316] py-10">
                <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between md:px-8">
                    <div>
                        <p className="font-headline text-lg font-bold">ARCHITECT</p>
                        <p className="mt-2 text-xs uppercase tracking-[0.22em] text-on-surface-variant">
                            Built by ZOUHAIRI Youness and MOUSSAOUI Abdelkarim
                        </p>
                    </div>
                    <PrimaryButton action={connectWallet} tone="secondary">
                        Enter Dashboard
                    </PrimaryButton>
                </div>
            </footer>
        </div>
    );
}
