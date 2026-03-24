import { ChangeEvent, useState } from 'react';
import { PrimaryButton } from './components/PrimaryButton';

type NewTransferProps = {
    createTransfer: (transfer: { amount: string; to: string }) => Promise<void>;
};

function NewTransfer({ createTransfer }: NewTransferProps) {
    const [transfer, setTransfer] = useState<{
        amount: string | undefined;
        to: string | undefined;
    }>({ amount: undefined, to: undefined });
    const [feedback, setFeedback] = useState<{
        type: 'error' | 'success';
        message: string;
    } | null>(null);

    const updateTransfer = (
        e: ChangeEvent<HTMLInputElement>,
        field: string
    ) => {
        const value = e.target.value;
        setTransfer({ ...transfer, [field]: value });
    };

    return (
        <section className="rounded-[28px] border border-outline-variant/10 bg-surface-container p-7 shadow-2xl shadow-black/25 lg:sticky lg:top-28">
            <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.22em] text-on-surface-variant">
                    Create Transfer
                </p>
                <h2 className="font-headline text-3xl font-extrabold tracking-tight">
                    Propose Intent
                </h2>
                <p className="text-sm leading-7 text-on-surface-variant">
                    Submit a new outgoing transfer request using the current multisig contract.
                </p>
            </div>

            <div className="mt-8 space-y-5">
                <div className="space-y-2">
                    <label
                        className="ml-1 text-[10px] uppercase tracking-[0.18em] text-on-surface-variant"
                        htmlFor="to"
                    >
                        Recipient Address
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                            alternate_email
                        </span>
                        <input
                            id="to"
                            className="w-full rounded-xl border border-transparent bg-surface-container-highest py-3 pl-11 pr-4 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary/30"
                            placeholder="0x..."
                            type="text"
                            value={transfer.to ?? ''}
                            onChange={(e) => updateTransfer(e, 'to')}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label
                        className="ml-1 text-[10px] uppercase tracking-[0.18em] text-on-surface-variant"
                        htmlFor="amount"
                    >
                        Amount (wei)
                    </label>
                    <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                            token
                        </span>
                        <input
                            id="amount"
                            className="w-full rounded-xl border border-transparent bg-surface-container-highest py-3 pl-11 pr-16 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:border-primary/20 focus:outline-none focus:ring-1 focus:ring-primary/30"
                            placeholder="0"
                            type="text"
                            value={transfer.amount ?? ''}
                            onChange={(e) => updateTransfer(e, 'amount')}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                            Wei
                        </span>
                    </div>
                </div>

                <div className="rounded-[22px] bg-surface-container-low p-4">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                        <span>Execution</span>
                        <span className="text-on-surface">After quorum</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-on-surface-variant">
                        <span>Input format</span>
                        <span className="text-on-surface">Raw wei amount</span>
                    </div>
                </div>

                <PrimaryButton
                    action={async () => {
                        const to = transfer.to?.trim();
                        const amount = transfer.amount?.trim();

                        if (!to || !amount) {
                            setFeedback({
                                type: 'error',
                                message: 'Recipient address and amount are required.',
                            });
                            return;
                        }

                        try {
                            await createTransfer({ to, amount });
                            setTransfer({ to: '', amount: '' });
                            setFeedback({
                                type: 'success',
                                message: 'Transfer proposal submitted successfully.',
                            });
                        } catch (error) {
                            setFeedback({
                                type: 'error',
                                message:
                                    error instanceof Error
                                        ? error.message
                                        : 'Transfer proposal failed.',
                            });
                        }
                    }}
                    className="w-full"
                >
                    Propose Transfer
                </PrimaryButton>

                {feedback ? (
                    <p
                        className={`text-sm leading-6 ${
                            feedback.type === 'error'
                                ? 'text-[#ffb4ab]'
                                : 'text-secondary'
                        }`}
                    >
                        {feedback.message}
                    </p>
                ) : null}
            </div>
        </section>
    );
}

export default NewTransfer;
