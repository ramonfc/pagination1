import { useState } from "react";
import classNames from "classnames";
import "./post.scss";


// const updateCategory = (id_sku) => {
//   window.confirm(`Eliminar?`) ? onConfirmUpdate(id_sku) : alert("No eliminado");
// }
const DELETE_CATEGORY = "ELIMINAR";
const SMART_WATCH_CATEGORY = "MCO118449";


export default function Post(props) {

  // const [flag, setFlag] = useState(false);
  // const [color, setColor] = useState(false);

  // let currentClass = "post";
  let { id_sku, sku, title_to_store, images_concat, meli_category } = props.data;

  const [category, setCategory] = useState(meli_category);

  const onConfirmUpdate = async (id_sku) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_sku: id_sku, meli_category: "ELIMINAR" })
    };

    try {
      const response = await fetch(`http://localhost:8080/api/productos/change-category`, requestOptions);
      const data = await response.json();
      alert(data.affectedRows >= 1 ? "Eliminado" : "Error");
      setCategory("ELIMINAR");

      // setColor(true);
      // setFlag(false);

    }
    catch (error) {
      alert(error.message)
    }
  }
 
  const showConfirm = ()=> {
    window.confirm(`Eliminar?`) ? onConfirmUpdate(id_sku) : alert("No eliminado");
  }

  // useEffect(() => {
  //   // document.querySelector("button").addEventListener("click",()=>{console.log("useEffect activado");})
  //   if (flag) {
  //     console.log("en useEffect"); 

  //   }
  // }, [flag]);



  return (
    <div className={classNames("post", { 
      eliminar: category === DELETE_CATEGORY, 
      "smart-watch": category === SMART_WATCH_CATEGORY 
      })} >
      <small>{sku}</small>
      <h2>{title_to_store}</h2>

      <picture>
        <img src={images_concat} alt={title_to_store} loading="lazy" />
      </picture>

      <button onClick={() => { showConfirm() }}>🗑️</button>
      {/* <button onClick={() => { updateCategory(id_sku) }}>🗑️</button> */}
    </div>
  );
}