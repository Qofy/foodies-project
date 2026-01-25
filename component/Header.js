import Link from "next/link"
import Logo from "@/assets/logo.png"
import classes from "@/component/header/header.module.css"
import Image from "next/image"
import HeaderBackground from "./HeaderBackground"
import Navlink from "./nav/NavLink"

export default function Header(){
return(
  <>
  <HeaderBackground/>
<header className={classes.header}>
  <Link href="/" className={classes.logo}>
  <Image  src = {Logo} alt="logo" priority width={70}/>
  NextLevel Food
  </Link>

  <ul className={classes.nav}>
    <li>
      <Navlink  href="/meals">Browse Meals</Navlink>
    </li>
    <li>
      <Navlink href="/community">Foodies Community</Navlink>
    </li>
  </ul>
</header>
</>
)
}