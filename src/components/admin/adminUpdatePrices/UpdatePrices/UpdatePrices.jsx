import { useEffect, useState } from "react"
import { api_base_url } from "../../../../api"
import DivProductPrices from "../DivProductPrices/DivProductPrices"
import "../../adminSelectCss/Select.css"
import "./updatePrices.css"
const UpdatePrices = () => {

    const [data, setData] = useState([])
    const [nameFilter, setNameFilter] = useState([])
    const [categoryFilter, setCategoryFilter] = useState([])
    const [pricesToModify, setPricesToModify] = useState([])
    console.log(pricesToModify)

    const handlerAggregatePrice = (id, newPrice) => {
        setPricesToModify([...pricesToModify, {
            id: id,
            price: newPrice
        }])
        console.log(pricesToModify)
    }

    const handlerEliminatePrice = (id) => {
        setPricesToModify([...pricesToModify.filter(x => x.id != id)])
        console.log(pricesToModify)
    }
    const handlerNameFilter = (e) => {
        setNameFilter(e.target.value)
    }
    const handlerCategoryFilter = (e) => {
        setCategoryFilter(e.target.value)
    }

    const handlerSendUpdate = async ()=>{
        try {
            const les = await fetch(`${api_base_url}/Product/UpdatePrices`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(pricesToModify),
                method:"PUT"
            })
            alert("Precios modificados correctamente")
            
        } catch (error) {
            console.log(error)
            alert("Error Inesperado")
        }
    }

    useEffect(() => {
        fetch(`${api_base_url}/Product/GetAll`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
            .then((res) => {
                if (!res.ok)
                    throw new Error("Error inesperado")
                return res.json()
            })
            .then((res) => {
                setData(res)
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })
    }, [])

    console.log(data)

    return (
        <div className="container-select">
            <div className="filter-select">
                <label htmlFor="filter-name">Filtrar por nombre</label>
                <input type="text" name="filter-name" id="filter-name" onChange={handlerNameFilter} value={nameFilter} />
            </div>
            <div className="filter-select">
                <label htmlFor="filter-category">Filtrar por categoria</label>
                <select name="" id="" onChange={handlerCategoryFilter}>
                    <option value="">Todas</option>
                    <option value="Broche">Broche</option>
                    <option value="aaaa">aaaa</option>
                </select>
            </div>

            <div className="content-select">
                {data.filter(x => x.name.includes(nameFilter) && x.category.includes(categoryFilter)).map((x) => <DivProductPrices key={x.id} id={x.id} img={x.imageUrl} name={x.name} size={x.size} category={x.category} price={x.price} handlerAggregatePrice={handlerAggregatePrice} handlerEliminatePrice={handlerEliminatePrice} />)}
            </div>
            <button type="button" className="button-send-update-prices" onClick={handlerSendUpdate}>Enviar Modificaciónes</button>
        </div>
    )
}
export default UpdatePrices