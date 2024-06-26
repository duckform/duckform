import { uid, clone, toArr } from "@duckform/core/shared";
import { IDataSourceItem, INodeItem } from "./types";

export interface INode {
  key?: string;
  map?: any;
  children?: INode[];
}

export const traverseTree = <T extends INode>(
  data: T[],
  callback: (dataItem: T, i: number, data: T[]) => any,
) => {
  for (let i = 0; i < data.length; i++) {
    callback(data[i], i, data);
    if (data[i]?.children) {
      traverseTree(data[i]?.children as any, callback);
    }
  }
};

export const transformValueToData = (value: IDataSourceItem[]): INodeItem[] => {
  const data = clone(value);
  traverseTree(data, (item, i, dataSource) => {
    const dataItem: INode & {
      duplicateKey: string;
    } = {
      key: "",
      duplicateKey: "",
      map: [],
      children: [],
    };
    for (const [key, value] of Object.entries(dataSource[i] || {})) {
      if (key !== "children") dataItem.map!.push({ label: key, value: value });
    }
    const uuid = uid();
    dataItem.key = uuid;
    dataItem.duplicateKey = uuid;
    dataItem.children = dataSource[i].children || [];
    dataSource[i] = dataItem;
  });
  return data;
};

export const transformDataToValue = (data: INodeItem[]): IDataSourceItem[] => {
  const value = clone(data);
  traverseTree(value, (item, i, dataSource) => {
    const valueItem: IDataSourceItem = {
      children: [],
    };
    toArr(dataSource[i].map).forEach((item) => {
      if (item.label) (valueItem as any)[item.label] = item.value;
    });
    valueItem.children = dataSource[i]?.children || [];
    dataSource[i] = valueItem;
  });
  return value;
};
