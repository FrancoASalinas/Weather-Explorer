function formatDate(date: string) {
    const dateObject = new Date(date);
    return `${dateObject.getUTCDate()}/${dateObject.getMonth() + 1}`
}

export default formatDate;