export interface ITariff {
    readonly id: string;

    readonly expirationDays: number;

    readonly price: number;

    readonly trafficLimit: number;
}

export interface ITariffs {
    readonly base: ITariff[];

    readonly cdn: ITariff[];
}
