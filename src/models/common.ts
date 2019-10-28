import Taro from "@tarojs/taro";
import { setStore, setUserStore } from "@/utils/lib";
import * as db from "../services/common";
import { Dispatch } from "redux";
import { ICateItem } from "@/pages/index/components/cateList";
import { ICollection } from "@/pages/index/components/collectionList";
import { LocalStorageKeys } from "@/utils/setting";
import { IShoppingCartCount } from "@/utils/order/cartDB";
import { loadMember } from "@/pages/login/db";

export { Dispatch };
export interface RouteData {
  pathname: string;
  query?: any;
  search?: string;
  state?: any;
}

interface IMenuItem {
  menuAd: never[];
  menuId: number;
  menuItemList: {
    itemData: {
      data: string;
      image: string;
      imageUrl: string;
      name: string;
      type: string;
    };
    itemId: number;
    itemMore: {
      data: string;
      image: string;
      imageUrl: string;
      name: string;
      type: string;
    };
    itemName: string;
    itemType: number;
    menuId: number;
    subitemData: {
      data: string;
      image: string;
      imageUrl: string;
      name: string;
      type: string;
    }[];
  }[];
  menuName: string;
}

export interface IGlobalUser {
  avatar: string;
  uid: number;
  account: string;
  memberName: string;
  trueName: string;
  phone: string;
  sex: string;
  birthday: null;
  authState: number;
  isRealNamePassed: boolean;
  authMessage: string;
  [key: string]: any;
}

export interface IOrderNum {
  needPay: number;
  needSend: number;
  needReceive: number;
  needConfirm: number;
  refund: number;
  [key: string]: any;
}

export interface IGlobalModel {
  user: IGlobalUser; // 用户全局状态
  isLogin: boolean; // 是否登录
  special: {
    batchId: string;
    imageUrl: string;
    type: string;
  }; // 特品信息
  cateList: ICateItem[]; // 主页菜单列表
  collectionList: ICollection;
  newProduct: ICollection; // 新品
  menuList: IMenuItem[]; // 分类
  orderNum: IOrderNum;
  shoppingCart: IShoppingCartCount; // 购物车
}

const state = {
  user: Taro.getStorageSync(LocalStorageKeys.user) || {},
  isLogin: false,
  special: {
    batchId: "0",
    imageUrl: "",
    type: ""
  },
  shoppingCart: {
    loading: true,
    total: { num: 0, price: 0 },
    data: [],
    type: "offline"
  },
  cateList: [],
  collectionList: {
    data: [],
    titleCh: "",
    titleEn: ""
  },
  newProduct: {
    data: [],
    titleCh: "",
    titleEn: ""
  },
  menuList: [],
  orderNum: {}
};

// 载入登录信息
export const loadUserInfo = (dispatch: Dispatch) => {
  let user = Taro.getStorageSync(LocalStorageKeys.user) || { username: "" };

  Reflect.deleteProperty(user, "token");
  if (user.username.length === 0) {
    loadMember(dispatch);
  }

  dispatch({
    type: "setStore",
    payload: {
      user,
      isLogin: user && user.uid > 0
    }
  });
};

const namespace = "common";
export const updateStore = namespace + "/setStore";
export default {
  namespace,
  state,
  reducers: { setStore, setUserStore },
  subscriptions: {
    async setup({ dispatch }: { dispatch: Dispatch }) {
      db.loadHome().then(res => {
        let {
          componentA: special,
          componentB,
          componentC,
          componentD
          // componentE
        } = res;
        let payload = {};

        if (special) {
          payload = { ...payload, special };
        }

        if (componentB) {
          payload = { ...payload, cateList: componentB.data };
        }

        if (componentC) {
          payload = { ...payload, collectionList: componentC };
        }

        if (componentD) {
          payload = { ...payload, newProduct: componentD };
        }

        dispatch({
          type: "setStore",
          payload
        });

        // 热卖产品，后端暂无返回
        // console.log(componentE);
      });

      db.loadMenuList().then(menuList => {
        let menus = menuList.map(item => ({
          name: item.menuName,
          id: item.menuId,
          cates: item.menuItemList.map(menu => ({
            id: menu.itemId,
            name: menu.itemName,
            categoryList: menu.subitemData.map(sub => ({
              id: sub.data,
              name: sub.name,
              url: sub.imageUrl
            }))
          }))
        }));
        dispatch({
          type: "setStore",
          payload: { menuList: menus }
        });
      });

      // 载入用户登录信息
      await loadUserInfo(dispatch);
    }
  }
};
