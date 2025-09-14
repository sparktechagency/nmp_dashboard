export type TFlavorStatus = "visible" | "hidden";


export type IFlavor = {
    _id: string;
    name: string;
    typeId: string;
    type: string;
    status: TFlavorStatus
}

export type IFlavorDataSource = {
    key: number;
    serial: number;
    _id: string;
    name: string;
    typeId: string;
    type: string;
    status: TFlavorStatus
}