import "./header.css"
import image from "../../img/CB.jpg"
import { useNavigate } from "react-router-dom"
import { FaShoppingBag } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { CartContext } from "../../context/CartContext";
import ElementCart from "../elementCart/ElementCart";
import { IoMdMenu } from "react-icons/io";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";



const DesktopHeader = ({ handlerOpenCarrito, navigate }) => {
    return <>
        <Navbar className="header">
            <div className="header-top ">

                <div className="header-element logo-container">
                    <img
                        onClick={() => navigate("/")}
                        src={image}
                        alt="Caramelos y Burbujitas"
                        className="imagen-principal"
                    />
                </div>

                <div className="header-element" style={{ flex: "3" }}><h1
                    className="titulo"
                    onClick={() => navigate("/")}
                >
                    Caramelos y Burbujitas
                </h1></div>

                <div className="header-element">
                    <FaShoppingBag
                        className="icono-compra"
                        onClick={handlerOpenCarrito}
                    />
                </div>

            </div>
        </Navbar>


        <Navbar expand="md" className="menu-navbar">
            <Container fluid>

                <Navbar.Toggle aria-controls="menu-navbar" />

                <Navbar.Offcanvas id="menu-navbar" placement="end">
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="menu-ul">

                            <Nav.Link onClick={() => navigate("/broches")}>
                                Broches
                            </Nav.Link>

                            <Nav.Link onClick={() => navigate("/colitas-de-pelo")}>
                                Colitas de pelo
                            </Nav.Link>

                            <Nav.Link onClick={() => navigate("/vinchas")}>
                                Vinchas
                            </Nav.Link>

                            <Nav.Link onClick={() => navigate("/tic-tac")}>
                                Tic Tac
                            </Nav.Link>

                            <Nav.Link onClick={() => navigate("/carteras-billeteras")}>
                                Carteras y Billeteras
                            </Nav.Link>



                        </Nav>
                    </Offcanvas.Body>

                </Navbar.Offcanvas>

            </Container>
        </Navbar>
    </>
}

const MobileHeader = ({ handlerOpenCarrito, navigate }) => {

    const [showHeader, setShowHeader] = useState(true)

    useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
        const currentScrollY = window.scrollY

        if (currentScrollY > lastScrollY) {
            // Está bajando
            setShowHeader(false)
        } else {
            // Está subiendo
            setShowHeader(true)
        }

        lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
        window.removeEventListener("scroll", handleScroll)
    }
}, [])

    return <>
        <Navbar className={`header  ${`header-responsive ${showHeader ? "header-visible" : "header-hidden"}`}`} expand="md">
            <div className="header-top ">

                <div  className="header-element img-titulo logo-container">
                    <img
                        onClick={() => navigate("/")}
                        src={image}
                        alt="Caramelos y Burbujitas"
                        className="imagen-principal"
                    />
                

                
                    <h1
                        className="titulo"
                        onClick={() => navigate("/")}
                    >
                        Caramelos y Burbujitas
                    </h1>
                </div>

                <div className="header-element" >
                    <FaShoppingBag
                        className="icono-compra"
                        onClick={handlerOpenCarrito}
                    />
                


                

                    <Navbar.Toggle aria-controls="menu-navbar" />

                    <Navbar.Offcanvas id="menu-navbar" placement="end">
                        <Offcanvas.Header closeButton></Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="menu-ul">

                                <Nav.Link onClick={() => navigate("/broches")}>
                                    Broches
                                </Nav.Link>

                                <Nav.Link onClick={() => navigate("/colitas-de-pelo")}>
                                    Colitas de pelo
                                </Nav.Link>

                                <Nav.Link onClick={() => navigate("/vinchas")}>
                                    Vinchas
                                </Nav.Link>

                                <Nav.Link onClick={() => navigate("/tic-tac")}>
                                    Tic Tac
                                </Nav.Link>

                                <Nav.Link onClick={() => navigate("/carteras-billeteras")}>
                                    Carteras y Billeteras
                                </Nav.Link>



                            </Nav>
                        </Offcanvas.Body>

                    </Navbar.Offcanvas>

                </div>
            </div>
        </Navbar>
    </>
}


const Header = () => {

    const navigate = useNavigate()

    const [stateOpenCart, setStateOpenCart] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [viewMenu, setViewMenu] = useState(false)
    //const [viewRestartMenu,setViewRestartMenu]=useState(false)
    // const refMenu = useRef(null)
    // const refRestantMenu = useRef(null)
    // console.log(refMenu)

    const { cart, actualizateLocalStorange } = useContext(CartContext)

    const handlerOpenCarrito = (e) => {
        setStateOpenCart(true)
    }

    const handlerCloseCarrto = (e) => {
        setStateOpenCart(false)
    }

    const handlerButtonCart = () => {
        if (cart.length != 0) {
            actualizateLocalStorange()
            setStateOpenCart(false)
            navigate("/cart-summary")
        }
    }


    const handlerOpenMenu = () => {
        setViewMenu(true)
        /*refMenu.current.style.display="flex"
        refRestantMenu.current.style.display="flex"*/
    }

    const handlerCloseMenu = () => {
        setViewMenu(false)
        /*    refMenu.current.style.display="none"
        refRestantMenu.current.style.display="none"*/
    }

    const resizeMenu = () => {
        setWidth(window.innerWidth)
        if (width > 900)
            handlerOpenMenu()
    }

    useEffect(() => {
        if (width > 900)
            handlerOpenMenu()
    }, [])


    window.addEventListener('resize', resizeMenu)

    const total = cart.reduce((acu, x) => acu + x.price * x.count, 0)


    return (<>


        <div id="carrito-sombra" style={{ display: stateOpenCart ? "flex" : "none" }}>
            <div id="carrito-pantalla">
                <div id="cerrar-carrito"><MdCancel onClick={handlerCloseCarrto} /></div>
                <div id="carrito-datos">

                    {cart.map(x => <ElementCart key={x.id} name={x.name} img={x.img} price={x.price} count={x.count} />)}
                    {/* <!--<div class="carrito-articulo" id="codigo1">
                    <img src="../img/WhatsApp Image 2023-04-17 at 17.48.40 (5).jpeg" alt="">
                    
                        <div class="precio">
                            <p>Precio por unidad</p>
                            <p>5345$</p>
                        </div>
                    
                    <div class="articulo-cantidad">
                        <label for="">Cantidad</label>
                        <input type="number" min="1">
                    </div>
                    <div class="precio">
                        <p>Precio Total</p>
                        <p>324234234$</p>
                    </div>
                    <div class="cerrar-articulo" id="borrar-codigo1"><i class="fa-solid fa-xmark"></i></div>
                </div>
                <div class="carrito-articulo"></div>
                <div class="carrito-articulo"></div>--> */}

                </div>
                <h3 id="carrito-total">Total: ${total}</h3>
                <button type="button" id="enviar-carrito" onClick={handlerButtonCart}>Enviar</button>
            </div>
        </div>


        <header className="d-none d-md-block">
            <DesktopHeader handlerOpenCarrito={handlerOpenCarrito} navigate={navigate} />
        </header>
        <header className="d-block d-md-none">
            <MobileHeader handlerOpenCarrito={handlerOpenCarrito} navigate={navigate} />
        </header>
    </>
    )


}

export default Header