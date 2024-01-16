export const stringToDate = (dateString: string) => {
    const dateObject = new Date(dateString);

    // Using getUTCDate() instead of getUTCDay()
    return `${(dateObject.getUTCMonth() + 1).toString().padStart(2, "0")}/${dateObject.getUTCDate()}/${dateObject.getUTCFullYear()}`;
}
