import "./header.css"
import image from "../../img/CB.jpg"
import { useNavigate } from "react-router-dom"
import { FaShoppingBag } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { CartContext } from "../../context/CartContext";
import ElementCart from "../elementCart/ElementCart";
import { IoMdMenu } from "react-icons/io";
const Header = ()=>{

const navigate=useNavigate()

const [stateOpenCart,setStateOpenCart] = useState(false)
const [width,setWidth] = useState(window.innerWidth)
const [viewMenu,setViewMenu]=useState(false)
//const [viewRestartMenu,setViewRestartMenu]=useState(false)
// const refMenu = useRef(null)
// const refRestantMenu = useRef(null)
// console.log(refMenu)

const {cart,actualizateLocalStorange} = useContext(CartContext)

const handlerOpenCarrto=(e)=>{
    setStateOpenCart(true)
}

const handlerCloseCarrto=(e)=>{
    setStateOpenCart(false)
}

const handlerButtonCart = ()=>{
    if(cart.length!=0){
        actualizateLocalStorange()
        setStateOpenCart(false)
        navigate("/cart-summary")
    }
}


const handlerOpenMenu = () => {
    setViewMenu(true)
/*refMenu.current.style.display="flex"
refRestantMenu.current.style.display="flex"*/
}

const handlerCloseMenu = ()=>{
    setViewMenu(false)
/*    refMenu.current.style.display="none"
refRestantMenu.current.style.display="none"*/
}

const resizeMenu=()=>{
    setWidth(window.innerWidth)
    if(width>900)
        handlerOpenMenu()
}

useEffect(()=>{
    if(width>900)
        handlerOpenMenu()
},[])


window.addEventListener('resize',resizeMenu)

const total = cart.reduce((acu,x)=>acu+x.price*x.count,0)


    return(<>


<div id="carrito-sombra" style={{display:stateOpenCart?"flex":"none"}}>
        <div id="carrito-pantalla">
            <div id="cerrar-carrito"><MdCancel onClick={handlerCloseCarrto}/></div>
            <div id="carrito-datos">

                {cart.map(x=><ElementCart key={x.id} name={x.name} img={x.img} price={x.price} count={x.count}/>)}
                {/* <!--<div class="carrito-articulo" id="codigo1">
                    <img src="../img/WhatsApp Image 2023-04-17 at 17.48.40 (5).jpeg" alt="">
                    
                        <div class="precio">
                            <p>Precio por unidad</p>
                            <p>5345$</p>
                        </div>
                    
                    <div class="articulo-cantidad">
                        <label for="">Cantidad</label>
                        <input type="number" min="1">
                    </div>
                    <div class="precio">
                        <p>Precio Total</p>
                        <p>324234234$</p>
                    </div>
                    <div class="cerrar-articulo" id="borrar-codigo1"><i class="fa-solid fa-xmark"></i></div>
                </div>
                <div class="carrito-articulo"></div>
                <div class="carrito-articulo"></div>--> */}

            </div>
            <h3 id="carrito-total">Total: ${total}</h3>
            <button type="button" id="enviar-carrito" onClick={handlerButtonCart}>Enviar</button>
        </div>
    </div>


        <header>
        
        <img src={image} onClick={()=>{navigate("/")}} alt="" className="imagen-principal"/>
        <h1 className="titulo" onClick={()=>{navigate("/")}} >Caramelos y Burbujitas</h1>
        <FaShoppingBag className="icono-compra" onClick={handlerOpenCarrto}/>
        <nav>
            <div className="icono" id="abrir-menu">
                
                <IoMdMenu className="icono-menu" onClick={handlerOpenMenu}/>
                
            </div>

            <ul className="menu-ul" id="menu-ul"  style={{display:viewMenu?"flex":"none"}}>
                <div id="cerrar-menu" onClick={handlerCloseMenu}><MdCancel /></div>
                <li className="menu-li"><a onClick={()=>{navigate("/broches")}}>Broches</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/set-infantil")}}>Set Infantil</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/colitas-de-pelo")}}>Colitas de pelo</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/vinchas")}}>Vinchas</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/tic-tac")}}>Tic Tac</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/carteras")}}>Carteras</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/billeteras-damas")}}>Billeteras Damas</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/billeteras-caballeros")}}>Billeteras Caballeros</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/mochilas")}}>Mochilas</a></li>
                <li className="menu-li"><a onClick={()=>{navigate("/riñoneras-y-bandoleras")}}>Riñoneras y Bandoleras</a></li>
            </ul>
            <div className="restante-menu" id="restante-menu"  style={{display:viewMenu?"flex":"none"}} onClick={handlerCloseMenu}></div>
        </nav>
        



        
    </header>
    </>
    )


}

export default Header