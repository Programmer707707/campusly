import Container from "../global/Container"
import CartButton from "./CartButton"
import Logo from "./Logo"
import NavSearch from "./NavSearch"
import DarkMode from "./DarkMode";
import LinksDropdown from "./LinksDropdown";
import { Suspense } from "react";


const Navbar = () => {

  return (
    <nav>
      <Container className="flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap py-8 gap-4">
        <Logo/>
        <Suspense>
          <NavSearch/>
        </Suspense>
        <div className="flex gap-4 items-center">
          <CartButton/>
          <DarkMode/>
          <LinksDropdown/>
        </div>
      </Container>
    </nav>
  )
}

export default Navbar