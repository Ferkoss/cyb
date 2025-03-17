import { useEffect, useState } from "react"
import { api_base_url } from "../../../api"
import AdminViewProduct from "../adminViewProduct/adminViewProduct"
import "../adminSelectCss/Select.css"
import { useNavigate } from "react-router-dom"
const AdminSelectUpdate=()=>{

    const navigate = useNavigate()

    const [data,setData] = useState([])
    const [nameFilter,setNameFilter] = useState([])
    const [categoryFilter,setCategoryFilter] = useState([])

    const handlerNameFilter=(e)=>{
        setNameFilter(e.target.value)
    }
    const handlerCategoryFilter=(e)=>{
        setCategoryFilter(e.target.value)
    }

    const handlerUpdateProduct=(product)=>{
        navigate("/admin-update",{state:{product}})
    }


    useEffect(()=>{
        fetch(`${api_base_url}/Product/GetAll`,
            {
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }
        )
        .then((res)=>{
            if(!res.ok)
                throw new Error("Error inesperado")
            return res.json()
        })
        .then((res)=>{
            setData(res)
            console.log(res)
        })
        .catch((e)=>{
            console.log(e)
        })
    },[])
    
    return (
        <div className="container-select">
            <div className="filter-select">
                <label htmlFor="filter-name">Filtrar por nombre</label>
                <input type="text" name="filter-name" id="filter-name" onChange={handlerNameFilter} value={nameFilter}/>
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
                {data.filter(x=>x.name.includes(nameFilter) && x.category.includes(categoryFilter)).map((x,i)=><AdminViewProduct key={i+x.name+x.category} handler={()=>{handlerUpdateProduct(x)}} name={x.name} category={x.category} size={x.size} price={x.price} img={x.imageUrl} />)}
            </div>
        </div>
    )

}
export default AdminSelectUpdate