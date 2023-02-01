import * as React from "react";

export interface IDownloadAudioProps {
  url: string;
}

export function DownloadAudio(props: IDownloadAudioProps) {
  const { url } = props;
  const linkRef = React.useRef<HTMLAnchorElement | null>(null);

  React.useEffect(() => {
    linkRef.current?.click();
  }, [url]);

  return (
    <a ref={linkRef} href={url} download>
      Tải xuống
    </a>
  );
}
