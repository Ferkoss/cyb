import { useNavigate } from "react-router-dom"
import "./adminMenu.css"

const AdminMenu = () => {
    const navigate = useNavigate()
    return (
        <div className="conteiner-admin-menu">
            <div className="content-admin-menu">
                <div className="buttons-menu">
                    <button type="button" onClick={() => { navigate("/admin-add-product") }}>Agregar Producto</button>
                    <button type="button" onClick={() => { navigate("/admin-delete") }}>Eliminar Producto</button>
                    <button type="button" onClick={() => { navigate("/admin-soft-delete") }}>Esconder Producto</button>
                    <button type="button" onClick={() => { navigate("/admin-restore") }}>Restaurar Producto</button>
                    <button type="button" onClick={() => { navigate("/admin-select-update") }}>Modificar Producto</button>
                    <button type="button" onClick={() => { navigate("/update-prices") }}>Modificar Precios del Producto</button>
                </div>

                <div className="buttons-menu">
                    <button type="button" onClick={() => { navigate("/selectSaleOrder") }}>Ver Pedidos</button>
                
                </div>

            </div>

        </div>
    )
}
export default AdminMenu