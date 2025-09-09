import { useContext, useEffect, useState } from "react"
import { api_base_url } from "../../api"
import "./mainProduct.css"
import { CartContext } from "../../context/CartContext"
import DivProductColor from "../divProductColor/DivProductColor"
import DivProduct from "../divProduct/DivProduct"
import { ProductContext } from "../../context/ProductContext"
import { CgAdd } from "react-icons/cg";
const MainProduct = ({ category }) => {


    const { actualizateCart, actualizateLocalStorange, cart } = useContext(CartContext)
    const { productsStorange, setProductStorange} = useContext(ProductContext)
    const [products, setProducts] = useState([])
    const [productLoad, setProductLoad] = useState(true)
    const [first,setFirst] = useState(0)
    const [last,setLast] = useState(20)
    const [touchButton,setTouchButton] = useState(false)




    const request = () => {
        if(touchButton)
            return;
        setTouchButton(true)
        actualizateCart()

        if (!productLoad)
            setProductLoad(true)

        setProducts("Cargando...")

        let dataStorange = productsStorange.find(x=>x.type==category)

        if(!dataStorange){
        fetch(`${api_base_url}/Product/GetByCategory/${category}/${first}/${last}`, {
            headers: {
                accept: "application/json"
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error Inesperado")
                }
                return res.json()
            })
            .then((res) => {
                //console.log(res)
                setProductLoad(false)
                setProducts(res)
                setFirst(last+1)
                setLast(last+20)
                setProductStorange([...productsStorange, {
                    type: category,
                    data: res
                }])
                console.log(productsStorange)
            })
            .catch((e) => {
                console.log(e)
                setProducts(<p style={{ color: "red" }}>Error Inesperado</p>)
            })
        }
        else {
            setProductLoad(false)
            setProducts(dataStorange.data)
        }
        setTouchButton(false)
    }

    useEffect(request, [location.hash])

    useEffect(actualizateLocalStorange, [cart])

    return (

        <main className="main-prod">

            <div className="contenedor-main">
                {
                    !productLoad ? <>
                        <div className="contenedor-main-prod">

                       {products.map(x => x.colors.length != 0 ? <DivProductColor key={x.id} id={x.id} name={x.name} size={x.size} colors={x.colors} img={x.imageUrl} price={x.price} /> : <DivProduct key={x.id} id={x.id} name={x.name} size={x.size} img={x.imageUrl} price={x.price} />)}
                        </div>
                       <button type="button" className="boton-agregar" onClick={request}><CgAdd/></button>
                       </>
                       : <h2 style={{ position: "absolute" }}>{products}</h2>
                    // <h2>Cargando...</h2>
                }
            </div>
        </main>
    )
}
export default MainProduct