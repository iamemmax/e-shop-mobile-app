export interface ProductProps {
    res: string;
    total: number;
    products?: ProductArray[];
}

export interface ProductArray {
    colors: any[];
    _id: string;
    title: string;
    price: number;
    productImgs: string[];
    userId: null;
    category: Category | undefined;
    size: string[];
    brand: string;
    quantity: number;
    sold: number;
    description: string;
    numReview: number;
    rating: number;
    productId: string;
    productReviews?: ProductReview[];
    reviewproduct: Reviewproduct[] | undefined;

    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    _id: string;
    name: string;
    categoryId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductReview {
    userId: UserID;
    review: number;
    comment: string;
    reviewDate: Date;
    _id: string;
}


export interface ProductRes {
    res: string;
    product: ProductArray,
}




export interface UserID {
    _id?: string;
    userId?: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    email?: string;
}

export interface addProductReview {
    userId?: string;
    review?: number;
    comment?: string;
    productId?: string
}
export interface Reviewproduct {
    userId: UserID;
    review: number;
    comment: string;
    reviewDate: Date;
    _id: string;
}




export interface ProductReviewRes {
    res?: string;
    msg?: string;
    review?: Reviewproduct[];
}


