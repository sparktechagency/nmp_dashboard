
const convertUTCDate = (dateStr: string) => {
    const dateParts = dateStr.split("T")[0];
    const time = dateStr.split("T")[1].split(".")[0];
    const hours = time.split(":")[0]
    const minutes = time.split(":")[1]
    const seconds = time.split(":")[2]

    const utcDate = new Date(
        Date.UTC(
            Number(dateParts.split("-")[0]),
            Number(dateParts.split("-")[1]) - 1,
            Number(dateParts.split("-")[2]),
            Number(hours),
            Number(minutes),
            Number(seconds),
        )
    );

    return utcDate;
}

export default convertUTCDate;