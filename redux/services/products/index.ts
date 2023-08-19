import axios from "axios"
import { baseUrl } from "../../../config/baseUrl"
import { BannerProps } from "../../../types/homestack/productTypes"


export const getBanners = async () => {
    const data = await axios.get<BannerProps>(`${baseUrl}/products/slider/list`)
    return data
}