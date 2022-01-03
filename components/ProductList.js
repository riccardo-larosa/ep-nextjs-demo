import ProductItem from './ProductItem'
// import nodeStyles from '../styles/Node.module.css'


const ProductList = ({products}) => {
    return (
        <div>
             {products.map( (product) => (
                 <ProductItem product={product} key={product.id} />
      ))}
        </div>
    )}
export default ProductList