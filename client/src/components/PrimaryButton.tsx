import { ReactNode, useState } from 'react';
import { PulseLoader } from 'react-spinners';

type PrimaryButtonProps = {
    children: ReactNode;
    disabled?: boolean;
    action?: () => Promise<void> | void;
    className?: string;
    tone?: 'primary' | 'secondary' | 'ghost';
    type?: 'button' | 'submit' | 'reset';
};
export function PrimaryButton({
    action,
    disabled,
    children,
    className,
    tone = 'primary',
    type = 'button',
}: PrimaryButtonProps) {
    const [loading, setLoading] = useState(false);

    const tones = {
        primary:
            'editorial-gradient text-on-primary shadow-xl shadow-black/30 hover:brightness-110',
        secondary:
            'bg-surface-container-high text-on-surface border border-outline-variant/30 hover:bg-surface-container-highest',
        ghost:
            'bg-transparent text-on-surface border border-outline-variant/20 hover:bg-surface-container-low',
    };

    return (
        <button
            type={type}
            className={[
                'inline-flex min-h-[46px] items-center justify-center gap-2 rounded-lg px-5 py-3 font-headline text-sm font-extrabold tracking-[0.14em] uppercase transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50',
                tones[tone],
                className ?? '',
            ]
                .filter(Boolean)
                .join(' ')}
            disabled={loading || disabled}
            onClick={async () => {
                if (!action) return;

                setLoading(true);

                try {
                    await action();
                } finally {
                    setLoading(false);
                }
            }}
        >
            {loading ? <PulseLoader size="8px" color="currentColor" /> : children}
        </button>
    );
}
