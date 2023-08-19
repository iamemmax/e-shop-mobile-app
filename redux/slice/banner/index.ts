import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getBanners } from "../../services/products";
import { BannerProps, Product } from "../../../types/homestack/productTypes";





// interface sliderProps {
//     products?: null
// }
interface msgProps {
    msg?: string;

}
type productSlideProps = {
    products?: BannerProps | undefined,
    isLoading: boolean;
    msg?: string;
    isSuccess: boolean;
    isError: boolean;
    message: string;
    isAuthenticated?: boolean;


}

export const FetchBanners = createAsyncThunk(
    "slider/sliders",
    async (_, thunkAPI) => {
        try {
            const response = await getBanners()

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





const initialState: productSlideProps = {
    // products:typeof Product[] | undefined,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
};

export const BannerSlice = createSlice({
    initialState,
    name: "sliders",
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        },
    },
    extraReducers(builder) {
        builder.addCase(FetchBanners.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(FetchBanners.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.products = action.payload;
            // state.message = String(payload?.msg)
            state.isAuthenticated = false
        })
        builder.addCase(FetchBanners.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = String(action.payload)


        })



    },
})

export const { reset } = BannerSlice.actions;
// export const userSelector = (state: RootState) => state;
export default BannerSlice.reducer;