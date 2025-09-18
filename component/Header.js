import Link from "next/link"
import Logo from "@/assets/logo.png"
import classes from "@/component/header/header.module.css"
import Image from "next/image"
import HeaderBackground from "./HeaderBackground"

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
      <Link className={classes.navLinks} href="/meals">Browse Meals</Link>
    </li>
    <li>
      <Link className={classes.navLinks} href="/community">Foodies Community</Link>
    </li>
  </ul>
</header>
</>
)
}