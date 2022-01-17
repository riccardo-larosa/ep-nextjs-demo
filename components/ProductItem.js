import Link from "next/link";
import productStyles from "../styles/Product.module.css";

const ProductItem = ({ product }) => {
  // console.log(product);
  var desc = product.attributes.description;
  if (desc !== undefined) {
    desc = desc.substring(0,200).concat("...");
  }
  // var image = "";
  // if (product.included !== undefined) {
  //     image = product.included.main_images[0].link.href;
  // }
  return (
    <>
    <div className={productStyles.productCard}>
      <Link href={`/product/${product.id}`} key={product.id} >
        <a >
          <div key={product.id} >{product.attributes.name}</div>
        </a>
      </Link> 
      <div className={productStyles.productImage}>
        <img src={product.image} />
      </div>
      <div className={productStyles.productInfo}> 
        <h5>{product.meta.display_price.without_tax.formatted}</h5>
        <h6> Add to cart</h6>
        <span className={productStyles.productDescription}>{desc}</span>
      </div>
    </div>
    
    </>
  );
};
export default ProductItem;
