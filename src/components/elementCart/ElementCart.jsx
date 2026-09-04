import { useContext, useEffect, useState } from "react"
import { MdCancel } from "react-icons/md";
import { CartContext } from "../../context/CartContext";
import "./elementCart.css"
import { Form } from "react-bootstrap";
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

        {/*<div className="precio">
            <p>Precio por unidad</p>
            <p>${price}</p>
        </div>*/}
        
        <Form.Group className="articulo-cantidad">
            <Form.Label htmlFor="">Cantidad</Form.Label>
            <Form.Control type="number" min="1" value={countProd} onChange={handlerModifyCount} />

        </Form.Group>
        <div className="precio">
            <p>Precio</p>
            <p>${totalProd}</p>
        </div>
        <div className="cerrar-articulo" id="borrar-codigo1"><MdCancel className="icon-close" onClick={handlerCancelElementCart}/></div>
    </div>
}
export default ElementCart