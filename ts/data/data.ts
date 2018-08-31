const empty: string = '';

export interface ItemStatus {
    status: boolean,
    value: string
}

export interface CameraStatus extends ItemStatus {
    index: number
}

export interface SearchStatus extends ItemStatus {
    callback: (searchValue: string) => void
}

export interface ResultStatus {
    loadstatus: boolean,

    idCard: ItemStatus,
    address: ItemStatus,
    bank: ItemStatus,
    job: ItemStatus,
    customer: ItemStatus,
    sign: ItemStatus,
    viewPdf: ItemStatus,
    shareInvoke: ItemStatus,
    audio: ItemStatus,
    images: ItemStatus,

    camera: CameraStatus,
    search: SearchStatus
}

export interface ResultData {
    status: ResultStatus
}

export const data: ResultData = {
    status: {
        loadstatus: false,

        idCard: {
            status: false,
            value: empty
        },

        address: {
            status: false,
            value: empty
        },

        bank: {
            status: false,
            value: empty
        },

        job: {
            status: false,
            value: empty
        },

        customer: {
            status: false,
            value: empty
        },

        sign: {
            status: false,
            value: empty
        },

        viewPdf: {
            status: false,
            value: empty
        },

        shareInvoke: {
            status: false,
            value: empty
        },

        audio: {
            status: false,
            value: empty
        },

        images: {
            status: false,
            value: empty
        },

        camera: {
            status: false,
            value: empty,
            index: 1
        },

        search: {
            status: false,
            value: empty,
            callback: (data) => {}
        }
    }
}