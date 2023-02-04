import { Skeleton } from "antd";
import * as React from "react";

export interface ILoadingSongProps {
  quantityElement: number;
  isAvatar: boolean;
}

export function LoadingSong(props: ILoadingSongProps) {
  const { quantityElement, isAvatar } = props;
  return (
    <>
      {isAvatar ? (
        <div className="flex gap-x-6 gap-y-5 justify-around flex-wrap">
          {Array.from(Array(quantityElement).keys()).map((item, index) => {
            return (
              <div key={index} className="w-[250px]">
                <Skeleton
                  title={{ width: "100%" }}
                  paragraph={{ width: "100%", rows: 1 }}
                  active
                  avatar
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex gap-3">
          {Array.from(Array(quantityElement).keys()).map((item, index) => {
            return (
              <Skeleton
                key={index}
                title={{ width: "100%" }}
                paragraph={{ width: "100%", rows: 5 }}
                active
              />
            );
          })}
        </div>
      )}
    </>
  );
}
