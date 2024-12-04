import { useEffect, useState } from "react"
import { api_base_url } from "../../../api"
import AdminViewProduct from "../adminViewProduct/adminViewProduct"
import "../adminSelectCss/Select.css"


const AdminSelectRestore = () => {

    const [data, setData] = useState([])
    const [nameFilter, setNameFilter] = useState([])
    const [categoryFilter, setCategoryFilter] = useState([])

    const handlerNameFilter = (e) => {
        setNameFilter(e.target.value)
    }
    const handlerCategoryFilter = (e) => {
        setCategoryFilter(e.target.value)
    }

    const handlerRestoreProduct = async (product) => {
        try {
            const res = await fetch(`${api_base_url}/Product/Restore/${product.id}`,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                method:"PUT"
            })
            if(!res.ok)
                throw new Error("Error Inesperado")

            setData(data.filter(x=>x.id!=product.id))

            const resData = await res.text()
            alert(resData)
        } catch (e) { console.log(e) }
    }


    useEffect(() => {
        fetch(`${api_base_url}/Product/GetAllNoAvailable`,
            {
                headers: {
                    "Content-Type": "application/json"
                    //"Authorization": `Bearer ${localStorage.getItem("token")}`
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

    return (
        <div className="container-select">
            <div className="filter-select-update">
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
                {data.filter(x => x.name.includes(nameFilter) && x.category.includes(categoryFilter)).map((x, i) => <AdminViewProduct key={i + x.name + x.category} handler={() => { handlerRestoreProduct(x) }} name={x.name} category={x.category} size={x.size} price={x.price} img={x.imageUrl} />)}
            </div>
        </div>
    )
}
export default AdminSelectRestore