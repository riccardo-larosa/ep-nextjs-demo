import ProductItem from './ProductItem'
import productStyles from '../styles/Product.module.css'


const ProductList = ({products}) => {
    return (
        <div className={productStyles.products}>
             {products.map( (product) => (
                 <ProductItem product={product} key={product.id} />
      ))}
        </div>
    )}
export default ProductList