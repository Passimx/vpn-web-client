export const shortText = (text: string = '', number: number = 6) => {
    if (!text) return '';
    if (text.length <= 20) return text;
    return text.slice(0, number) + '...' + text.slice(-number);
};
