import Link from "next/link";
import nodeStyles from "../styles/Node.module.css";

const NodeItem = ({ node }) => {
  //console.log(node);
  return (
    <Link href={`/node/${node.id}`} key={node.id}>
      <a className={nodeStyles.card}>
        <h3 key={node.id}>{node.attributes['name']}</h3>
      </a>
    </Link>
  );
};
export default NodeItem;
