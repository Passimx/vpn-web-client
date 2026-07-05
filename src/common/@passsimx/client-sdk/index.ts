import { PayloadInterface } from './interfaces/payload.interface.ts';

enum EventsEnum {
    LISTEN_UPDATES = 'listen_updates',
}

let parentOrigin: string | undefined;
let payload: PayloadInterface | null;
let func: (payload: PayloadInterface) => unknown;

export class ClientSdk {
    public static async init(funcArg: (payload: PayloadInterface) => unknown): Promise<void> {
        const urlParams = new URLSearchParams(window.location.search);
        const value = urlParams.get('parentOrigin');
        if (!value) return;
        parentOrigin = value;
        func = funcArg;

        window.removeEventListener('message', this.update);
        window.addEventListener('message', this.update);
        sendMessage<PayloadInterface>(EventsEnum.LISTEN_UPDATES);
    }

    public static getPayload(): PayloadInterface | null {
        return payload;
    }

    public static deInit() {
        parentOrigin = undefined;
        payload = null;
        window.removeEventListener('message', this.update);
    }

    private static update(msgEvent: MessageEvent<PayloadInterface>) {
        payload = msgEvent.data;
        func(msgEvent.data);
    }
}

const sendMessage = <T>(event: EventsEnum, data?: unknown): Promise<T | null> =>
    new Promise((resolve) => {
        if (!parentOrigin) return;
        const queryId = window.crypto.randomUUID();

        const handleResponse = (msgEvent: MessageEvent<{ queryId: string; data: T }>) => {
            if (queryId !== msgEvent.data.queryId) return resolve(null);
            if (msgEvent.origin !== parentOrigin) return resolve(null);

            window.removeEventListener('message', handleResponse);
            clearTimeout(timeoutId);

            return resolve(msgEvent.data.data);
        };

        const timeoutId = setTimeout(() => {
            window.removeEventListener('message', handleResponse);
            resolve(null);
        }, 5000);

        window.addEventListener('message', handleResponse);
        console.log('send Message to parent');
        window.parent.postMessage({ event, data, queryId }, parentOrigin);
    });
