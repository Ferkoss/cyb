import { createContext, useState } from "react";

export const ProductContext = createContext()

export const ProductContextProvider=({children})=>{

    const [productsStorange,setProductStorange] = useState([])



    return <ProductContext.Provider value={{productsStorange,setProductStorange}}>
        {children}
    </ProductContext.Provider>
}

