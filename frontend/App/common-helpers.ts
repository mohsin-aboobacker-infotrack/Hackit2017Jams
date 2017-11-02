export function isUk(): boolean {
    if (process.env.NODE_ENV === "devuk" || process.env.NODE_ENV === "stageuk" || process.env.NODE_ENV === "produk") {
        return true;
    }

    return false;
}