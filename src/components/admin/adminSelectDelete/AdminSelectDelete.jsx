import AdminSelect from "../adminSelectCss/AdminSelect"
import { api_base_url } from "../../../api"
import { useState } from "react"
const AdminSelectDelete = ()=>{

    const [data, setData]=useState([])
    

    const handlerDeleteProduct = async (product) => {
        console.log(product)
        try {
            const res = await fetch(`${api_base_url}/Product/Delete/${product.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                method: "DELETE"
            })
            if (!res.ok)
                throw new Error("Error Inesperado")

            setData(data.filter(x => x.id != product.id))

            const resData = await res.text()
            alert(resData)
        } catch (e) { console.log(e) }
    }
    return <AdminSelect func={handlerDeleteProduct} data={data} setData={setData}/>
}

export default AdminSelectDelete