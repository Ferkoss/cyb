import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import View from "./components/view/View";
import Main from "./components/main/Main";
import MainProduct from "./components/mainProduct/MainProduct";
import Login from "./components/login/Login";
import AdminMenu from "./components/admin/adminMenu/AdminMenu";
import AdminAddProduct from "./components/admin/adminAddProduct/AdminAddProduct";
import AdminSelectUpdate from "./components/admin/adminSelectUpdate/AdminSelectUpdate";
import AdminUpdateProduct from "./components/admin/adminUpdateProduct/AdminUpdateProduct";
import SelectSoftDelete from "./components/admin/adminSelectSoftDelete/SelectSoftDelete";
import AdminSelectRestore from "./components/admin/adminSelectRestore/AdminSelectRestore";
import AdminSelectDelete from "./components/admin/adminSelectDelete/AdminSelectDelete";
import { CartContextProvider } from "./context/CartContext";
import CartSummary from "./components/cartSummary/CartSummary";
import CartShadow from "./components/cartShadow/CartShadow";
import { useState } from "react";
import SelectSaleOrder from "./components/admin/selectSaleOrders/SelectSaleOrder";
import ViewDetails from "./components/admin/viewDetails/viewDetails";
import Protected from "./components/admin/protected/Protected";

const App = () => {

  const [viewShadowCart, setViewShadowCart] = useState(false)

  const router = createBrowserRouter([
    {
      path: "/",
      element:
        <View>
          <Main />
        </View>

    },
    {
      path: "/broches",
      element:
        <View>
          <MainProduct category={"broches"} />
        </View>
    },
    {
      path: "/set-infantil",
      element:
        <View>
          <MainProduct category={"set-infantil"} />
        </View>
    },
    {
      path: "/colitas-de-pelo",
      element:
        <View>
          <MainProduct category={"colitas-de-pelo"} />
        </View>
    },
    {
      path: "/vinchas",
      element:
        <View>
          <MainProduct category={"vinchas"} />
        </View>
    },
    {
      path: "/tic-tac",
      element:
        <View>
          <MainProduct category={"tic-tac"} />
        </View>
    },
    {
      path: "/carteras",
      element:
        <View>
          <MainProduct category={"carteras"} />
        </View>
    },
    {
      path: "/billeteras-damas",
      element:
        <View>
          <MainProduct category={"billeteras-damas"} />
        </View>
    },
    {
      path: "/billeteras-caballeros",
      element:
        <View>
          <MainProduct category={"billeteras-caballeros"} />
        </View>
    },
    {
      path: "/mochilas",
      element:
        <View>
          <MainProduct category={"mochilas"} />
        </View>
    },
    {
      path: "/riñoneras-y-bandoleras",
      element:
        <View>
          <MainProduct category={"riñoneras-y-bandoleras"} />
        </View>
    },

    {
      path: "*",
      element: <View><Main/></View>
    },

    {
      path: "/cart-summary",
      element: <View><CartSummary /></View>
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/admin-menu",
      element: <Protected><AdminMenu /></Protected>
    },
    {
      path: "/admin-add-product",
      element: <Protected><AdminAddProduct /></Protected>
    },
    {
      path: "/admin-select-update",
      element: <Protected><AdminSelectUpdate /></Protected>
    },
    {
      path: "/admin-update",
      element: <Protected><AdminUpdateProduct /></Protected>
    },
    {
      path: "/admin-soft-delete",
      element: <Protected><SelectSoftDelete /></Protected>
    },
    {
      path: "/admin-restore",
      element: <Protected><AdminSelectRestore /></Protected>
    },
    {
      path: "/admin-delete",
      element: <Protected><AdminSelectDelete /></Protected>
    },
    {
      path: "/selectSaleOrder",
      element: <Protected><SelectSaleOrder /></Protected>
    },
    {
      path: "/viewDetails",
      element: <Protected><ViewDetails /></Protected>
    }


  ])

  return <CartContextProvider><RouterProvider router={router} /></CartContextProvider>

}

export default App
