import { useEffect, useState } from "react";
import "./divProductColor.css"




import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
//import { faEnvelope } from '@fortawesome/free-solid-svg-icons'







const DivProductColor = ({ id, name, size, img,price,colors }) => {

    const [count, setCount] = useState(0)
    const [color, setColor] = useState("")
    const [colorImg,setColorImg]=useState("")
    const [colorId,setColorId]=useState(0)
    const { cart,setCart,addToCart,actualizateLocalStorange } = useContext(CartContext)
    
    
    const handlerCart = () => {
        
        const product = {
            id,
            name:name+" "+color,
            count,
            img:colorImg,
            price,
            idProdColor:Number(colorId)
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

    const handlerColor=(e)=>{
        const optionSelected=e.target.selectedOptions[0]
        setColor(e.target.value)
        setColorImg(optionSelected.dataset.img)
        setColorId(optionSelected.dataset.id)
    }


    return (
        <div className="contenedor-articulo-prod">
            <img src={colorImg==""?img:colorImg} alt="" />
            <div className="contenido-articulo-prod con-art-select">
                <h3>{name}</h3>
                <p>{size}</p>
                <div className="cantidad-articulo">
                    <label htmlFor="cant-">Cantidad:</label>
                    <input type="number" value={count} onChange={handlerCount}/>
                </div>
                <div className="color-articulo">
                    <label htmlFor="color-Broche.nombre">Ingrese su color:  </label>
                    <select defaultValue="" name="color-Broche.nombre" id="color-Broche.nombre" onChange={handlerColor}>
                        <option value="" disabled >Ingrese su opcion</option>
                        {colors.map((x)=><option key={x.id} value={x.name} data-img={"data:image/jpeg;base64,"+x.image} data-id={x.id}>{x.name}</option>)}
                    </select>
                </div>
                <FaCartShopping className="cart-icon" onClick={handlerCart} />
            </div>
        </div>
    )
}
export default DivProductColor