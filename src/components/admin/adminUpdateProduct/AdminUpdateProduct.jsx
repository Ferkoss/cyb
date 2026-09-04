import { useContext, useEffect, useRef, useState } from "react"
import { api_base_url } from "../../../api"
import { MdCancel } from "react-icons/md";
import { useLocation } from "react-router-dom";
import "./adminUpdateProduct.css"
import { ImageContext } from "../../../context/ImageContext";
import { Container,Row,Col,Form,Button } from "react-bootstrap";

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
        <div className="container-add">

    {/* MODIFICAR COLORES */}
    <div className="modify-color-shadow" ref={refModify}>
        <div className="modify-color">

            <MdCancel
                className="modify-close"
                onClick={handlerModifyColorsNone}
            />

            <div className="modify-color-div">

                {colors.map(x => (
                    <div className="article-modify" key={x.name}>

                        <img
                            src={
                                x.imageUrl.includes("http")
                                    ? x.imageUrl
                                    : "data:image/jpeg;base64," + x.imageUrl
                            }
                            alt={x.name}
                        />

                        <p>{x.name}</p>

                        <MdCancel
                            className="product-close"
                            onClick={() =>
                                setColors(
                                    colors.filter(y => y.name !== x.name)
                                )
                            }
                        />

                    </div>
                ))}

            </div>
        </div>
    </div>


    {/* CONTENIDO */}
    <Container className="py-4">

        <Row className="g-4">

            {/* DATOS */}
            <Col xs={12} lg={7}>

                <div className="p-3 border rounded">

                    <Form.Group>

                        <Form.Label htmlFor="color">
                            Color:
                        </Form.Label>

                        <Form.Select
                            onChange={setColorSelect}
                            ref={refColors}
                            name="color"
                            id="color"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Ingrese su opción
                            </option>

                            {selectColor.map(x => (
                                <option
                                    key={x.id}
                                    value={JSON.stringify({
                                        id: x.id,
                                        color: x.name
                                    })}
                                >
                                    {x.name}
                                </option>
                            ))}

                        </Form.Select>


                        {/* IMAGEN DEL COLOR */}
                        <div className="mt-3">

                            {colorImg === "" ? (

                                <div
                                    className="color-image div-image"
                                    onDragOver={dragOver}
                                    onDrop={dragDropColor}
                                />

                            ) : (

                                <img
                                    className="color-image"
                                    src={
                                        imgColor64
                                            ? "data:image/jpeg;base64," + colorImg
                                            : colorImg
                                    }
                                    onDragOver={dragOver}
                                    onDrop={dragDropColor}
                                    alt="Color"
                                />

                            )}

                        </div>


                        {/* BOTONES */}
                        <div className="d-flex gap-2 mt-3 flex-wrap">

                            <Button
                                type="button"
                                onClick={handlerColors}
                                variant="primary"
                            >
                                Agregar Color
                            </Button>

                            <Button
                                type="button"
                                onClick={handlerModifyColorsFlex}
                                variant="secondary"
                            >
                                Modificar Color
                            </Button>

                        </div>

                    </Form.Group>

                </div>

            </Col>


            {/* IMAGEN DEL PRODUCTO */}
            <Col xs={12} lg={5}>

                <div className="h-100 d-flex justify-content-center align-items-center">

                    {img === "" ? (

                        <div
                            className="image-update div-image w-100"
                            onDragOver={dragOver}
                            onDrop={dragDrop}
                        />

                    ) : (

                        <img
                            src={
                                img64
                                    ? "data:image/jpeg;base64," + img
                                    : img
                            }
                            className="image-update img-fluid"
                            onDragOver={dragOver}
                            onDrop={dragDrop}
                            alt="Producto"
                        />

                    )}

                </div>

            </Col>

        </Row>


        {/* ACTUALIZAR */}
        <div className="d-flex justify-content-center mt-4">

            <Button
                type="button"
                className="button-update"
                variant="success"
                onClick={handlerButtonAdd}
            >
                Actualizar Producto
            </Button>

        </div>

    </Container>

</div>
    )
}
export default AdminUpdateProduct