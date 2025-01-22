import { useContext, useEffect, useState } from "react"
import { api_base_url } from "../../api"
import "./mainProduct.css"
import { CartContext } from "../../context/CartContext"
import DivProductColor from "../divProductColor/DivProductColor"
import DivProduct from "../divProduct/DivProduct"
const MainProduct = ({category})=>{

    const [products,setProducts] = useState([])
    const {actualizateCart,actualizateLocalStorange,cart} = useContext(CartContext)
    const [productLoad,setProductLoad] = useState(true)
    useEffect(()=>{
        
        actualizateCart()

        if(!productLoad)
            setProductLoad(true)

        setProducts("Cargando...")

        fetch(`${api_base_url}/Product/GetByCategory/${category}`,{
            headers:{
                accept: "application/json"
            }
        })
        .then((res)=>{
            if(!res.ok){
                throw new Error("Error Inesperado")
            }
            return res.json()
        })
        .then((res)=>{
            console.log(res)
            setProductLoad(false)
            setProducts(res)
        })
        .catch((e)=>{
            console.log(e)
            setProducts(<p style={{color:"red"}}>Error Inesperado</p>)
        })
    },[location.hash])

    useEffect(actualizateLocalStorange,[cart])

    return (

        <main className="main-prod">
            
            <div className="contenedor-main-prod">
            {
            !productLoad?
            products.map(x=>x.colors.length!=0?<DivProductColor key={x.id} id={x.id} name={x.name} size={x.size} colors={x.colors} img={x.imageUrl} price={x.price}/>:<DivProduct key={x.id} id={x.id} name={x.name} size={x.size} img={x.imageUrl} price={x.price}/>)
            :<h2 style={{position:"absolute"}}>{products}</h2>
           // <h2>Cargando...</h2>
        }
            </div>
        </main>
    )
}
export default MainProduct