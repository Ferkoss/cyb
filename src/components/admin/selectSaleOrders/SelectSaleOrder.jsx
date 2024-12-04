import { useEffect, useState } from "react"
import { api_base_url } from "../../../api"
import "./selectSaleOrders.css"
import { useNavigate } from "react-router-dom"
const SelectSaleOrder = () => {

    const navigate = useNavigate()

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`${api_base_url}/SaleOrder/GetAll`, {
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
                setData(resData)

            })
            .catch((e) => { console.log(e) })
    }, [])

    const handlerSaleOrder = (saleOrder) => {
        navigate("/viewDetails",{state:{saleOrder}})
    }
    console.log(data)
    return <div className="conteiner-select-so">
        <div className="header-select-so">
            <h2>Nombre</h2>
            <h2>Email</h2>
            <h2>Localidad</h2>
            <h2>Telefono</h2>
            <h2>Fecha</h2>
        </div>
        {data.map(x => <div className="content-select-so" key={x.id} onClick={() => { handlerSaleOrder(x) }}>
            <p>{x.nameUser}</p>
            <p>{x.emailUser}</p>
            <p>{x.localityUser}</p>
            <p>{x.telUser}</p>
            <p>{x.date.slice(0,9)}</p>

        </div>)}

    </div>

}
export default SelectSaleOrder