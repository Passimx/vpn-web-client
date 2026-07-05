import { CreateInvoiceType, CreateTonInvoiceType } from '../types/api/invoices.ts';
import { Api, IData } from './index.ts';

export const createSberInvoice = (userId: string | undefined, body: CreateInvoiceType): Promise<IData<string>> => {
    return Api<string>(`/invoices/sber/${userId}`, { method: 'POST', body });
};

export const createWechatInvoice = (userId: string | undefined, body: CreateInvoiceType): Promise<IData<string>> => {
    return Api<string>(`/invoices/wechat/${userId}`, { method: 'POST', body });
};

export const createTonInvoice = (userId: string | undefined, body: CreateTonInvoiceType): Promise<IData<string>> => {
    return Api<string>(`/invoices/ton/${userId}`, { method: 'POST', body });
};
