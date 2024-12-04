import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {

    const [cart, setCart] = useState([])
    
    //console.log(cart)
    const addToCart = (product) => {
        setCart([...cart,product])
        actualizateLocalStorange()
    }

    const removeFromCart = (name) => {
        setCart(cart.filter(x=>x.name!=name))
        actualizateLocalStorange()
    }

    const modifyCount = (name,newCount) => {
        let newCart = [...cart]
        const idInCart = newCart.findIndex(x=>x.name==name)
        newCart[idInCart].count = newCount
        setCart(newCart)
        actualizateLocalStorange()
        console.log(cart)
    }

    const actualizateLocalStorange=()=>{
        localStorage.setItem("CyB-Cart",JSON.stringify(cart))
    }

    const actualizateCart=()=>{
        const datosLocalStorange = localStorage.getItem("CyB-Cart")
        if (datosLocalStorange) setCart(JSON.parse(datosLocalStorange))
        
    }

    

    return (
        <CartContext.Provider value={{ cart, setCart,addToCart, removeFromCart,actualizateCart,actualizateLocalStorange,modifyCount }}>
            {children}
        </CartContext.Provider>
    )
}
