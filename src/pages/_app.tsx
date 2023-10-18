import type { AppProps } from "next/app";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { Global } from "@emotion/react";
import { ReactFlowProvider } from "reactflow";

import global from "@/styles/global.styles";

import "reactflow/dist/style.css";

const cache = createCache({ key: "next" });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <ReactFlowProvider>
        <Global styles={global} />
        <Component {...pageProps} />
      </ReactFlowProvider>
    </CacheProvider>
  );
}
