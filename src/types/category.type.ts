
export type TCategoryStatus = "visible" | "hidden";


export type ICategory = {
    _id: string;
    name: string;
    typeId: string;
    type: string;
    status: TCategoryStatus
}

export type ICategoryDataSource = {
    key: number;
    serial: number;
    _id: string;
    name: string;
    typeId: string;
    type: string;
    status: TCategoryStatus
}