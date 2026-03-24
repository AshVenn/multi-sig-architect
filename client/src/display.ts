import { formatEther } from 'viem';

export function shortenAddress(
    address: string | null | undefined,
    start = 6,
    end = 4
) {
    if (!address) return 'Not connected';
    if (address.length <= start + end) return address;

    return `${address.slice(0, start)}...${address.slice(-end)}`;
}

export function formatEth(value: bigint, maxDecimals = 4) {
    const formatted = formatEther(value);

    if (!formatted.includes('.')) return formatted;

    const [whole, decimal] = formatted.split('.');
    const trimmedDecimal = decimal.replace(/0+$/, '');

    if (!trimmedDecimal) return whole;

    return `${whole}.${trimmedDecimal.slice(0, maxDecimals)}`;
}
