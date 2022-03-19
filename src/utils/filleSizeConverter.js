export const getPrettyFileSize = (sizeInBytes) => {
    const units = ['Bytes', 'KB', 'MB', 'GB'];

    let unitIndex = 0
    let size = parseInt(sizeInBytes, 10) || 0;

    while (size >= 1024) {
        size = size / 1024;
        unitIndex++;
    }

    return (size.toFixed(size < 10 && unitIndex > 0 ? 1 : 0) + ' ' + units[unitIndex]);
}