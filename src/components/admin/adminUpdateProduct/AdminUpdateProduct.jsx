import { useContext, useEffect, useRef, useState } from "react"
import { api_base_url } from "../../../api"
import { MdCancel } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "./adminUpdateProduct.css"
import { ImageContext } from "../../../context/ImageContext";

const AdminUpdateProduct = () => {

    const location = useLocation()
    const { product } = location.state;
    const { insertImage, insertImageColor } = useContext(ImageContext)

    const refColors = useRef(null)
    const refModify = useRef(null)
    const refCategory = useRef(null)
    const refSize = useRef(null)
    //const [category, setCategory] = useState("")
    //const [subCategory, setSubCategory] = useState(product.s)
    const [colors, setColors] = useState(product.colors.map(x => ({ id: x.id, name: x.name, imageUrl: insertImageColor(product, x.name) })))
    const [colorImg, setColorImg] = useState("")
    const [img, setImg] = useState(insertImage(product))
    const [img64, setImg64] = useState(false)
    const [imgColor64, setImgColor64] = useState(false)
    const [touchButton, setTouchButton] = useState(false)
    //const [selectSubCategory, setSelectSubCategory] = useState([])
    const [selectColor, setSelectColor] = useState([])
    const [actualColor, setActualColor] = useState({})



    console.log(product)

    const handlerCategory = (e) => {
        setCategory(e.target.value)
    }





    const handlerColors = () => {
        setColors([...colors, { id: actualColor.id, name: actualColor.color, imageUrl: colorImg }])
        refColors.current.value = ""
        setColorImg("")
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

    //console.log(img)


    const dragDropColor = (e) => {
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files && files[0]) {
            const fileReader = new FileReader()
            fileReader.onload = (e) => {
                setImgColor64(e.target.result.includes("data:image"))
                setColorImg(e.target.result.includes("data:image") ? e.target.result.split(",")[1] : e.target.result)
                //console.log("url: " + colorImg)
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
                setImg64(e.target.result.includes("data:image"))
                setImg(e.target.result.includes("data:image") ? e.target.result.split(",")[1] : e.target.result) //.slice(23,-1)
                // console.log(e.target.result)
                // console.log("url: " + img)
                //console.log("url    "+e.target.result)
            }
            fileReader.readAsDataURL(files[0])
        }
    }

    useEffect(() => {
        fetch(`${api_base_url}/Color/GetAll`, {
            headers: {
                accept: "application/json"
            }
        })
            .then((res) => {
                if (!res.ok) {

                    throw new Error("Error Inesperado")
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setSelectColor(data)
            })
            .catch(() => {
                alert("Error sub categoria o color")
            })

    }, [])

    const handlerButtonAdd = async () => {
    try {
        const body = {
            subCategoryId: Number(product.subCategoryId),
            imageUrl: img,
            colors: colors.map(x => ({
                id: x.id,
                imageUrl: x.imageUrl
            }))
        }

        console.log("BODY:", body)
        console.log("JSON:", JSON.stringify(body))

        const res = await fetch(
            `${api_base_url}/Product/UpdateImage/${product.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(body)
            }
        )

        if (!res.ok) {
            const error = await res.text()
            console.error(error)
            throw new Error("Error inesperado")
        }

        const data = await res.text()
        alert(data)

    } catch (e) {
        console.error(e)
    }
}


    const setSubCategorySelect = (x) => {
        setSubCategory(x.target.value)
        console.log(x.target.value)
    }

    const setColorSelect = (x) => {
        console.log(x.target.value)
        const aux = JSON.parse(x.target.value)
        setActualColor(aux)
        console.log(actualColor)
    }


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
                    <div className="content-inputs-update">



                        {/* <div className="div-add">
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
                            <label htmlFor="subCategory">Subcategoria:</label>
                            <select name="subCategory" id="subCategory" onChange={setSubCategorySelect}>
                                <option value="" disabled selected>Ingrese su opcion</option>
                                {selectSubCategory.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
                            </select>
                        </div> */}



                        <div className="div-add">
                            <label htmlFor="color">Color:</label>
                            <select onChange={setColorSelect} ref={refColors} name="" id="">
                                <option value="" disabled selected>Ingrese su opcion</option>
                                {selectColor.map((x) => <option key={x.id} value={JSON.stringify({ id: x.id, color: x.name })}>{x.name}</option>)}
                            </select>
                            {colorImg == "" ? <div className="color-image div-image" onDragOver={dragOver} onDrop={dragDropColor}></div> : <img className="color-image" src={imgColor64 ? "data:image/jpeg;base64," + colorImg : colorImg} onDragOver={dragOver} onDrop={dragDropColor} />}
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
export default AdminUpdateProduct