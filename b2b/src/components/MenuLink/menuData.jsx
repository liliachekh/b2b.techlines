// import { CartAmount } from '../CartAmount';
import { Account, Basket, LogIn } from "../icons";

const menuData = [
  {
    type: 'Shop',
    page: '/shop',
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
    page: '/freshStock',
    text: 'Fresh Stock',
    classHover: 'stockHover'
  },
  {
    type: 'Myorders',
    page: '/myorders',
    text: 'My orders',
    classHover: 'myorders'
  },
  {
    type: 'login',
    page: '/authorization',
    text: 'Log In',
    icon(width, height, color, strokeWidth) {return <LogIn width={width} height={height} color={color} strokeWidth={strokeWidth}/>},
    classHover: 'loginHover'
   },
  {
    type: 'account',
    page: '/account',
    text: 'Account',
    icon(width, height, color, strokeWidth) {return <Account width={width} height={height} color={color} strokeWidth={strokeWidth}/>},
    classHover: 'accountHover'
  },
  {
    type: 'basket',
    page: '/cart',
    text: 'Shopping cart',
    icon(width, height, color, strokeWidth) {return <><Basket width={width} height={height} color={color} strokeWidth={strokeWidth} /> </>},
    classHover: 'basketHover'
  },
];

export default menuData;