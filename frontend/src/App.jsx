import "./App.css";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ActivationPage from "./pages/ActivationPage";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
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
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";
import axios from "axios";
import server from "./server.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentPage from "./pages/PaymentPage.jsx";
import OrderSuccessPage from "./pages/OrderSuccessPage.jsx";
import ShopAllOrders from "./pages/Shop/ShopAllOrders.jsx";
import ShopOrderDetails from "./pages/Shop/ShopOrderDetails.jsx";
import OrderDetailsPage from "./pages/OrderDetailsPage.jsx";
import TrackOrderPage from "./pages/TrackOrderPage.jsx";
import ShopAllRefunds from "./pages/Shop/ShopAllRefunds.jsx";
import ShopSettingsPage from "./pages/Shop/ShopSettingsPage.jsx";
import ShopWithdrawMoneyPage from "./pages/Shop/ShopWithdrawMoneyPage.jsx";
import ShopInboxPage from "./pages/Shop/ShopInboxPage.jsx";
import UserInbox from "./pages/UserInbox.jsx";
import UserInboxMessages from "./pages/UserInbox.jsx";
import AdminDashboardPage from "./pages/AdminDashboard.jsx";
import AdminProtectedRoute from "./ProtectedRoutes/AdminProtectedRoute.jsx";
import AdminDashboardUsers from "./pages/AdminDashboardUsers.jsx";
import AdminDashboardSellers from "./pages/AdminDashboardSellers.jsx";
import DashboardOrders from "./components/Admin/DashboardOrders.jsx";
import AdminAllProducts from "./components/Admin/AdminAllProducts.jsx";
import AdminDashboardProducts from "./pages/AdminDashboardProducts.jsx";
import AdminDashboardEvents from "./pages/AdminDashboardEvents.jsx";
import AdminDashboardWithdraw from "./pages/AdminDashboardWithdraw.jsx";

function App() {
    const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/api/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadSeller());
    store.dispatch(getAllProducts());
    store.dispatch(getAllEvents());
    getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
          {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route path={`/`} element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
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
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
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
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInboxMessages />
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
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-refunds"
          element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <ShopWithdrawMoneyPage />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage/>
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <ShopInboxPage/>
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
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

        <Route path="/admin/dashboard" element={
          <AdminProtectedRoute>
            <AdminDashboardPage />
         </AdminProtectedRoute>
          
          } />

        <Route path="/admin/users" element={
          <AdminProtectedRoute>
            <AdminDashboardUsers />
         </AdminProtectedRoute>
          
          } />
       
        <Route path="/admin/sellers" element={
          <AdminProtectedRoute>
            <AdminDashboardSellers />
         </AdminProtectedRoute>
          
          } />

        <Route path="/admin/orders" element={
          <AdminProtectedRoute>
            <DashboardOrders />
         </AdminProtectedRoute>
          
          } />

        <Route path="/admin/products" element={
          <AdminProtectedRoute>
            <AdminDashboardProducts />
         </AdminProtectedRoute>
          
          } />
       
        <Route path="/admin/events" element={
          <AdminProtectedRoute>
            <AdminDashboardEvents />
         </AdminProtectedRoute>
          
          } />
        <Route path="/adminWithdrawRequest" element={
          <AdminProtectedRoute>
            <AdminDashboardWithdraw/>
         </AdminProtectedRoute>
          
          } />

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
