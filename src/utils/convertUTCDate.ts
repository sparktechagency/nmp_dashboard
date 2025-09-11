
const convertUTCDate = (dateStr: string) => {
    const date = new Date(dateStr.split("T")[0]);
    const time = dateStr.split("T")[1].split(".")[0];
    const hours = time.split(":")[0]
    const minutes = time.split(":")[1]
    const seconds = time.split(":")[2]

    const utcDate = new Date(
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            Number(hours),
            Number(minutes),
            Number(seconds),
        )
    );

    return utcDate;
}

export default convertUTCDate;