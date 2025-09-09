export type TBrandStatus = "visible" | "hidden";


export type IBrand = {
    _id: string;
    name: string;
    typeId: string;
    type: string;
    status: TBrandStatus
}

export type IBrandDataSource = {
    key: number;
    serial: number;
    _id: string;
    name: string;
    typeId: string;
    type: string;
    status: TBrandStatus
}