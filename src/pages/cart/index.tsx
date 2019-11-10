import Taro, { useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import { ICartModel } from "./model";
import { Dispatch } from "redux";
import "./index.scss";
import EmptyCart from "./components/empty";

interface IProps extends ICartModel {
  dispatch: Dispatch;
  [key: string]: any;
}
const Cart = (props: IProps) => {
  return (
    <View className="cart-page">
      <EmptyCart />
    </View>
  );
};

Cart.config = {
  navigationBarTitleText: "购物车"
};

export default Cart;

connect(({ cart }) => ({
  ...cart
}))(Cart as any);
