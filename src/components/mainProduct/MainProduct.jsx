import { useContext, useEffect, useState } from "react"
import { api_base_url } from "../../api"
import "./mainProduct.css"
import { CartContext } from "../../context/CartContext"
import DivProductColor from "../divProductColor/DivProductColor"
import DivProduct from "../divProduct/DivProduct"
import { ProductContext } from "../../context/ProductContext"
import { CgAdd } from "react-icons/cg";
import { ImageContext } from "../../context/ImageContext"
const MainProduct = ({ category }) => {

    const {insertImage} = useContext(ImageContext)
    const { actualizateCart, actualizateLocalStorange, cart } = useContext(CartContext)
    const { productsStorange, setProductStorange } = useContext(ProductContext)
    const [products, setProducts] = useState([])
    const [productLoad, setProductLoad] = useState(true)
    const [first, setFirst] = useState(0)
    const last = 10
    const [touchButton, setTouchButton] = useState(false)





    const request = (button) => {
        console.log(first + "-" + last)
        console.log(`${api_base_url}/Product/GetByCategory/${category}/${first}/${last}`)
        //alert("aaaa")
        if (touchButton)
            return;
        // alert("bbb")
        if (!button)
            setProductLoad(true)
        setTouchButton(true)
        actualizateCart()

        if (!button)
            setProducts("Cargando...")

        //let dataStorange = productsStorange.find(x => x.type == category)

        //alert(first+"-"+last+" "+dataStorange.first+"-"+dataStorange.last)


        // alert("manda request")
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
                console.log(res)
                
                //if (!button)
                setProductLoad(false)
                setProducts([...products, ...res])
                
                console.log([...products, ...res])
                setFirst(prevFirst=>prevFirst+last)
                
                console.log(first + "-" + last)
                console.log(res)
                if (!button && !sessionStorage.getItem("products"))
                    sessionStorage.setItem("products", JSON.stringify({
                        category,
                        products,
                        first,
                        last
                    }))
                else if (!button)
                    sessionStorage.setItem("products", JSON.stringify({
                    }))
            })
            .catch((e) => {
                console.log(e)
                setProducts(<p style={{ color: "red" }}>Error Inesperado</p>)
            })


        setTouchButton(false)

    }

    useEffect(() => {
        //let session = sessionStorage.getItem("products").find(x=>x.category == category)
        // if(session){
        //     setProductLoad(false)
        //     setProducts(session.products)
        //     setFirst(session.first)
        //     setLast(session.last)
        // }
        // else
        request(false)

    }, [location.hash])

    

    useEffect(actualizateLocalStorange, [cart])

    return (

        <main className="main-prod">

            <div className="super-contenedor-main-prod">
                {
                    !productLoad ? <>
                        <div className="contenedor-main-prod">

                            {products.map(x => x.colors.length != 0
                                ? <DivProductColor key={x.id} id={x.id} subCategory={x.subCategory} productNumber={x.productNumber} size={x.size} colors={x.colors} img={insertImage(x)} price={x.price} />
                                : <DivProduct key={x.id} id={x.id} subCategory={x.subCategory} productNumber={x.productNumber} size={x.size} img={insertImage(x)} price={x.price} />)}
                        </div>
                        <button type="button" className="boton-agregar-prod" onClick={() => { request(true) }}><CgAdd /></button>
                    </>
                        : <h2 className="mensaje-prod" >{products}</h2>
                    //style={{ position: "absolute" }}
                    // <h2>Cargando...</h2>
                }
            </div>
        </main>
    )
}
export default MainProduct