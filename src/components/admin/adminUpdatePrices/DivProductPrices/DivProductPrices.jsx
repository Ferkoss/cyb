import { useState } from "react"
import "./divProductPrices.css"

const divProductPrices = ({img, name, size, category, price, id,handlerAggregatePrice,handlerEliminatePrice})=>{

    const [newPrice,setNewPrice] = useState(0)
    
    const [productModificated,setProductModificated] = useState(false)

    const handlerModifyButton = ()=>{
        handlerAggregatePrice(id,newPrice)
        setProductModificated(true)
    }
    

    const handlerModify = (e)=>{
        setNewPrice(e.target.value)
    }

    const handlerCancelModifyButton = ()=>{
        //setPricesToModify(...pricesToModify.filter(x=>x.id!=id))
        handlerEliminatePrice(id)
        setProductModificated(false)
    }
    
return (
            <div className="contenedor-articulo-prod">
                <img src={img} alt=""/>
                <div className="contenido-articulo-prod">
                    <h3>{name}</h3>
                    <h4>{category}</h4>
                    <p>{size}</p>
                    <p>Precio Actual: {price}</p>
                    <label htmlFor="price">Nuevo Precio: </label>
                    <input type="number" id="price" name="price" value={newPrice} onChange={handlerModify}/>
                    {!productModificated?<button type="button" className="modify-prices" onClick={handlerModifyButton}>Modificar Precio</button>:<button type="button" className="modify-prices" onClick={handlerCancelModifyButton}>Cancelar Modificación</button>}
                </div>
            </div>
)
}
export default divProductPrices