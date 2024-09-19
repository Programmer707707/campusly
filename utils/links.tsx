type NavLink = {
    href: string;
    label: string;
  };
  
export const links: NavLink[] = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/questions', label: 'FAQ' },
    { href: '/products', label: 'products' },
    //{ href: '/favorites', label: 'favorites' },
    //{ href: '/cart', label: 'cart' },
    {href: '/admin/products', label: 'Dashboard'},
    //{ href: '/orders', label: 'orders' },
    { href: '/admin/sales', label: 'dashboard'},
    { href: '/contact', label: 'contact'},
];

export const adminLinks: NavLink[] = [
  //{href: '/admin/sales', label: 'sales'},
  {href: '/admin/products', label: 'my products'},
  {href: '/admin/products/create', label: 'create product'},

]
