import NodeItem from './NodeItem'
import nodeStyles from '../styles/Node.module.css'


const NodeList = ({nodes}) => {
    return (
        <div className={nodeStyles.grid}>
             {nodes.map( (node) => (
                 <NodeItem node={node} />
      ))}
        </div>
    )}
export default NodeList