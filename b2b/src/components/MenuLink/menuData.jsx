// import { CartAmount } from '../CartAmount';
import { CartAmount } from "../CartAmount";
import { Account, Basket, LogIn, Logout } from "../icons";

const menuData = [
  {
    type: 'Shop',
    page: '/',
    text: 'Shop',
  },
  // {
  //   type: 'outlet',
  //   page: '/outlet',
  //   text: 'Outlet',
  //   classHover: 'outletHover'
  // },
  // {
  //   type: 'FreshStock',
  //   page: '/freshstock',
  //   text: 'Fresh Stock',
  //   classHover: 'stockHover'
  // },
  {
    type: 'Myorders',
    page: '/profile/orders',
    text: 'My orders',
  },
  // {
  //   type: 'login',
  //   page: '/login',
  //   text: 'Log In',
  //   icon(width, height, color, strokeWidth) {return <LogIn width={width} height={height} color={color} strokeWidth={strokeWidth}/>},
  //   classHover: 'loginHover'
  //  },
  {
    type: 'profile',
    page: '/profile',
    text: 'Profile',
    icon(width, height, color, strokeWidth) {return <Account width={width} height={height} color={color} strokeWidth={strokeWidth} />},
  },
  // {
  //   type: 'logout',
  //   page: '/login',
  //   text: 'Logout',
  //   icon(width, height, color, strokeWidth) {return <Logout width={width} height={height} color={color} strokeWidth={strokeWidth} />},
  //   classHover: 'logoutHover',
  // },
  {
    type: 'basket',
    page: '/cart',
    text: 'Shopping cart',
    icon(width, height, color, strokeWidth) {return <><Basket width={width} height={height} color={color} strokeWidth={strokeWidth} /> <CartAmount /></>},
  },
];

export default menuData;