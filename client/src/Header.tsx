import { formatEth, shortenAddress } from './display';

type HeaderProps = {
    approvers: readonly string[];
    quorum: bigint;
    balance: bigint;
    activeAccount: string;
};

function Header({ approvers, quorum, balance, activeAccount }: HeaderProps) {
    const quorumCount = Number(quorum);
    const signerCount = approvers.length;
    const quorumWidth =
        signerCount > 0 ? `${Math.min((quorumCount / signerCount) * 100, 100)}%` : '0%';

    return (
        <div className="space-y-8">
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <article className="rounded-[28px] border border-outline-variant/10 bg-surface-container p-7 shadow-lg shadow-black/20">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
                        Total Balance
                    </p>
                    <p className="mt-5 break-words font-headline text-3xl font-extrabold tracking-tight xl:text-4xl">
                        {formatEth(balance, 6)}{' '}
                        <span className="text-lg text-primary">ETH</span>
                    </p>
                    <p className="mt-3 text-sm text-on-surface-variant">{balance.toString()} wei</p>
                </article>

                <article className="rounded-[28px] border border-outline-variant/10 bg-surface-container p-7 shadow-lg shadow-black/20">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
                        Quorum Ratio
                    </p>
                    <p className="mt-5 font-headline text-4xl font-extrabold tracking-tight">
                        {quorum.toString()} <span className="text-lg text-on-surface-variant">/ {signerCount}</span>
                    </p>
                    <div className="mt-6 h-2 overflow-hidden rounded-full bg-surface-container-lowest">
                        <div className="h-full rounded-full bg-primary" style={{ width: quorumWidth }} />
                    </div>
                </article>

                <article className="rounded-[28px] border border-outline-variant/10 bg-surface-container p-7 shadow-lg shadow-black/20">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
                        Active Signers
                    </p>
                    <p className="mt-5 font-headline text-4xl font-extrabold tracking-tight">
                        {signerCount} <span className="text-lg text-secondary">active</span>
                    </p>
                    <div className="mt-5 flex -space-x-2">
                        {approvers.slice(0, 4).map((approver) => (
                            <div
                                key={approver}
                                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface bg-surface-container-highest text-[11px] font-bold uppercase text-primary"
                            >
                                {approver.slice(2, 4)}
                            </div>
                        ))}
                        {signerCount > 4 ? (
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface bg-secondary-container/15 text-[11px] font-bold uppercase text-secondary">
                                +{signerCount - 4}
                            </div>
                        ) : null}
                    </div>
                </article>

                <article className="rounded-[28px] border-l-4 border-primary bg-surface-container-high p-7 shadow-lg shadow-black/20">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-primary">Current Account</p>
                    <p className="mt-5 font-mono text-lg text-on-surface">{shortenAddress(activeAccount, 8, 5)}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.16em] text-on-surface-variant">
                        Controller Node
                    </p>
                    <span className="mt-5 inline-flex rounded-md border border-secondary/20 bg-secondary-container/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-secondary">
                        Authorized
                    </span>
                </article>
            </section>

            <section>
                <div className="mb-5 flex items-center justify-between">
                    <div>
                        <h2 className="font-headline text-2xl font-bold tracking-tight">
                            Active Guardians
                        </h2>
                        <p className="mt-1 text-sm text-on-surface-variant">
                            Approver accounts currently registered in the multisig wallet.
                        </p>
                    </div>
                    <span className="hidden text-[10px] uppercase tracking-[0.22em] text-on-surface-variant md:inline-flex">
                        Threshold Verified
                    </span>
                </div>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {approvers.map((approver, index) => {
                        const isActive =
                            approver.toLowerCase() === activeAccount.toLowerCase();

                        return (
                            <article
                                key={approver}
                                className="flex items-center justify-between rounded-[22px] border border-outline-variant/10 bg-surface-container-low p-4 transition-colors hover:bg-surface-container-high"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-container-highest text-primary">
                                        <span className="material-symbols-outlined">
                                            {isActive ? 'shield_person' : 'person'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="break-all font-mono text-xs leading-6 text-on-surface">
                                            {approver}
                                        </p>
                                        <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                            {isActive ? 'Current signer' : `Guardian ${index + 1}`}
                                        </p>
                                    </div>
                                </div>
                                <span className="h-2.5 w-2.5 rounded-full bg-secondary shadow-[0_0_10px_rgba(102,221,139,0.5)]" />
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}

export default Header;
