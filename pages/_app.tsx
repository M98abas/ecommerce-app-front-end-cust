import Cookies from "js-cookie";
import "antd/dist/antd.css";
import "../styles/globals.scss";

import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../store";

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    getAndSet();
  }, []);

  const getAndSet = async () => {
    const token = await Cookies.get("token");
    if (!token && window.location.pathname !== "/login") {
      if (window.location.pathname == "/register") return;
      window.location.href = "/login";
    }

    if (token && window.location.pathname == "/login")
      window.location.href = "/";
  };

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
