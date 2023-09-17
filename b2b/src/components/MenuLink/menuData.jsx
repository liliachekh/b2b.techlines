// import { CartAmount } from '../CartAmount';
import { CartAmount } from "../CartAmount";
import { Account, Basket, LogIn } from "../icons";

const menuData = [
  {
    type: 'Shop',
    page: '/',
    text: 'Shop',
    classHover: 'storeHover'
  },
  {
    type: 'outlet',
    page: '/outlet',
    text: 'Outlet',
    classHover: 'outletHover'
  },
  {
    type: 'FreshStock',
    page: '/freshstock',
    text: 'Fresh Stock',
    classHover: 'stockHover'
  },
  {
    type: 'Myorders',
    page: '/profile/orders',
    text: 'My orders',
    classHover: 'myorders'
  },
  {
    type: 'login',
    page: '/login',
    text: 'Log In',
    icon(width, height, color, strokeWidth) {return <LogIn width={width} height={height} color={color} strokeWidth={strokeWidth}/>},
    classHover: 'loginHover'
   },
  {
    type: 'profile',
    page: '/profile',
    text: 'Profile',
    icon(width, height, color, strokeWidth) {return <Account width={width} height={height} color={color} strokeWidth={strokeWidth}/>},
    classHover: 'profileHover'
  },
  {
    type: 'basket',
    page: '/cart',
    text: 'Shopping cart',
    icon(width, height, color, strokeWidth) {return <><Basket width={width} height={height} color={color} strokeWidth={strokeWidth} /> <CartAmount /></>},
    classHover: 'basketHover'
  },
];

export default menuData;