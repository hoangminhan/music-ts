import { Spin } from "antd";
import * as React from "react";
import ReactPlayer from "react-player/lazy";
export interface IModalWathcMvProps {
  dataModal: any;
}

export function ModalWathcMv(props: IModalWathcMvProps) {
  const { dataModal } = props;
  console.log({ dataModal });
  return (
    <div className="min-h-[400px]">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${dataModal.link_mv}`}
        width="100%"
        height={400}
        controls
        playing
        fallback={<Spin />}
      />
    </div>
  );
}
