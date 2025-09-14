
const getStockStatus = (status: string) => {
    switch (status.toLowerCase()) {
        case "in_stock":
            return "In Stock"
        case "stock_out":
            return "Out of Stock"
        case "up_coming":
            return "Up Coming"
    }
}

export default getStockStatus;