import { BalanceAccount } from '../../store/app/types/app-state.type.ts';
import { CurrencyPriceType } from './types/currency-price.type.ts';
import BigNumber from 'bignumber.js';

export const scale = 8;
export const precision = scale + 10;
let currencyPrice: CurrencyPriceType | undefined;

export class WalletHelper {
    public static setCurrencyPrice(payload: CurrencyPriceType) {
        currencyPrice = payload;
    }

    public static formatPrice(payload: number | undefined) {
        if (payload === undefined) return '...';
        return payload.toLocaleString('ru-RU', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        });
    }

    public static convert(amount: number | string | undefined, from: string, to: string): number | undefined {
        try {
            if (amount === undefined) return undefined;
            const bnAmount = new BigNumber(amount);

            if (!bnAmount.isFinite() || bnAmount.isNegative()) {
                return undefined;
            }

            if (bnAmount.isZero()) {
                return 0;
            }

            if (!currencyPrice?.currency) {
                return undefined;
            }

            if (from === to) {
                return bnAmount.dp(scale, BigNumber.ROUND_DOWN).toNumber();
            }

            let result: BigNumber | undefined;
            const from2 = from as keyof BalanceAccount;
            const to2 = to as keyof BalanceAccount;

            if (currencyPrice.currency[from2]?.[to2] !== undefined) {
                const rate = new BigNumber(currencyPrice.currency[from2][to2]);

                if (!rate.isFinite() || rate.isZero() || rate.isNegative()) {
                    return undefined;
                }

                result = bnAmount.multipliedBy(rate);
            } else if (currencyPrice.currency[to2]?.[from2] !== undefined) {
                const rate = new BigNumber(currencyPrice.currency[to2][from2]);

                if (!rate.isFinite() || rate.isZero() || rate.isNegative()) {
                    return undefined;
                }

                result = bnAmount.dividedBy(rate);
            } else if (from2 !== 'usd' && to2 !== 'usd') {
                const fromUsdRate = currencyPrice.currency[from2]?.['usd'];

                const usdToRate = currencyPrice.currency['usd']?.[to2];

                if (fromUsdRate === undefined || usdToRate === undefined) {
                    return undefined;
                }

                result = bnAmount.multipliedBy(fromUsdRate).multipliedBy(usdToRate);
            }

            if (!result) {
                return undefined;
            }

            return result.dp(scale, BigNumber.ROUND_DOWN).toNumber();
        } catch (error) {
            console.error(error);
        }
    }

    public static getTotalBalance(balanceAccount: BalanceAccount, currency: string): number | undefined {
        if (!currencyPrice) return undefined;
        let sum = 0;

        for (const [key, value] of Object.entries(balanceAccount)) {
            const isValid = Object.keys(currencyPrice.currency).includes(key);
            if (value === 0 || !isValid) continue;

            const converted = this.convert(Number(value), key as keyof BalanceAccount, currency) ?? 0;
            sum += converted;
        }

        const fixedString = sum.toFixed(precision);
        const dotIndex = fixedString.indexOf('.');

        if (dotIndex === -1) return sum;

        const truncatedString = fixedString.substring(0, dotIndex + scale + 1);
        return Number(truncatedString);
    }
}
