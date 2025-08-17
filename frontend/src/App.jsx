import "./App.css";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ActivationPage from "./pages/ActivationPage";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import store from "./redux/store.js";
import { loadSeller, loadUser } from "./redux/actions/user.js";
import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import BestSelling from "./pages/BestSelling.jsx";
import EventsPage from "./pages/EventsPage.jsx";
import FAQPage from "./pages/FAQPage.jsx";
import ProductDetailsPage from "./pages/ProductDetailsPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ShopCreatePage from "./pages/Shop/ShopCreatePage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ShopLoginPage from "./pages/Shop/ShopLoginPage.jsx";
import ShopHomePage from "./pages/Shop/ShopHomePage.jsx";
import SellerActivationPage from "./pages/SellerActivationPage.jsx";
import ShopDashboradPage from "./components/Shop/ShopDashboradPage.jsx";
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute.jsx'
import SellerProtectedRoute from "./ProtectedRoutes/SellerProtectedRoute.jsx";
import ShopCreateProduct from "./pages/Shop/ShopCreateProduct.jsx";
import ShopAllProducts from "./pages/Shop/ShopAllProducts.jsx";
import ShopCreateEvents from "./pages/Shop/ShopCreateEvents.jsx";
import ShopAllEvents from "./pages/Shop/ShopAllEvents.jsx";
import ShopAllCoupounCodes from "./pages/Shop/ShopAllCoupounCodes.jsx";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:productName" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSelling />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={`/activation/:activation_token`}
          element={<ActivationPage />}
        />

        {/* Shop Routes */}

        <Route path={`/shop-create`} element={<ShopCreatePage />} />
        <Route path={`/shop-login`} element={<ShopLoginPage />} />
        <Route
          path={`/shop/:id`}
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path={`/dashboard`}
          element={
            <SellerProtectedRoute>
              <ShopDashboradPage/> 
            </SellerProtectedRoute>
          }
        />
        <Route
          path={`/dashboard-create-product`}
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct/> 
            </SellerProtectedRoute>
          }
        />
        <Route
          path={`/dashboard-create-event`}
          element={
            <SellerProtectedRoute>
              <ShopCreateEvents/> 
            </SellerProtectedRoute>
          }
        />
        <Route
          path={`/dashboard-events`}
          element={
            <SellerProtectedRoute>
              <ShopAllEvents/> 
            </SellerProtectedRoute>
          }
        />
        <Route
          path={`/dashboard-coupouns`}
          element={
            <SellerProtectedRoute>
              <ShopAllCoupounCodes/> 
            </SellerProtectedRoute>
          }
        />
        <Route
          path={`/dashboard-products`}
          element={
            <SellerProtectedRoute>
              <ShopAllProducts/> 
            </SellerProtectedRoute>
          }
        />

        <Route
          path={`/seller/activation/:activation_token`}
          element={<SellerActivationPage />}
        />
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </BrowserRouter>
  );
}

export default App;
