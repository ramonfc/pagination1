
import "./post.scss";



const updateCategory = (id_sku) => {
  window.confirm(`Eliminar?`) ? onConfirmUpdate(id_sku) : alert("No eliminado");
}

const onConfirmUpdate = async (id_sku) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_sku: id_sku, meli_category: "ELIMINAR" })
  };

  try {
    const response = await fetch(`http://localhost:8080/api/productos/change-category`, requestOptions);
    const data = await response.json();
    alert(data.affectedRows > 1 ? "Eliminado" : "Error");
  }
    catch (error) {
    alert(error.message)
  }
}


export default function Post(props) {

  // const [clicked, setClicked] = useState(false);

  const { id_sku, sku, title_to_store, images_concat, meli_category } = props.data;

  let currentClass = "post";
  if (meli_category === "ELIMINAR") {
    currentClass += " eliminar";
  } else if (meli_category === "MCO118449") {
    currentClass += " smart-watch";
  }

  return (
    <div className={currentClass} >

      <small>{sku}</small>
      <h2>{title_to_store}</h2>

      <picture>
        <img src={images_concat} alt={title_to_store} loading="lazy" />
      </picture>


      <button onClick={() => { updateCategory(id_sku) }}>🗑️</button>
    </div>
  );
}