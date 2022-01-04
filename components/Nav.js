import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import fetcher from "../services/fetcher";
import useSWR from "swr";

const Nav = () => {
  const { data, mutate } = useSWR("/api/cart", fetcher);
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/token">Token</Link>
        </li>
        <li>
          <Link href="/cart">Cart</Link>

          {data ? <div>items: {data.data.meta.display_price.with_tax.formatted}</div> : "loading..."}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
