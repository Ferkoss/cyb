import AdminSelect from "../adminSelectCss/AdminSelect"
import { api_base_url } from "../../../api"
import { useState } from "react"


const AdminSelectRestore = () => {

    const [data, setData] = useState([])

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

    return <AdminSelect func={handlerRestoreProduct} data={data} setData={setData} restore={true}/>

}
export default AdminSelectRestore