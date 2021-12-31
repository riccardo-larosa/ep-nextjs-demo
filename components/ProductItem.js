import Link from "next/link";
import nodeStyles from "../styles/Node.module.css";

const ProductItem = ({ product }) => {
  //console.log(product);
  return (
    <>
      <Link href={`/product/${product.id}`} key={product.id}>
        <a className={nodeStyles.card}>
          <h3 key={product.id}>{product.attributes["name"]}</h3>
        </a>
      </Link>
      <span>{product.attributes["description"]}</span>
    </>
  );
};
export default ProductItem;
