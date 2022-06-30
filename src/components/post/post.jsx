import "./post.scss";

export default function Post(props) {
    const { sku, title_to_store, images_concat } = props.data;
    return (
      <div className="post">
        <small>{sku}</small>
        <h2>{title_to_store}</h2>

        <picture>
          <img src= {images_concat} alt={title_to_store} loading= "lazy"/>
        </picture>
        
        
        <button>🗑️</button>
      </div>
    );
  }