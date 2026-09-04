import { useEffect, useRef, useState } from "react"
import { api_base_url } from "../../../api"
import { MdCancel } from "react-icons/md";
import "./adminAddProduct.css"
import { Container,Row,Col,Form,Button } from "react-bootstrap";

const AdminAddProduct = () => {

    const refColors = useRef(null)
    const refModify = useRef(null)
    const refCategory = useRef(null)
    const refSize = useRef(null)
    const [category, setCategory] = useState("")
    const [subCategory, setSubCategory] = useState(0)
    const [colors, setColors] = useState([])
    const [colorImg, setColorImg] = useState("")
    const [img, setImg] = useState("")
    const [img64, setImg64] = useState(false)
    const [imgColor64, setImgColor64] = useState(false)
    const [touchButton, setTouchButton] = useState(false)
    const [selectSubCategory, setSelectSubCategory] = useState([])
    const [selectColor, setSelectColor] = useState([])
    const [actualColor, setActualColor] = useState({})

 





    const handlerColors = () => {
        setColors([...colors, { id: actualColor.id, name: actualColor.color, imageUrl: colorImg }])
        refColors.current.value = ""
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
                //setSelectSubCategory(data.subCategories)
                setSelectColor(data)
            })
            .catch(() => {
                alert("Error color")
            })

    }, [])

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

    const handlerButtonAdd = async () => {
        if (touchButton) {
            alert("Espera")
            return;
        }
        setTouchButton(true)


        console.log({

            subCategoryId: subCategory,
            imageUrl: img,
            colors: colors.map(x => ({
                id: x.id,
                imageUrl: x.imageUrl
            }))

        })


        try {
            const res = await fetch(`${api_base_url}/Product/Add`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                method: "POST",
                body: JSON.stringify({

                    subCategoryId: subCategory,
                    imageUrl: img,
                    colors: colors.map(x => ({
                        id: x.id,
                        imageUrl: x.imageUrl
                    }))

                })
            })

            if (!res.ok)
                throw new Error("Error inesperado")
            const data = await res.text()
            //alert(data)


            setCategory("")
            //refCategory.current.value = ""

            //refSize.current.value = ""

            setColors([])
            setColorImg("")
            setImgColor64(false)
            setImg("")
            setImg64(false)
        }
        catch (e) {
            alert(e)
            console.log(e)
        }
        setTouchButton(false)
    }
    console.log(colors)


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


    return (<>
    {/* MODIFICAR COLORES */}
    <div className="modify-color-shadow" ref={refModify}>
        <div className="modify-color">
            <MdCancel
                className="modify-close"
                onClick={handlerModifyColorsNone}
            />

            <div className="modify-color-div">
                {colors.map(x =>
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
                )}
            </div>
        </div>
    </div>
        <Container className="py-4">



    {/* CONTENIDO PRINCIPAL */}
    <Row className="g-4">

        {/* DATOS DEL PRODUCTO */}
        <Col xs={12} lg={7}>

            <div className="p-3 border rounded">

                {/* CATEGORÍA */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="category">
                        Categoría:
                    </Form.Label>

                    <Form.Select
                        name="category"
                        id="category"
                        defaultValue=""
                        ref={refCategory}
                        onChange={handlerChangeCategory}
                    >
                        <option value="" disabled>
                            Ingrese su opción
                        </option>

                        <option value="1">Broches</option>
                        <option value="2">Colitas De Pelo</option>
                        <option value="3">Vinchas</option>
                        <option value="4">Tic Tac</option>
                        <option value="5">Carteras-Billeteras</option>
                    </Form.Select>
                </Form.Group>


                {/* SUBCATEGORÍA */}
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="subCategory">
                        Subcategoría:
                    </Form.Label>

                    <Form.Select
                        name="subCategory"
                        id="subCategory"
                        defaultValue=""
                        onChange={setSubCategorySelect}
                    >
                        <option value="" disabled>
                            Ingrese su opción
                        </option>

                        {selectSubCategory.map(x =>
                            <option
                                key={x.id}
                                value={x.id}
                            >
                                {x.name}
                            </option>
                        )}
                    </Form.Select>
                </Form.Group>


                {/* COLOR */}
                <Form.Group className="mb-3">

                    <Form.Label htmlFor="color">
                        Color:
                    </Form.Label>

                    <Form.Select
                        ref={refColors}
                        name="color"
                        id="color"
                        defaultValue=""
                        onChange={setColorSelect}
                    >
                        <option value="" disabled>
                            Ingrese su opción
                        </option>

                        {selectColor.map(x =>
                            <option
                                key={x.id}
                                value={JSON.stringify({
                                    id: x.id,
                                    color: x.name
                                })}
                            >
                                {x.name}
                            </option>
                        )}
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
                            variant="primary"
                            onClick={handlerColors}
                        >
                            Agregar Color
                        </Button>

                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handlerModifyColorsFlex}
                        >
                            Modificar Color
                        </Button>

                    </div>
                   
                </Form.Group>

            </div>

        </Col>


        {/* IMAGEN PRINCIPAL */}
        <Col xs={12} lg={5}>

            <div className="h-100 d-flex justify-content-center align-items-center">

                {img === "" ? (
                    <div
                        className="image-add div-image w-100"
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
                        className="image-add img-fluid"
                        onDragOver={dragOver}
                        onDrop={dragDrop}
                        alt="Producto"
                    />
                )}

            </div>

        </Col>
    

    </Row>
     {/* BOTÓN AGREGAR */}
        <Button
            type="button"
            className="button-add"
            variant="success"
            onClick={handlerButtonAdd}
        >
            Agregar Producto
        </Button>

    

</Container>
    </>)
}
export default AdminAddProduct