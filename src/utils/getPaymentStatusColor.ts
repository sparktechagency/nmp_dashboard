
const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "paid":
            return "bg-green-100 text-green-800 border-green-200"
        case "unpaid":
            return "bg-red-100 text-red-800 border-red-200"
        case "pending":
            return "bg-yellow-100 text-yellow-800 border-yellow-200"
        default:
            return "bg-blue-100 text-blue-800 border-blue-200"
    }
}


export default getPaymentStatusColor;