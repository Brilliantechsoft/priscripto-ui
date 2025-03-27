import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { SidebarProvider } from "./context/SidebarContext.tsx";
import store from "./redux/store.ts";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <SidebarProvider>
          <AppWrapper>
            <App />
          </AppWrapper>
        </SidebarProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
