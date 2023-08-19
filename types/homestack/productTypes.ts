export interface BannerProps {
    res: string;
    total: number;
    products: Product[];
}

export interface Product {
    _id: string;
    title: string;
    category: Category | undefined;
    postedBy: null;
    img: string;
    productId: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Category {
    name: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
}
