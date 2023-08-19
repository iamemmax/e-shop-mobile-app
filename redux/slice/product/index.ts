import { createAsyncThunk, createSlice, PayloadAction, } from "@reduxjs/toolkit"
import { addProductReview, ProductProps, ProductRes, ProductReviewRes, Reviewproduct } from "../../../types/homestack/product";
import { addReview, getProducts, getSingleProducts, getTopProducts } from "../../services/products/products";
// import { Product } from "../../../types/homestack/productTypes";





// interface sliderProps {
//     products?: null
// }
interface msgProps {
    msg?: string;

}
type productSlideProps = {
    products?: ProductProps | undefined,
    topSelling?: ProductProps | undefined,
    details?: ProductRes;
    isLoading: boolean;
    msg?: string;
    isSuccess: boolean;
    isError: boolean;
    message: string;
}

export const fetchProducts = createAsyncThunk(
    "products/list",
    async (_, thunkAPI) => {
        try {
            const response = await getProducts()
            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
export const fetchTopProducts = createAsyncThunk(
    "products/top-selling",
    async (_, thunkAPI) => {
        try {
            const response = await getTopProducts()
            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
export const fetchSingleProduct = createAsyncThunk(
    "products/details",
    async (slug: string, thunkAPI) => {
        try {
            const response = await getSingleProducts(slug)

            return response.data
        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);
export const addProductPreview = createAsyncThunk(
    "products/add-review",
    async (data: addProductReview, thunkAPI) => {
        try {
            const response = await addReview(data)
            console.log('====================================');
            console.log(response.review, "revies");
            console.log('====================================');
            return response

        } catch (error: any) {
            let message =
                (error.response && error.response && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message)
        }
    }
);





const initialState: productSlideProps = {
    // products:typeof Product[] | undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const productSlice = createSlice({
    initialState,
    name: "products",
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
            // state.details = undefined
        },
        addNewReview: (state, action: PayloadAction<any>) => {
            state.details?.product.productReviews?.push(action.payload)
            state.isSuccess = true;
            state.isLoading = false
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload;
            // state.message = String(payload?.msg)
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
        })

        builder.addCase(fetchTopProducts.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchTopProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.topSelling = action.payload;
            // state.message = String(payload?.msg)
        })
        builder.addCase(fetchTopProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
        })




        // product details
        builder.addCase(fetchSingleProduct.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(fetchSingleProduct.fulfilled, (state, action: PayloadAction<ProductRes>) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.details = action.payload;
            // state.message = String(payload?.msg)
        })
        builder.addCase(fetchSingleProduct.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
        })



        // add product Review 
        builder.addCase(addProductPreview.pending, (state, action) => {
            // state.isLoading = true
        })
        builder.addCase(addProductPreview.fulfilled, (state, action: PayloadAction<ProductReviewRes>) => {
            state.isLoading = false;
            state.isSuccess = true;
            //@ts-ignore
            state.details?.product.productReviews?.push(Object.assign({}, action.payload.review))
            state.message = String(action.payload)
        })
        builder.addCase(addProductPreview.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)
        })
    },
})

export const { reset, addNewReview } = productSlice.actions;
export default productSlice.reducer;