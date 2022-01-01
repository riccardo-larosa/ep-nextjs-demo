import ProductItem from './ProductItem'
import nodeStyles from '../styles/Node.module.css'


const ProductList = ({products}) => {
    return (
        <div className={nodeStyles.grid}>
             {products.map( (product) => (
                 <ProductItem product={product} key={product.id} />
      ))}
        </div>
    )}
export default ProductList