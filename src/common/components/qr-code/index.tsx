import { FC, memo, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import styles from './index.module.css';
import { PropsType } from './types';
import { FiShare } from 'react-icons/fi';
import { IoCopyOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useAppAction } from '../../store';
import { EventsEnum } from '../../types/events/events.enum.ts';
import { LoadingQrCode } from './components/loading-qr-code';
import { MimetypeEnum } from '../../types/files/types.ts';
import { shareFile } from './helper.ts';

function setupHiDPICanvas(canvas: HTMLCanvasElement, width: number, height: number) {
    const ratio = 3;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return ctx;

    ctx.scale(ratio, ratio);

    return ctx;
}

export const QrCode: FC<PropsType> = memo(({ url, text }) => {
    const textAreaHeight = 20;
    const { t } = useTranslation();
    const { postMessageToBroadCastChannel } = useAppAction();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const size = Math.min(window.innerWidth, window.innerHeight, 400) - 8;

    useEffect(() => {
        if (!canvasRef.current) return;
        if (!url?.length) return;

        const canvas = canvasRef.current;
        canvas.width = size;
        canvas.height = size;

        const ctx = setupHiDPICanvas(canvas, size, size + textAreaHeight);

        if (!ctx) return;

        ctx.beginPath();
        ctx.roundRect(0, 0, size, size + textAreaHeight, 16);
        ctx.clip();

        const qrCanvas = document.createElement('canvas');

        QRCode.toCanvas(qrCanvas, url, {
            errorCorrectionLevel: 'H',
            width: size,
            color: {
                light: '#ffffff',
                dark: '#062846',
            },
        }).then(() => {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(qrCanvas, 0, 0);

            const logo = new Image();
            logo.src = '/assets/icons/icon.svg';
            logo.onload = () => {
                const logoSize = size * 0.8;
                ctx.globalAlpha = 0.5;
                ctx.drawImage(logo, (size - logoSize) / 2, (size - logoSize) / 2, logoSize, logoSize);
                ctx.globalAlpha = 1.0;

                if (text) {
                    ctx.font = 'bold 20px sans-serif';
                    ctx.fillStyle = '#0098EA';
                    ctx.textAlign = 'center';
                    ctx.fillText(`@${text}`, size / 2, size + 8);
                }
            };
        });
    }, [url, text]);

    const share = () => {
        canvasRef?.current?.toBlob(async (blob) => {
            if (!blob) return;
            const newFile = new File([blob], 'qrcode.png', { type: MimetypeEnum.PNG });
            shareFile({ originalName: newFile.name, mimeType: MimetypeEnum.PNG }, blob);
        });
    };

    return (
        <div className={styles.background}>
            {url?.length ? <canvas ref={canvasRef} /> : <LoadingQrCode width={size} height={size + textAreaHeight} />}

            <div className={styles.buttons}>
                <div
                    className={`${styles.button} ${styles.copy_button}`}
                    onClick={() => {
                        if (url?.length) navigator.clipboard.writeText(url);
                        postMessageToBroadCastChannel({ event: EventsEnum.SHOW_TEXT, data: 't10' });
                    }}
                >
                    <div className={'text_translate'}>{t('t9')}</div>
                    <IoCopyOutline />
                </div>
                <div className={`${styles.button} ${styles.share_button}`} onClick={() => share()}>
                    <div className={'text_translate'}>{t('t8')}</div>
                    <FiShare />
                </div>
            </div>
        </div>
    );
});
