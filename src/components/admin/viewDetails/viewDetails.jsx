import { useLocation } from "react-router-dom"
import "./viewDetails.css"
import { useContext, useEffect, useState } from "react"
import { ImageContext } from "../../../context/ImageContext"
import { api_base_url } from "../../../api"
const ViewDetails = () => {
    const { state } = useLocation()
    const { saleOrder } = state || {}
    const {insertImage,insertImageColor} = useContext(ImageContext)
    const [products,setProducts] = useState([])

    console.log(saleOrder)

    useEffect(()=>{
        fetch(`${api_base_url}/SaleOrder/GetAllDetails/${saleOrder.id}`, {
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                })
                    .then((res) => {
                        if (!res.ok)
                            throw new Error("Error Inesperado")
                        return res.json()
                    })
                    .then((resData) => {
                        setProducts(resData)
        
                    })
                    .catch((e) => { console.log(e) })
    },[])

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
            {products.map(x=><div key={x.id} className="table-details">
                <img src={`${x.product.color ? insertImageColor(x.product,x.product.color) :insertImage(x.product)}`} alt="" />
                <p>{x.product.subCategory +"/"+ (x.product.productNumber<10?"0"+x.product.productNumber:x.product.productNumber)} {x.product.color ? x.product.color:""}</p>
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