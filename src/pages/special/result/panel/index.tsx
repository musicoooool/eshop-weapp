import Taro from "@tarojs/taro";

import { View, Image, Text } from "@tarojs/components";

import "./index.scss";
import classnames from "classnames";

// import bg from "./main_bg.png";
import Grass from "./grass.svg";
import Skeleton from "taro-skeleton";

interface IProps {
  data: {
    status: string;
    loading: boolean;
  };
  [key: string]: any;
}
const SpecialPanel = ({ data }: IProps) => {
  return (
    <View className="special-page__panel">
      <Skeleton loading={!data || data.loading} row={6} rowHeight={30}>
        <View className="head">
          {/* <Image src={bg} mode="widthFix" className="img" /> */}
          <View
            className={classnames("content", {
              unlucky: data && data.status === "unlucky"
            })}
          >
            <View className="content-title">
              <View className="left">
                <View className="top" />
                <View className="btm" />
              </View>
              {data && data.status === "lucky" ? "CONGRATULATIONS" : "SORRY"}
              <View className="right">
                <View className="top" />
                <View className="btm" />
              </View>
            </View>
            <View className="detail">
              <Image src={Grass} className="grassLeft" />
              <View className="result">
                <Text className="title">很遗憾</Text>
                <Text className="desc">您未中签</Text>
              </View>
              <Image src={Grass} className="grassRight" />
            </View>

            <View className="tips">
              <Text className="tips__main">感谢您参与!</Text>
              <Text className="tips__desc">欢迎您关注最新的特品活动</Text>
            </View>
          </View>
        </View>
      </Skeleton>
    </View>
  );
};

export default SpecialPanel;
