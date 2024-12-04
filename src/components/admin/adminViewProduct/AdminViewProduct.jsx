import "./adminViewProduct.css"
const AdminViewProduct = ({handler,name,category,size,price,img}) =>{
    return (
        <div className="container-admin-view" onClick={handler}>
            

            <img src={"data:image/jpeg;base64,"+img} alt="" />
            <div className="content-admin-view">
                <h3>{name}</h3>
                <h4>{category}</h4>
                <h5>{size}</h5>
                <p>${price}</p>
            </div>
        </div>
    )
}
export default AdminViewProduct