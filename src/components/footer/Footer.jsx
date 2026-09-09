import { useNavigate } from "react-router-dom"

import "./footer.css"
import { Container,Row,Col,Nav } from "react-bootstrap";

const Footer = ()=>{
    const navigate = useNavigate()
    return (
    <footer className="text-light mt-5">
        <Container className="py-4">
            <Row>
                {/* Contacto */}
                <Col md={6} className="mb-4 mb-md-0">
                    <h3 className="h5 mb-3">Contactanos</h3>

                    <ul className="list-unstyled">
                        <li className="mb-2">
                            📞 Tel: +54 9 341 212 9131
                        </li>
                        <li className="mb-2">
                            ✉️ Mail: cybproductosrosario@gmail.com
                        </li>
                        <li>
                            📍 Rosario - Santa Fe
                        </li>
                    </ul>
                </Col>

                {/* Accesos */}
                <Col md={6}>
                    <h3 className="h5 mb-3">Accesos</h3>

                    <Nav className="flex-column">
                        <Nav.Link
                            onClick={() => navigate("/broches")}
                            className="text-light p-0 mb-2"
                        >
                            Broches
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => navigate("/colitas-de-pelo")}
                            className="text-light p-0 mb-2"
                        >
                            Colitas de pelo
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => navigate("/vinchas")}
                            className="text-light p-0 mb-2"
                        >
                            Vinchas
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => navigate("/tic-tac")}
                            className="text-light p-0 mb-2"
                        >
                            Tic Tac
                        </Nav.Link>

                        <Nav.Link
                            onClick={() => navigate("/carteras-billeteras")}
                            className="text-light p-0"
                        >
                            Carteras y Billeteras
                        </Nav.Link>
                    </Nav>
                </Col>
            </Row>

            <hr />

            <div className="text-center">
                <h3 className="h5 mb-0">¡¡¡MUCHAS GRACIAS!!!</h3>
            </div>
        </Container>
    </footer>
);
}

export default Footer