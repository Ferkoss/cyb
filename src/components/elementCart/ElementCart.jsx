import { useContext, useEffect, useState } from "react"
import { MdCancel } from "react-icons/md";
import { CartContext } from "../../context/CartContext";

const ElementCart = ({name,img,price,count}) => {
    const {cart,modifyCount,removeFromCart}=useContext(CartContext)
    const [countProd, setCountProd] = useState(count)
    const totalProd = price * count

    useEffect(()=>{
        setCountProd(count)
    },[count])

    const handlerModifyCount=(e) => { 
        setCountProd(e.target.value)
        modifyCount(name,e.target.value)

    }

    const handlerCancelElementCart=()=>{
        removeFromCart(name)
    }
    return <div className="carrito-articulo" id="codigo1" >
        <img src={img} alt="" />

        <div className="precio">
            <p>Precio por unidad</p>
            <p>${price}</p>
        </div>

        <div className="articulo-cantidad">
            <label htmlFor="">Cantidad</label>
            <input type="number" min="1" value={countProd} onChange={handlerModifyCount} />

        </div>
        <div className="precio">
            <p>Precio Total</p>
            <p>${totalProd}</p>
        </div>
        <div className="cerrar-articulo" id="borrar-codigo1"><MdCancel className="icon-close" onClick={handlerCancelElementCart}/></div>
    </div>
}
export default ElementCart