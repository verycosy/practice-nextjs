import App, { AppContext, AppProps, AppInitialProps } from "next/app";
import Header from "../components/Header";
import { wrapper } from "../store";
import GlobalStyle from "../styles/GlobalStyle";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(app);
