import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuthRootState } from '@/lib/types/state';
import { IOrder } from '@/lib/types/admin/orders/order.type';

const initialState: IAuthRootState<IOrder> = {
  data: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProduct(state: IAuthRootState<IOrder>, action: PayloadAction<IOrder>) {
      if (state.data) {
        const selectedProd = state.data.find((product) => product._id === action.payload._id);
        if (selectedProd) {
          selectedProd.quantity += 1;
        } else state.data.push(action.payload);
      }
    },
    increase(state: IAuthRootState<IOrder>, action: PayloadAction<IOrder>) {
      if (state.data) {
        const selectedProd = state.data.find((product) => product._id === action.payload._id);
        if (selectedProd) {
          selectedProd.quantity += 1;
        }
      }
      return state;
    },
    decrease(state: IAuthRootState<IOrder>, action: PayloadAction<IOrder>) {
      if (state.data) {
        const selectedProd = state.data.find((product) => product._id === action.payload._id);
        if (selectedProd && selectedProd.quantity > 1) {
          selectedProd.quantity -= 1;
        }
      }
      return state;
    },
  },
});

const { actions } = orderSlice;
export const { addProduct } = actions;
export default orderSlice;
