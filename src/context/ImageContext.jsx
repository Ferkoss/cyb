import { createContext, useState } from "react";
import { api_base_url } from "../api";
export const ImageContext = createContext()

export const ImageContextProvider=({children})=>{

    const insertImage = (prod) => {
            const name = prod.subCategory + "-" + prod.productNumber
            return api_base_url + "/images/" + name + "/" + name + ".jpg"
        }
     const insertImageColor=(product,color)=>{
                 const name=product.subCategory+"-"+product.productNumber
                 return api_base_url+"/images/"+name+"/"+color+".jpg"
             }
    return <ImageContext.Provider value={{insertImage,insertImageColor}}>
            {children}
        </ImageContext.Provider>
}