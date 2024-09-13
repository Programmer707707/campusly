import { Button } from "../ui/button";
import Link from "next/link";
import {VscCode} from 'react-icons/vsc';


const Logo = () => {
  return (
      <Button size={'lg'}>
      <Link href={'/'}>
        Campusly
      </Link>
      </Button>
  )
}

export default Logo