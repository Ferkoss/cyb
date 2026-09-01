import { useContext, useEffect, useState } from "react"
import { api_base_url } from "../../../api"
import AdminViewProduct from "../adminViewProduct/adminViewProduct"
import { ImageContext } from "../../../context/ImageContext"
import AdminSelect from "../adminSelectCss/AdminSelect"
import { useNavigate } from "react-router-dom"


const AdminSelectUpdate = () => {

    const navigate = useNavigate()

    const [data, setData]=useState([])

    const handlerUpdateProduct=(product)=>{
        navigate("/admin-update",{state:{product}})
    }

    return <AdminSelect func={handlerUpdateProduct} data={data} setData={setData}/>

}
export default AdminSelectUpdate