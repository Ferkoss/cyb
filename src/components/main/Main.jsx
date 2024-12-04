import "./main.css"
import imagenFondo from "../../img/imagen-fondo.png"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { CartContext } from "../../context/CartContext"

const Main=()=>{


const navigate = useNavigate()
const {actualizateCart} = useContext(CartContext)
useEffect(actualizateCart,[])

    return(
        <main className="main-inicio">
        <div className="contenedor-main">
            <div className="contenedor-articulo" onClick={()=>{navigate("/broches")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Broches</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/set-infantil")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Set Infantil</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/colitas-de-pelo")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Colitas de pelo</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/vinchas")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Vinchas</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/tic-tac")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Tic Tac</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/carteras")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Carteras</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/billeteras-damas")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Billeteras Damas</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/billeteras-caballeros")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Billeteras Caballeros</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/mochilas")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Mochilas</h3>
            </div>
            <div className="contenedor-articulo" onClick={()=>{navigate("/riñoneras-y-bandoleras")}}>
                <img className="contenedor-articulo-inicio-img" src={imagenFondo} alt=""/>
                <h3 className="contenedor-articulo-inicio-h3">Riñoneras y Bandoleras</h3>
            </div>

        </div>
    </main>
    )
}

export default Main