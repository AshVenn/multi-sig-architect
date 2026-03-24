import { PrimaryButton } from './components/PrimaryButton';
import { shortenAddress } from './display';
import { Transfer } from './utils';

type TransferListProps = {
    transfers: Array<Transfer>;
    approveTransfer: (id: string) => Promise<void>;
};

function TransferList({ transfers, approveTransfer }: TransferListProps) {
    return (
        <section className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-headline text-2xl font-bold tracking-tight">
                        Governance Ledger
                    </h2>
                    <p className="mt-1 text-sm text-on-surface-variant">
                        Transfer proposals and execution state from the current wallet.
                    </p>
                </div>
                <span className="hidden rounded-md bg-surface-container-highest px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-on-surface-variant md:inline-flex">
                    All Proposals
                </span>
            </div>

            {transfers.length === 0 ? (
                <div className="rounded-[28px] border-2 border-dashed border-outline-variant/10 bg-surface-container-lowest px-6 py-16 text-center">
                    <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">
                        history_edu
                    </span>
                    <p className="mt-4 font-headline text-xl font-bold text-on-surface/70">
                        No transfers created yet
                    </p>
                    <p className="mt-2 text-sm text-on-surface-variant">
                        New proposals will appear here once they are submitted to the multisig wallet.
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {transfers.map((transfer: Transfer) => {
                        const isSent = transfer.sent;

                        return (
                            <article
                                className={`rounded-[26px] border-l-4 p-5 transition-colors hover:bg-surface-container-low ${
                                    isSent
                                        ? 'border-secondary/60 bg-surface-container-lowest'
                                        : 'border-tertiary/60 bg-surface-container-lowest'
                                }`}
                                key={transfer.id.toString()}
                            >
                                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                        <div className="min-w-[72px] text-left sm:text-center">
                                            <p className="text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                                ID
                                            </p>
                                            <p
                                                className={`mt-1 font-headline text-2xl font-bold ${
                                                    isSent ? 'text-secondary' : 'text-primary'
                                                }`}
                                            >
                                                #{transfer.id.toString()}
                                            </p>
                                        </div>
                                        <div className="hidden h-12 w-px bg-outline-variant/20 sm:block" />
                                        <div>
                                            <p className="font-headline text-2xl font-bold text-on-surface">
                                                {transfer.amount.toString()}{' '}
                                                <span className="text-sm uppercase tracking-[0.16em] text-on-surface-variant">
                                                    wei
                                                </span>
                                            </p>
                                            <p className="mt-1 text-sm text-on-surface-variant">
                                                Recipient: {shortenAddress(transfer.to, 8, 6)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                                        <div className="min-w-[160px]">
                                            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                                                {isSent ? 'Finality' : 'Approvals'}
                                            </p>
                                            <div className="flex items-center gap-3">
                                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-container">
                                                    <div
                                                        className={`h-full ${
                                                            isSent ? 'bg-secondary' : 'bg-tertiary'
                                                        }`}
                                                        style={{
                                                            width: isSent
                                                                ? '100%'
                                                                : `${Math.min(
                                                                      Number(transfer.approvals) * 40,
                                                                      100
                                                                  )}%`,
                                                        }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold uppercase tracking-[0.14em] text-on-surface">
                                                    {transfer.approvals.toString()}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3">
                                            <span
                                                className={`rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] ${
                                                    isSent
                                                        ? 'border border-secondary/20 bg-secondary-container/10 text-secondary'
                                                        : 'border border-tertiary/20 bg-tertiary-container/10 text-tertiary'
                                                }`}
                                            >
                                                {isSent ? 'Executed' : 'Awaiting Approval'}
                                            </span>

                                            {!isSent ? (
                                                <PrimaryButton
                                                    action={async () =>
                                                        await approveTransfer(transfer.id.toString())
                                                    }
                                                    tone="secondary"
                                                    className="px-4 py-2 text-[11px] tracking-[0.16em]"
                                                >
                                                    Approve
                                                </PrimaryButton>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </article>
                        );
                    })}

                    <div className="rounded-[24px] border-2 border-dashed border-outline-variant/10 px-6 py-12 text-center text-on-surface-variant">
                        <span className="material-symbols-outlined text-4xl opacity-25">history_edu</span>
                        <p className="mt-3 font-headline text-lg opacity-50">
                            No older transactions to display
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}

export default TransferList;
