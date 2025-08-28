
export const getStockStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
        case "in_stock":
            return "bg-blue-200"
        case "stock_out":
            return "bg-red-200"
        case "up_coming":
            return "bg-red-200"
    }
}

export const getStockStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case "in_stock":
            return "text-blue-500"
        case "stock_out":
            return "text-red-500"
        case "up_coming":
            return "text-yellow-500"
    }
}

