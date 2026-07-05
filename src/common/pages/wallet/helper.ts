import { BalanceAccount } from '../../store/app/types/app-state.type.ts';

let currencyPrice: Record<keyof BalanceAccount, BalanceAccount> | undefined;

export class WalletHelper {
    public static setCurrencyPrice(payload: Record<keyof BalanceAccount, BalanceAccount>) {
        currencyPrice = payload;
    }

    public static formatPrice(payload: number) {
        return payload.toLocaleString('ru-RU', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }

    public static convert(amount: number, from: string, to: keyof BalanceAccount) {
        if (!currencyPrice) return 0;
        let result = 0;

        const from2 = from as keyof BalanceAccount;

        if (from === to) result = amount;
        else if (currencyPrice[from2]?.[to]) {
            result = amount * currencyPrice[from2][to];
        } else if (currencyPrice[to]?.[from2]) {
            result = amount / currencyPrice[to][from2];
        }

        return Math.floor(result * 100) / 100;
    }

    public static getTotalBalance(balanceAccount: BalanceAccount, currency: keyof BalanceAccount) {
        if (!currencyPrice) return 0;
        let sum = 0;

        for (const [key, value] of Object.entries(balanceAccount)) {
            const isValid = Object.keys(currencyPrice).includes(key);
            if (value === 0 || !isValid) continue;

            const converted = this.convert(Number(value), key as keyof BalanceAccount, currency);
            sum += converted;
        }

        return Math.floor(sum * 100) / 100;
    }
}
