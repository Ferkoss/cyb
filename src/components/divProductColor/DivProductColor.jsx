import { useEffect, useRef, useState } from "react";
import "./divProductColor.css"
import { api_base_url } from "../../api";



import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { ImageContext } from "../../context/ImageContext";
import { Button, Card,Form } from "react-bootstrap";

//import { faEnvelope } from '@fortawesome/free-solid-svg-icons'







const DivProductColor = ({ id, subCategory,productNumber, size, img,price,colors }) => {
    const {insertImageColor} = useContext(ImageContext)
    const name = subCategory+"/"+ (productNumber<10?"0"+productNumber:productNumber)
    const [count, setCount] = useState(0)
    const [color, setColor] = useState("")
    const [colorImg,setColorImg]=useState("")
    const [colorId,setColorId]=useState(0)
    const { cart,setCart,addToCart,actualizateLocalStorange } = useContext(CartContext)
    
    const [error,setError] = useState({color:false,count:false})
    
    const handlerCart = () => {

        if(!color || count<=0){
            if(!color)
                setError(prev=>({...prev,color:true}))
            if(count<0)
                setError(prev=>({...prev,count:true}))
            return;
        }
        
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
        if(error.color || error.count)
            setError({color:false,count:false})

    }

    const handlerCount=(e)=>{
        setCount(e.target.value)
        if(error.count && e.target.value>0)
            setError(prev=>({...prev,count:false}))
    }

    const handlerColor=(e)=>{
        const optionSelected=e.target.selectedOptions[0]
        setColor(e.target.value)
        setColorImg(optionSelected.dataset.img)
        setColorId(optionSelected.dataset.id)
        if(error.color)
            setError(prev=>({...prev,color:false}))
    }

    


    // return (
    //     <div className="contenedor-articulo-prod">
    //         <img src={colorImg==""?img:colorImg} alt="" />
    //         <div className="contenido-articulo-prod con-art-select">
    //             <h3>{name}</h3>
    //             <p>{size}</p>
    //             <div className="cantidad-articulo">
    //                 <label htmlFor="cant-">Cantidad:</label>
    //                 <input type="number" value={count} onChange={handlerCount}/>
    //             </div>
    //             <div className="color-articulo">
    //                 <label htmlFor="color-Broche.nombre">Ingrese su color:  </label>
    //                 <select defaultValue="" name="color-Broche.nombre" id="color-Broche.nombre" onChange={handlerColor}>
    //                     <option value="" disabled >Ingrese su opcion</option>
    //                     {colors.map((x)=><option key={x.id} value={x.name} data-img={insertImageColor({subCategory,productNumber},x.name)} data-id={x.id}>{x.name}</option>)}
    //                 </select>
    //             </div>
    //             <FaCartShopping className="cart-icon" onClick={handlerCart} />
    //         </div>
    //     </div>
    // )

    return (
        <Card className="product-card">
    <Card.Img
        variant="top"
        src={colorImg==""?img:colorImg}
    />

    <Card.Body className="div-product-data">
        <Card.Title className="div-prod-title">{name}</Card.Title>

        <Card.Text className="prod-size">
            {size}
        </Card.Text>

        <Card.Text className="div-prod-price">
            ${price}
        </Card.Text>

        <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
                type="number"
                min="1"
                value={count}
                onChange={handlerCount}
                className={`${error.count?"bg-danger":""}`}
            />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Select className={`mb-3 ${error.color?"bg-danger":""}`} onChange={handlerColor}>
                <option disabled selected>Ingrese su opción</option>
                {colors.map((x)=><option key={x.id} value={x.name} data-img={insertImageColor({subCategory,productNumber},x.name)} data-id={x.id}>{x.name}</option>)}
            </Form.Select>
        </Form.Group>

        <Button variant="dark" className="boton-agregar" onClick={handlerCart}>
            <FaCartShopping className="cart-icon" /> Agregar al carrito
        </Button>
    </Card.Body>
</Card>
    )
}







export default DivProductColor