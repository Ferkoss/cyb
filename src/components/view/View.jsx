import Footer from "../footer/Footer"
import Header from "../header/Header"

const View = ({children})=>{
    return<>
    <Header/>
    {children}
    <Footer/>
    </>
}

export default View