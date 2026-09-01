import { useNavigate } from "react-router-dom"
import "./footer.css"

const Footer = ()=>{
    const navigate = useNavigate()
    return  <footer>
        
    <div className="datos-footer">
        <div className="contacto">
            <h3>Contactanos:</h3>
            <ul>
                <li className="contacto-footer">Tel: 3412129131</li>
                <li className="contacto-footer">Mail: CyB@gmail.com</li>
                <li className="contacto-footer">Rosario - Santa Fe</li>
            </ul>
        </div>
        <div className="accesos">
            <h3>Accesos</h3>
            <ul>
            <li ><a onClick={()=>{navigate("/broches")}}>Broches</a></li>
                <li ><a onClick={()=>{navigate("/colitas-de-pelo")}}>Colitas de pelo</a></li>
                <li ><a onClick={()=>{navigate("/vinchas")}}>Vinchas</a></li>
                <li ><a onClick={()=>{navigate("/tic-tac")}}>Tic Tac</a></li>
                <li ><a onClick={()=>{navigate("/carteras-billeteras")}}>Carteras y Billeteras</a></li>
            </ul>
        </div>
    </div>
    <h3 className="fin">¡¡¡MUCHAS GRACIAS!!!</h3>
</footer>
}

export default Footer