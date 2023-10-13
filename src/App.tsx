import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import LayoutWrapper from "./pages/Layout";
import Checkout from "./pages/Checkout";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetail from "./pages/ProductDetail";
import { pageRoutes } from "./routes/constants.routes";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutWrapper>
                <Outlet />
              </LayoutWrapper>
            }
          >
            <Route index={true} element={<Home />} />
            <Route path={pageRoutes.checkout} element={<Checkout />} />
            <Route
              path={pageRoutes.productDetail}
              element={<ProductDetail />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
