import { useRef, useState } from "react"
import { api_base_url } from "../../../api"
import { MdCancel } from "react-icons/md";
import "./adminAddProduct.css"

const AdminAddProduct = () => {

    const refColors = useRef(null)
    const refModify = useRef(null)
    const refCategory = useRef(null)
    const refSize = useRef(null)
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [size, setSize] = useState("")
    const [price, setPrice] = useState(0)
    const [colors, setColors] = useState([])
    const [colorImg, setColorImg] = useState("")
    const [img, setImg] = useState("")
    const [img64, setImg64] = useState(false)
    const [touchButton,setTouchButton] = useState(false)

    const handlerName = (e) => {
        setName(e.target.value)
    }

    const handlerCategory = (e) => {
        setCategory(e.target.value)
    }

    const handlerSize = (e) => {
        setSize(e.target.value)
    }

    const handlerPrice = (e) => {
        setPrice(e.target.value)
    }

    const handlerColors = () => {
        setColors([...colors, { name: refColors.current.value, imageUrl: colorImg }])
        refColors.current.value=""
        setColorImg("")
        //console.log(colors)
    }

    const handlerModifyColorsFlex = () => {
        refModify.current.style.display = "flex"
    }

    const handlerModifyColorsNone = () => {
        refModify.current.style.display = "none"
    }

    /*{
          "name": "string",
          "imageUrl": "string"
        } */
    /*console.log(JSON.stringify({

        "name": name,
        "category": category,
        "size": size,
        
        "price": price,
        "colors": JSON.stringify(colors),
        "imageUrl": img

    }))*/

    console.log(img)


    const dragDropColor = (e) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files && files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {

                setColorImg(e.target.result.includes("data:image/jpeg;base64,") ? e.target.result.slice(23) : e.target.result)
                console.log("url: " + colorImg)
                //console.log("url    "+e.target.result)
            }
            fileReader.readAsDataURL(files[0])
        }
    }

    const dragOver = (e) => {
        e.preventDefault()

    }



    const dragDrop = (e) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files && files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                setImg64(e.target.result.includes("data:image/jpeg;base64,"))
                setImg(e.target.result.includes("data:image/jpeg;base64,") ? e.target.result.slice(23) : e.target.result) //.slice(23,-1)
                console.log(e.target.result)
                console.log("url: " + img)
                //console.log("url    "+e.target.result)
            }
            fileReader.readAsDataURL(files[0])
        }
    }

    const handlerButtonAdd = async () => {
        if(touchButton)
            return;
        setTouchButton(true)
        try {
            const res = await fetch(`${api_base_url}/Product/Add`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                method: "POST",
                body: JSON.stringify({

                    name: name,
                    category: category,
                    size: size,
                    imageUrl: img,
                    price: price,
                    colors: colors

                })
            })

            if (!res.ok)
                throw new Error("Error inesperado")
            const data = await res.text()
            alert(data)

            setName("")
            setCategory("")
            refCategory.current.value=""
            setSize("")
            refSize.current.value=""
            setPrice(0)
             setColors([])
             setColorImg("")
             setImg("")
             setImg64(false)
        }
        catch (e) { console.log(e) }
        setTouchButton(false)
    }
    console.log(colors)
    return (
        <div className="conteiner-add">

            <div className="modify-color-shadow" ref={refModify}>
                <div className="modify-color">
                    <MdCancel className="modify-close" onClick={handlerModifyColorsNone} />
                    <div className="modify-color-div">
                        {colors.map(x =>
                            <div className="article-modify">
                                <img src={x.imageUrl.includes("http") ? x.imageUrl : "data:image/jpeg;base64," + x.imageUrl} alt={x.name} />
                                <p>{x.name}</p>
                                <MdCancel className="product-close" onClick={() => { setColors(colors.filter(y => y.name != x.name)) }} />
                            </div>)}
                    </div>
                </div>
            </div>



            <div className="content-add">
                <div className="content-add-divs">
                    <div className="content-inputs-add">

                        <div className="div-add">
                            <label htmlFor="name">Nombre:</label>
                            <input type="text" onChange={handlerName} value={name}/>
                        </div>

                        <div className="div-add">
                            <label htmlFor="category">Categoria:</label>
                            <select name="category" id="category" defaultValue="" ref={refCategory} onChange={handlerCategory}>
                                <option value="" disabled >Ingrese su opcion</option>
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

                        <div className="div-add">
                            <label htmlFor="category">Tamaño:</label>
                            <select name="category" id="category" defaultValue="" ref={refSize} onChange={handlerSize}>
                                <option value="" disabled >Ingrese su opcion</option>
                                <option value="Mini por dos pares">Mini por dos pares</option>
                                <option value="Chico">Chico</option>
                                <option value="Mediano">Mediano</option>
                                <option value="Grande">Grande</option>
                            </select>
                        </div>

                        <div className="div-add">
                            <label htmlFor="price">Precio:</label>
                            <input type="number" min={0} onChange={handlerPrice} value={price}/>
                        </div>

                        <div className="div-add">
                            <label htmlFor="color">Color:</label>
                            <input type="text" ref={refColors} />
                            {colorImg == "" ? <div className="color-image div-image" onDragOver={dragOver} onDrop={dragDropColor}></div> : <img className="color-image" src={"data:image/jpeg;base64," + colorImg} onDragOver={dragOver} onDrop={dragDropColor} />}
                            <button type="button" onClick={handlerColors}>Agregar Color</button>
                            <button type="button" onClick={handlerModifyColorsFlex}>Modificar Color</button>
                        </div>




                    </div>
                    {img == "" ? <div className="image-add div-image" onDragOver={dragOver} onDrop={dragDrop}></div> : <img src={img64 ? "data:image/jpeg;base64," + img : img} className="image-add" onDragOver={dragOver} onDrop={dragDrop} />}

                </div>

                <button type="button" className="button-add" onClick={handlerButtonAdd}>Agregar Producto</button>
            </div>

        </div>
    )
}
export default AdminAddProduct