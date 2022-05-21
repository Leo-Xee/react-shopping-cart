import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import store from "@/app/store";
import GlobalStyle from "@/styles/GobalStyle";
import theme from "@/styles/theme";
import Layout from "@/components/Layout";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}
