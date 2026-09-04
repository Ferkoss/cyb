import { useEffect, useState } from "react";




import { Button, Card,Form } from "react-bootstrap";
import { FaCartShopping } from "react-icons/fa6";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
//import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const DivProduct=({ id, subCategory,productNumber, size, img,price })=>{

    const name = subCategory+"/"+ (productNumber<10?"0"+productNumber:productNumber)
    const [count, setCount] = useState(0)
    const { cart,setCart,addToCart,actualizateLocalStorange } = useContext(CartContext)
    const [errorCount,setErrorCount] = useState(false)
    
    const handlerCart = () => {

        if(count<=0){
            setErrorCount(true)
            return;
        }
        
        
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
        if(errorCount && e.target.value>0)
            setErrorCount(false)
    }




    // return (
    //     <div className="contenedor-articulo-prod">
    //         <img src={img} alt="" />
    //         <div className="contenido-articulo-prod">
    //             <h3>{name}</h3>
    //             <p>{size}</p>
    //             <div className="cantidad-articulo">
    //                 <label htmlFor="cant-">Cantidad:</label>
    //                 <input type="number" value={count} onChange={handlerCount}/>
    //             </div>
    //             <FaCartShopping className="cart-icon" onClick={handlerCart} />
    //         </div>
    //     </div>
    // )

    return (
        <Card className="product-card" >
    <Card.Img
        variant="top"
        src={img}
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
                className={`${errorCount?"bg-danger":""}`}
            />
        </Form.Group>
        
        <Button variant="dark" className="boton-agregar" onClick={handlerCart}>
            <FaCartShopping className="cart-icon" /> Agregar al carrito
        </Button>
    </Card.Body>
</Card>
    )

}
export default DivProduct