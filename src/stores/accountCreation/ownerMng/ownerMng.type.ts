export type AdOwnerResDTO = {
    id: string;
    userName: string;
    fullName: string;
}

export type AdOwnerFilterRequest = {
    userName: string;
    page: number;
    size: number;
    sort: string;   
}

export type AdOwnerDetailDTO = {
    id: string;
    userName: string;
    password: string;
    fullName: string;
    date: string;
    phone: string;
    email: string;
    address: string;
    nationality: string;
    avatar: string;
    foodStores: AdFoodStoreDetailDTO[];
}

export type AdFoodStoreDetailDTO = {
    foodStoreSeq: string;
    nm: string;
    ownerSeq: string;
    address: string;
    phoneOwner: string;
    phoneSp: string;
    isShowPhoneOwner: string;
    isBadge: string;
    avatar: string;
    isActivity: string;
}