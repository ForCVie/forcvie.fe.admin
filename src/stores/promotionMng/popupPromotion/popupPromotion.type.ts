export type AdPopupNoticeResDTO = {
    popupNoticeSeq: string;
    title: string;
    url: string;
    useYn: string;
    startDate: string;
    endDate: string;
    rowNum: number;
}

export type AdPopupNoticeFilterReq = {
    title: string;
    url: string;
    useYn: string;
    startDate: Date;
    endDate: Date;
    page: number;
    size: number;
    sort: string;
}

export type AdPopupNoticeDetailDTO = {
    popupNoticeSeq: string;
    title: string;
    url: string;
    useYn: string;
    startDate: Date;
    endDate: Date;
}

export type AdPopupNoticeReq = {
    popupNoticeSeq: string;
    title: string;
    url: string;
    useYn: string;
    startDate: Date;
    endDate: Date;
}