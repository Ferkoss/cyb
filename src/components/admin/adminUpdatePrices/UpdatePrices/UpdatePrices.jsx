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
    const [restoreButtons,setRestoreButtons] = useState(false)
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

    const changeData=()=>{
        let newData = [...data]
        for(let d of pricesToModify){
            newData.find(x=>x.id==d.id).price = d.price
        }
        setData(newData)
    }

    const handlerSendUpdate = async ()=>{
        try {
            const res = await fetch(`${api_base_url}/Product/UpdatePrices`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(pricesToModify),
                method:"PUT"
            })
            if(!res.ok)
                throw new Error("Error Inesperado")
            alert("Precios modificados correctamente")
            changeData()
            setRestoreButtons(restoreButtons?false:true)
            
            
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
                <option value=""  >Todas las opciones</option>
                    <option value="broches">Broches</option>
                    <option value="set-infantil">Set infantil</option>
                    <option value="colitas-de-pelo">Colitas De Pelo</option>
                    <option value="vinchas">Vinchas</option>
                    <option value="tic-tac">Tic Tac</option>
                    <option value="carteras">Carteras</option>
                    <option value="billeteras-damas">Billeteras Damas</option>
                    <option value="billeteras-caballeros">Billeteras Caballeros</option>
                    <option value="mochilas">Mochilas</option>
                    <option value="riñoneras-y-bandoleras">Riñoneras Y Bandoleras</option>
                </select>
            </div>

            <div className="content-select">
                {data.filter(x => x.name.includes(nameFilter) && x.category.includes(categoryFilter)).map((x) => <DivProductPrices key={x.id} id={x.id} img={x.imageUrl} name={x.name} size={x.size} category={x.category} price={x.price} handlerAggregatePrice={handlerAggregatePrice} handlerEliminatePrice={handlerEliminatePrice} restoreButtons={restoreButtons}  />)}
            </div>
            <button type="button" className="button-send-update-prices" onClick={handlerSendUpdate}>Enviar Modificaciónes</button>
        </div>
    )
}
export default UpdatePrices