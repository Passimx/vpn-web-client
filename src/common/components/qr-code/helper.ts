import { MimeToExt, Types } from '../../types/files/types.ts';
import { store } from '../../store';

export const shareFile = (file: Partial<Types>, blob: Blob) => {
    let filename = file.originalName || 'file';
    const mimeToExt = MimeToExt.get(file.mimeType!);

    if (mimeToExt && !filename.endsWith(mimeToExt) && !filename.endsWith('.jpg')) filename = `${filename}.${mimeToExt}`;

    const myFile = new File([blob], filename, { type: file.mimeType });
    const canShare = navigator.canShare && navigator.canShare({ files: [myFile] });
    const isPhone = store.getState().app.isPhone;

    if (isPhone && canShare) {
        try {
            navigator.share({
                files: [myFile],
            });
        } catch (e) {
            DownloadFileOnDevice(myFile, blob);
            console.error(e);
        }
    } else {
        DownloadFileOnDevice(myFile, blob);
    }
};

const DownloadFileOnDevice = async (file: File, blob: Blob): Promise<Blob | undefined> => {
    const filename = file.name;
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);

    return blob;
};
