import { useEffect, useState } from "react"
import { api_base_url } from "../../../api"
import "./selectSaleOrders.css"
import { useNavigate } from "react-router-dom"
import { CgAdd } from "react-icons/cg";
const SelectSaleOrder = () => {

    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [skip,setSkip] = useState(0)
    const take = 5

    const getSaleOrders = () => {
        fetch(`${api_base_url}/SaleOrder/SaleOrderRangeData/${skip}/${take}`, {
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
                console.log(resData)
                setData([...data,...resData])
                setSkip(skip+take)
                
            })
            .catch((e) => { console.log(e) })
    }

    useEffect(getSaleOrders, [])

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
            <p>{x.date.slice(0,10)}</p>

        </div>)}
        <button type="button" className="boton-agregar" onClick={getSaleOrders}><CgAdd /></button>
    </div>

}
export default SelectSaleOrder