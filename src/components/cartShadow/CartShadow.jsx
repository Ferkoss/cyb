import { useContext, useEffect, useRef, useState } from "react"
import { api_base_url } from "../../api"
import "./cartShadow.css"
import { CartContext } from "../../context/CartContext"
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import emailjs from '@emailjs/browser';
const CartShadow = ({ view, setView,total }) => {
    const {cart,actualizateCart,setCart} = useContext(CartContext)
    const [name, setName] = useState("")
    const [subName, setSubName] = useState("")
    const [tel, setTel] = useState(0)
    const [email, setEmail] = useState("")
    const [locality, setLocality] = useState("")
    const refFinish = useRef(null)
    const [viewContent,setViewContent] = useState(true)

    const navigate = useNavigate()
    

    const handlerCloseForm=()=>{
        setView(false)
    }

    const handlerChangeName = (e) => {
        setName(e.target.value)
    }

    const handlerChangeSubName = (e) => {
        setSubName(e.target.value)
    }

    const handlerChangeTel = (e) => {
        setTel(e.target.value)
    }

    const handlerChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlerChangeLocality = (e) => {
        setLocality(e.target.value)
    }

    console.log(cart.map(x=>`Nombre: ${x.name}\nCantidad: ${x.count}\nPrecio: $${x.price*x.count}`).join("\n---------------------------------------------------\n"))

    const handlerSendData = async (e) => {
        e.preventDefault()       
        try{
        const res = await fetch(`${api_base_url}/SaleOrder/Add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                saleOrders: cart.map(x=>({
                    prodId: x.id,
                    prodColorId: x.idProdColor,
                    count:Number(x.count)
                }))
                   /* {
                        prodId: 0,
                        prodColorId: 0,
                        count: 0
                    }*/
                ,
                nameUser: name+" "+subName,
                telUser: tel,
                emailUser: email,
                localityUser: locality,
                

            })
        })
        if(!res.ok) 
            throw new Error("Error Inesperado")
        const data = await res.text()
        alert(data)


        /*const dataMail = {
            nombre:name,
            apellido:subName,
            telefono:tel,
            email:email,
            localidad:locality,
            pedido:cart.map(x=>`Nombre: ${x.name}\nCantidad: ${x.count}\nPrecio: $${x.price*x.count}`).join("\n---------------------------------------------------\n"),
            reply_to: "cybproductosrosario@gmail.com",
        }*/

        //emailjs.send("service_rqfikac","template_gj0miaq",dataMail);
  
        emailjs.send("service_rqfikac","template_gj0miaq",{
            nombre:name,
            apellido:subName,
            telefono:tel,
            email:email,
            localidad:locality,
            pedido:cart.map(x=>`Nombre: ${x.name}\nCantidad: ${x.count}\nPrecio: $${x.price*x.count}`).join("\n---------------------------------------------------\n")
            +`\n\nTotal: $${total}`
            ,
            reply_to: "cybproductosrosario@gmail.com",
            },
            "_B3_jwoNht_6X9doT"
        );

        setViewContent(false)
        refFinish.current.style.display="flex"
        localStorage.removeItem("CyB-Cart")
        setCart([])
        


    }catch(e){console.log(e)}

    }

    const handlerFinish = ()=>{
        refFinish.current.style.display="none"
        setViewContent(true)
        setView(false)
        navigate("/")
    }

    useEffect(actualizateCart,[])

    return <div className="sombra-form" style={{ display: view ? "flex" : "none" }} id="sombra-form">
        <div className="contenedor-form" id="contenedor-form" style={{display:viewContent?"flex":"none"}}>
            <MdCancel id="cerrar-form" onClick={handlerCloseForm}/>
            <h2>Complete los datos</h2>
            <form action="" id="form-envio" onSubmit={handlerSendData}>

                <div className="form-item">
                    <label htmlFor="nom">Nombre</label>
                    <input type="text" required id="nom" name="nom" value={name} onChange={handlerChangeName}/>
                </div>

                <div className="form-item">
                    <label htmlFor="ape">Apellido</label>
                    <input type="text" required id="ape" name="ape" value={subName} onChange={handlerChangeSubName}/>
                </div>
                <div className="form-item">
                    <label htmlFor="tel">Teléfono</label>
                    <input type="number" required id="tel" name="tel" min="0" value={tel} onChange={handlerChangeTel}/>
                </div>
                <div className="form-item">
                    <label htmlFor="email">Email</label>
                    <input type="email" required id="email" name="mail" value={email} onChange={handlerChangeEmail}/>
                </div>
                <div className="form-item">
                    <label htmlFor="loc">Localidad</label>
                    <input type="text" required id="loc" name="loc" value={locality} onChange={handlerChangeLocality}/>
                </div>
                <button type="submit" >Enviar</button>
            </form>
        </div>


        <div className="final-compra" ref={refFinish}>
            <h3>Muchas gracias por su compra</h3>
            <button type="button" onClick={handlerFinish} >Volver al Inicio</button>
        </div>

    </div>
}
export default CartShadow