import { useState } from "react"
import "./adminAddSubCategory.css"
import { api_base_url } from "../../../api"
const AdminAddSubCategory = () => {


    /*{
  "name": "string",
  "price": 0,
  "size": 0,
  "intCategory": 0
} */

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [intCategory, setIntCategory] = useState(0)
    const [size, setSize] = useState(0)

    const handlerCategory=(e)=>{
        setIntCategory(e.target.value)
    }

    const handlerPrice = (e)=>{
        setPrice(e.target.value)
    }

    const handlerName=(e)=>{
        setName(e.target.value)
    }

    const handlerSize=(e)=>{
        setSize(e.target.value)
    }
    
    const addSubCategory = async () => {
        try {
            res = await fetch(`${api_base_url}/SubCategory/Add`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                    method: "POST",
                    body: JSON.stringify({
                        name: name,
                        price: Number(price),
                        size: Number(size),
                        intCategory: Number(intCategory)
                    })
                }
            )
            if (!res.ok)
                throw new Error("Error inesperado")

            alert("sub categoria agregada correctamente")
        }
        catch (e) {
            alert(e.Error)
        }
    }

    return <div className="addSubCategory-container">
        <div className="addSubCategory-data">
            <label htmlFor="nombre">Ingrese el nombre: </label>
            <input type="text" name="nombre" id="nombre" onChange={handlerName}/>
        </div>
        <div className="addSubCategory-data">
            <label htmlFor="price">Ingrese el precio: </label>
            <input type="number" name="price" id="price" onChange={handlerPrice}/>
        </div>
        <div className="addSubCategory-data">
            <label htmlFor="category">Ingrese la categoria: </label>
            <select name="category" id="category" defaultValue=""  onChange={handlerCategory}>
                <option value="" disabled >Ingrese su opcion</option>
                <option value="1">Broches</option>
                <option value="2">Colitas De Pelo</option>
                <option value="3">Vinchas</option>
                <option value="4">Tic Tac</option>
                <option value="5">Carteras y Billeteras</option>
            </select>
        </div>
        <div className="addSubCategory-data">
            <label htmlFor="size">Ingrese el tamaño: </label>

            <select name="size" id="size" onChange={handlerSize}>
                <option value="0">Grande</option>
                <option value="1">Mediano</option>
                <option value="2">Chico</option>
                <option value="3">Mini por 2 pares</option>
            </select>
        </div>
        <button className="addSubCategory-button" onClick={addSubCategory}>Enviar</button>
    </div>
}
export default AdminAddSubCategory