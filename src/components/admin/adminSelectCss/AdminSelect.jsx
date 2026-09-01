import { useEffect, useState } from "react"
import { api_base_url } from "../../../api"
import AdminViewProduct from "../adminViewProduct/adminViewProduct"
import "./Select.css"
import { useContext } from "react"
import { ImageContext } from "../../../context/ImageContext"


const AdminSelect=({func,data, setData,restore=false})=>{


    
    const [nameFilter, setNameFilter] = useState([])
    const [categoryFilter, setCategoryFilter] = useState([])
    const [subCategory, setSubCategory] = useState(0)
    const [selectSubCategory, setSelectSubCategory] = useState([])

    const { insertImage, insertImageColor } = useContext(ImageContext)


    


    // useEffect(() => {
    //     fetch(`${api_base_url}/SubCategory/GetAll`, {
    //         headers: {
    //             accept: "application/json"
    //         }
    //     })
    //         .then((res) => {
    //             if (!res.ok) {

    //                 throw new Error("Error Inesperado")
    //             }
    //             return res.json()
    //         })
    //         .then((data) => {
    //             console.log(data)
    //             setSelectSubCategory(data)
    //         })
    //         .catch(() => {
    //             alert("Error sub categoria o color")
    //         })

    // }, [])

    const handlerBuscar = () => {
        fetch(`${api_base_url}/Product/GetBySubCategory${restore?"Restore":""}/${subCategory}`,
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
    }

    const handlerChangeSubCategory = (e)=>{
        setSubCategory(e.target.value)
    }

    const handlerChangeCategory = async (e) => {
        try {
            const res = await fetch(`${api_base_url}/SubCategory/GetAllByCategory/${e.target.value}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }

            })
            if(!res.ok)
                throw new Error("error de subcategoria")
            const data = await res.json()
            console.log(data)
            setSelectSubCategory(data)
        }
        catch (err) { console.error(err) }
    }
    
    return (
        <div className="container-select">

            {/* <div className="filter-select">
                <label htmlFor="filter-name">Filtrar por nombre</label>
                <input type="text" name="filter-name" id="filter-name" onChange={handlerNameFilter} value={nameFilter} />
            </div> */}

            {/* <div className="filter-select">
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
            </div> */}

            <div className="filter-select">
                            <label htmlFor="category">Categoria:</label>
                            <select name="category" id="category" defaultValue="" onChange={handlerChangeCategory}>
                                <option value="" disabled >Ingrese su opcion</option>
                                <option value="1">Broches</option>
                                <option value="2">Colitas De Pelo</option>
                                <option value="3">Vinchas</option>
                                <option value="4">Tic Tac</option>
                                <option value="5">Carteras-Billeteras</option>
                            </select>
                        </div>

            <div className="filter-select">
                <label htmlFor="filter-category">Filtrar por subcategoria</label>
                <select name="subCategory" id="subCategory" onChange={handlerChangeSubCategory}>
                    <option value="" disabled selected>Ingrese su opcion</option>
                    {selectSubCategory.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
                </select>
            </div>

            <button onClick={handlerBuscar}>Buscar</button>

            <div className="content-select">
                {data.map((x, i) => <AdminViewProduct key={x.id} handler={() => { func({...x,subCategoryId:subCategory}) }} name={x.subCategory + "/" + x.productNumber} category={x.category} size={x.size} price={x.price} img={insertImage({ subCategory: x.subCategory, productNumber: x.productNumber })} />)}
            </div>
        </div>
    )
}
export default AdminSelect