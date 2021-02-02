import { forEach } from "lodash";
import { RestData } from "../classes/RestData";

export const checkFollowDisable = (username: string, dataList: RestData[]) => {
  console.log("[from check]", username, dataList);
  let disable = false;
  forEach(dataList, (item: RestData) => {
    if (item.username === username) {
      disable = true;
    }
  });
  return disable;
};

export const chopFollowingUrl = (url: string) => {
  const index = url.indexOf("{");
  return url.substring(0, index);
};
