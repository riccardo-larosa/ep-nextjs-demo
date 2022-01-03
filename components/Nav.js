import Link from "next/link";
import navStyles from "../styles/Nav.module.css";
import fetch from "../services/fetcher";
import useSWR from "swr";

const Nav = () => {
  const { data, error } = useSWR("/api/cartnav", fetch);
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

          {data ? <div>items: {data.items}</div> : "loading..."}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
