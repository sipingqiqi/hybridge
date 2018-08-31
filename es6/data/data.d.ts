export interface ItemStatus {
    status: boolean;
    value: string;
}
export interface CameraStatus extends ItemStatus {
    index: number;
}
export interface SearchStatus extends ItemStatus {
    callback: (searchValue: string) => void;
}
export interface ResultStatus {
    loadstatus: boolean;
    idCard: ItemStatus;
    address: ItemStatus;
    bank: ItemStatus;
    job: ItemStatus;
    customer: ItemStatus;
    sign: ItemStatus;
    viewPdf: ItemStatus;
    shareInvoke: ItemStatus;
    audio: ItemStatus;
    images: ItemStatus;
    camera: CameraStatus;
    search: SearchStatus;
}
export interface ResultData {
    status: ResultStatus;
}
export declare const data: ResultData;
