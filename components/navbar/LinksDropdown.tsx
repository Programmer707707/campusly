import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LuAlignLeft } from 'react-icons/lu';
import Link from 'next/link';
import { Button } from '../ui/button';
import { links } from '@/utils/links';
import UserIcon from './UserIcon';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/nextjs';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import SignOutLink from './SignOutLink';

const LinksDropdown = () => {
  return (
    <DropdownMenu>
      {/* Main button of dropdown menu */}
      <DropdownMenuTrigger asChild>
        <Button variant={'outline'} className='flex gap-4 max-w-[100px]'>
          <LuAlignLeft className='w-6 h-6' />
          <UserIcon/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-48' align='start' sideOffset={10}>
        {/* Here we have to show menus according to whether the user logged in or not */}

        {/* If user signed out we show login and register buttons */}
        <SignedOut>
          <DropdownMenuItem>
          <SignInButton mode='modal'>
            <button className='w-full text-left'>LogIn</button>
          </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem>
          <SignUpButton mode='modal'>
            <button className='w-full text-left'>Register</button>
          </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>

        {/* If user loggedIn we show full dropdown menu */}
        <SignedIn>
        {links.map((link)=> {
          return <DropdownMenuItem key={link.href}>
            <Link href={link.href} className='capitalize  w-full'>
              {link.label}
            </Link>
          </DropdownMenuItem>
        })}

        <DropdownMenuSeparator/>
        <DropdownMenuItem>
          <SignOutLink/>
        </DropdownMenuItem>
        </SignedIn>
       
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default LinksDropdown