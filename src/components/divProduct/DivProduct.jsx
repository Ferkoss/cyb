import { useEffect, useState } from "react";





import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
//import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const DivProduct=({ id, name, size, img,price })=>{

    const [count, setCount] = useState(0)

    const { cart,setCart,addToCart,actualizateLocalStorange } = useContext(CartContext)
    
    
    const handlerCart = () => {
        
        const product = {
            id,name,count,img,price,idProdColor:null
        }

        if(cart.map(x=>x.name).includes(product.name)){
            
            let newCart = cart
            newCart[newCart.findIndex(x=>x.name===product.name)] = product
            setCart(newCart)
            actualizateLocalStorange()
            
        }
        else addToCart(product)

        console.log(cart)
        

    }

    const handlerCount=(e)=>{
        setCount(e.target.value)
    }




    return (
        <div className="contenedor-articulo-prod">
            <img src={img} alt="" />
            <div className="contenido-articulo-prod">
                <h3>{name}</h3>
                <p>{size}</p>
                <div className="cantidad-articulo">
                    <label htmlFor="cant-">Cantidad:</label>
                    <input type="number" value={count} onChange={handlerCount}/>
                </div>
                <FaCartShopping className="cart-icon" onClick={handlerCart} />
            </div>
        </div>
    )
}
export default DivProduct