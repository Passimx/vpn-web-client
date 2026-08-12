export type PropsType = {
    text: string;
    func: () => Promise<unknown> | unknown;
};
