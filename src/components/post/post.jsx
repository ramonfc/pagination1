import { useEffect, useState } from "react";
import "./post.scss";


// const updateCategory = (id_sku) => {
//   window.confirm(`Eliminar?`) ? onConfirmUpdate(id_sku) : alert("No eliminado");
// }



export default function Post(props) {

  const [flag, setFlag] = useState(false);
  const [color, setColor] = useState(false);
 
  let currentClass = "post"; 
  let { id_sku, sku, title_to_store, images_concat, meli_category } = props.data; 
  
  

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
      props.data.meli_category = "ELIMINAR";

      // if (props.data.meli_category === "ELIMINAR") {
      //   currentClass += " eliminar";
      // } else if (props.data.meli_category === "MCO118449") {
      //   currentClass += " smart-watch";
      // }

      setColor(true);
      setFlag(false);

    }
    catch (error) {
      alert(error.message)
    }
  }

 
  useEffect(() => {
    // document.querySelector("button").addEventListener("click",()=>{console.log("useEffect activado");})
    if (flag) {
      console.log("en useEffect");
    
      window.confirm(`Eliminar?`) ? onConfirmUpdate(id_sku) : alert("No eliminado");

    }
  }, [flag]);

  

  if (meli_category === "ELIMINAR") {
    currentClass += " eliminar";
  } else if (meli_category === "MCO118449") {
    currentClass += " smart-watch";
  }

  return (
    <div className={currentClass} >
      {console.log(currentClass)}
      <small>{sku}</small>
      <h2>{title_to_store}</h2>

      <picture>
        <img src={images_concat} alt={title_to_store} loading="lazy" />
      </picture>

      <button onClick={() => { setFlag(true) }}>🗑️</button>
      {/* <button onClick={() => { updateCategory(id_sku) }}>🗑️</button> */}
    </div>
  );
}