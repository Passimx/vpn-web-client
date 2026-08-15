import { BalanceAccount } from '../../store/app/types/app-state.type.ts';
import { CurrencyPriceType } from './types/currency-price.type.ts';

let currencyPrice: CurrencyPriceType | undefined;

export class WalletHelper {
    public static setCurrencyPrice(payload: CurrencyPriceType) {
        currencyPrice = payload;
    }

    public static formatPrice(payload: number) {
        return payload.toLocaleString('ru-RU', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }

    public static convert(amount: number, from: string, to: string) {
        if (typeof amount === 'string') amount = Number(amount);
        if (!currencyPrice) return 0;
        let result = 0;

        const from2 = from as keyof BalanceAccount;
        const to2 = to as keyof BalanceAccount;

        if (from === to) result = amount;
        else if (currencyPrice[from2]?.[to2]) {
            result = amount * currencyPrice[from2][to2];
        } else if (currencyPrice[to2]?.[from2]) {
            result = amount / currencyPrice[to2][from2];
        }

        const fixedString = result.toFixed(12);
        const dotIndex = fixedString.indexOf('.');

        if (dotIndex === -1) return result;

        const truncatedString = fixedString.substring(0, dotIndex + 6);
        return Number(truncatedString);
    }

    public static getTotalBalance(balanceAccount: BalanceAccount, currency: string) {
        if (!currencyPrice) return 0;
        let sum = 0;

        for (const [key, value] of Object.entries(balanceAccount)) {
            const isValid = Object.keys(currencyPrice).includes(key);
            if (value === 0 || !isValid) continue;

            const converted = this.convert(Number(value), key as keyof BalanceAccount, currency);
            sum += converted;
        }

        const fixedString = sum.toFixed(12);
        const dotIndex = fixedString.indexOf('.');

        if (dotIndex === -1) return sum;

        const truncatedString = fixedString.substring(0, dotIndex + 6);
        return Number(truncatedString);
    }
}
