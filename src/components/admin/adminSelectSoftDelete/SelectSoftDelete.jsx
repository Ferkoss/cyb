
import { useState } from "react"
import { api_base_url } from "../../../api"
import AdminSelect from "../adminSelectCss/AdminSelect"

const SelectSoftDelete=()=>{

    const [data, setData]=useState([])

    const handlerSoftDeleteProduct= async (product)=>{
        try{
        const res = await fetch(`${api_base_url}/Product/SoftDelete/${product.id}`,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            method:"DELETE"
        })
        if(!res.ok)
            throw new Error("Error inesperado")
        const resMessage = await res.text()
        alert(resMessage)

        setData(data.filter(x=>x.id!=product.id))

    }catch(e){alert(e)}
    }
    return <AdminSelect func={handlerSoftDeleteProduct} data={data} setData={setData}/>
}
export default SelectSoftDelete