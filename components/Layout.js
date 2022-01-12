import Nav from "./Nav";
import Meta from "./Meta";
// import Header from "./Header";
import styles from "../styles/Layout.module.css";

const Layout = ({ user, children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <div className={styles.container}>
      <h2>{user.name}</h2>
        <main className={styles.main}>{children}</main>
        
      </div>
    </>
  );
};

export default Layout;
