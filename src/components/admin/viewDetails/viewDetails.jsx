import { useLocation } from "react-router-dom"
import "./viewDetails.css"
const ViewDetails = () => {
    const { state } = useLocation()
    const { saleOrder } = state || {}
    console.log(saleOrder)


    return <div className="conteiner-view-details">

        <div className="content-view-details">
        <h3>Nombre: {saleOrder.nameUser}</h3>
        <h3>Email: {saleOrder.emailUser}</h3>
        <h3>Localidad: {saleOrder.localityUser}</h3>
        <h3>Telefono: {saleOrder.telUser}</h3>
        <h3>Fecha: {saleOrder.date}</h3>
        
        </div>


        <div className="header-table-details">
            <h3>Imagen</h3>
            <h3>Producto</h3>
            <h3>Cantidad</h3>
            <h3>SubTotal</h3>

        </div>

        <div className="div-table-details">
            {saleOrder.saleOrders.map(x=><div key={x.id} className="table-details">
                <img src={`data:image/jpeg;base64,${x.productColor ? x.productColor.image:x.image}`} alt="" />
                <p>{x.product.name} {x.productColor ? x.productColor.name:""}</p>
                <p>{x.count}</p>
                <p className="detail-subtotal">${x.subTotal}</p>
            </div>)}
            
        </div>
        <div className="div-total-sale-order">
            <h3>Total: </h3>
        <h3 className="total-sale-order">${saleOrder.total}</h3>
        </div>
    </div>

}
export default ViewDetails