export function imageToArray(file: File): Promise<Uint8Array> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.result) {
                resolve(new Uint8Array(reader.result as ArrayBuffer));
            } else {
                reject(new Error('Failed to read file as ArrayBuffer.'));
            }
        };

        reader.onerror = () => reject(new Error('FileReader encountered an error.'));
        reader.readAsArrayBuffer(file);
    });
}