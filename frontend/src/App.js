import { Route, Routes } from "react-router-dom";
import ProductHome from "./components/ProductHome";
import Profile from "./components/Profile";
import { createContext } from "react";
import { notification } from "antd";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Authenticate from "./Authentication/Authenticate";
import UserProfile from "./pages/UserProfile";
import UnprotectedRoutesAuthenticate from "./Authentication/UnprotectedRoutesAuthenticate";
import ErrorPage from "./pages/ErrorPage";
import AddProductsForm from "./pages/AddProductsForm";

const cartNotification = createContext();

function App() {
  const [api, contextHolder] = notification.useNotification();
  const placement = "bottomRight";
  const openNotification = (cartMessage, type) => {
    api[type]({
      message: cartMessage,
      placement,
    });
  };
  return (
    <div className="App">
      {contextHolder}
      <cartNotification.Provider value={openNotification}>
        <Routes>
          <Route path="/" element={<ProductHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/user-profile"
            element={<Authenticate protectedComponent={<UserProfile />} />}
          />
          <Route
            path="/payment"
            element={<Authenticate protectedComponent={<Payment />} />}
          />
          <Route
            path="/add-product"
            element={<AddProductsForm />} 
          />
          <Route
            path="/signup"
            element={<UnprotectedRoutesAuthenticate Component={<Signup />} />}
          />
          <Route
            path="/login"
            element={<UnprotectedRoutesAuthenticate Component={<Login />} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </cartNotification.Provider>
    </div>
  );
}

export default App;
export { cartNotification };
