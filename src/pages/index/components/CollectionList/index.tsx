import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import * as R from "ramda";
import { AtButton } from "taro-ui";

export interface ICollectionItem {
  commonId: number;
  goodsPrice: number;
  goodsTitle: string;
  imageUrl: string;
  payNumber: number;
  storeId: number;
  storeName: string;
}
export interface ITitle {
  titleCh: string;
  titleEn: string;
}
export interface ICollection extends ITitle {
  summary?: string;
  data: ICollectionItem[];
}
export interface IProps {
  data: ICollection;
  [key: string]: any;
}

export const TitleItem = ({ data }: { data: ITitle }) => (
  <View className="title-homePage">
    <Text className="main">{data.titleCh}</Text>
    <Text className="sub">{data.titleEn}</Text>
  </View>
);

const CollectionList = ({ data }: IProps) => {
  return (
    <View className="collectionList">
      <TitleItem data={data} />
      <View className="grid">
        {R.splitEvery(3, data.data).map((row, rowId) => (
          <View className="row" key={rowId}>
            {row.map(item => (
              <Image
                mode="aspectFit"
                className="item"
                key={item.titleCh}
                src={item.imageUrl}
              />
            ))}
          </View>
        ))}
      </View>

      <View className="footer">
        <View className="summary">{data.summary}</View>
        <AtButton type="secondary" size="small">
          点击查看
        </AtButton>
      </View>
    </View>
  );
};

export default CollectionList;
