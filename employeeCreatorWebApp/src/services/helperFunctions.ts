export const calculateDateDiff = (start: Date, end: Date) => {
    let diffMs = end.getMilliseconds() - start.getMilliseconds();
    let date = new Date(diffMs);
    return Math.abs(date.getUTCFullYear() - 1970);
};
