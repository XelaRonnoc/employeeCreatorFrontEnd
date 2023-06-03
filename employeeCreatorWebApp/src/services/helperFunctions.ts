export const calculateDateDiff = (start: Date, end: Date) => {
    console.log(end.getMilliseconds);
    let diffMs = end.getTime() - start.getTime();
    let date = new Date(diffMs);
    const length = Math.abs(date.getUTCFullYear() - 1970);
    if (length < 1) {
        return 1;
    }
    return length;
};
