import { useState } from "react"
import "./login.css"
import { api_base_url } from "../../api"
import { useNavigate } from "react-router-dom"
const Login = () => {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    const handlerChangePass = (e) => {
        setPass(e.target.value)
    }

    const handlerChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlerSubmit = async (e) => {
        e.preventDefault()
        try{
        const res = await fetch(`${api_base_url}/Authenticate/Authenticate`,
            {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "password": pass
                })

            }
        )
        if(!res.ok)
            throw new Error("Error inesperado")
        
        const data = await res.text()
        localStorage.setItem("token",data)
        navigate("/admin-menu")
    }
    catch(e){console.log(e)}
    }

    return (
        <div className="cont-login">
            <form action="POST" className="form-login" onSubmit={handlerSubmit}>

                <label htmlFor="email">Ingrese su Email</label>
                <input type="email" name="" id="" onChange={handlerChangeEmail} value={email} />

                <label htmlFor="pass">Ingrese su Contraseña</label>
                <input type="text" name="" id="" onChange={handlerChangePass} value={pass} />

                <input type="submit" value="Iniciar Sesión" />
            </form>
        </div>
    )
}
export default Login