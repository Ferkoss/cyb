import { useContext, useState } from "react"
import "./cartSummary.css"
import { CartContext } from "../../context/CartContext"
import CartShadow from "../cartShadow/CartShadow"
const CartSummary = () => {
    const {cart} = useContext(CartContext)
    const total = cart.reduce((acu,x)=>acu+x.price*x.count,0)
    const [view,setView] = useState(false)

    return <><CartShadow view={view} setView={setView} total={total}/><main id="main-summary">
        
        <div className="cabecera">
            <h3 className="nombre">Nombre</h3>
            <h3 className="cantidad">Cantidad</h3>
            <h3 className="precio">Precio Final</h3>
        </div>
        <div className="div-articulos" id="cont-articulos">

            {/* <article>
                <p class="nombre">B7/01</p>
                <p class="cantidad">100</p>
                <p class="precio">$1020000</p>
            </article> */}
            {cart.map((x)=><article key={x.id}>
                <p className="nombre">{x.name}</p>
                <p className="cantidad">{x.count}</p>
                <p className="precio">${x.price*x.count}</p>
            </article>)}

        </div>
        <div className="pie-main">
            <b>Total:</b>
            <p id="total">${total}</p>
        </div>
        <div className="div-boton"><button id="botonSiguiente" onClick={()=>{setView(true)}}>Siguiente</button></div>
    </main></>
        
}
export default CartSummary