import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { SidebarProvider } from "./context/SidebarContext.tsx";
import { persistor } from "./redux/store.ts";
import store from "./redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <SidebarProvider>
            <AppWrapper>
              <App />
            </AppWrapper>
          </SidebarProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
