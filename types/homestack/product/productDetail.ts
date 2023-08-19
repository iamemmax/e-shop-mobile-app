export interface ProductDetails {
    res: string;
    msg: string;
    products: ProductsDes;
    reviewproduct?: reviewProduct[];
}

export interface ProductsDes {
    _id?: string;
    title?: string;
    price?: number;
    productImgs?: string[];
    userId?: string;
    category?: string;
    size?: string[];
    colors?: string[];
    brand?: string;
    quantity?: number;
    sold?: number;
    description?: string;
    numReview?: number;
    rating?: number;
    productId?: string;
    productReviews?: ProductReview[];
    slug?: string;
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;
}

export interface ProductReview {
    userId: UserID;
    review: number;
    comment: string;
    reviewDate: Date;
    _id: string;
}
export interface reviewProduct {
    userId: UserID;
    review: number;
    comment: string;
    reviewDate: Date;
    _id: string;
}


export interface UserID {
    _id: string;
    userId: string;
    firstname?: string;
    lastname?: string;
    email: string;
    roles: string[];
    password: string;
    token: number | null;
    verified: boolean;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    phone?: string;
    username?: string;
}