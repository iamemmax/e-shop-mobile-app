import axios from "axios"
import { ProductProps, ProductRes, ProductReviewRes, addProductReview } from "../../../types/homestack/product"
import { baseUrl } from "../../../config/baseUrl"

export const getProducts = async () => {
    const data = await axios.get<ProductProps>(`${baseUrl}/products`, { withCredentials: true })
    return data
}

export const getTopProducts = async () => {
    const data = await axios.get<ProductProps>(`${baseUrl}/products/topselling`, { withCredentials: true })
    return data
}


export const getSingleProducts = async (slug: string) => {
    const data = await axios.get<ProductRes>(`${baseUrl}/products/${slug}`, { withCredentials: true })
    return data
}

export const addReview = async ({ productId, comment, review, userId }: addProductReview) => {
    const data = await axios.put<ProductReviewRes>(`${baseUrl}/products/review/${productId}`, {
        comment, review, userId
    }, { withCredentials: true }
        // console.log('====================================');
        // console.log();
        // console.log('====================================');

    )
    return data.data
}