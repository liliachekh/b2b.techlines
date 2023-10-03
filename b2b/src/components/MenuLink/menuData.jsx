import { CartAmount } from "../CartAmount";
import { Account, Basket } from "../icons";

const menuData = [
  {
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
    page: '/profile/orders',
    text: 'My orders',
  },
  {
    page: '/profile',
    text: 'Profile',
    icon(width, height, color, strokeWidth) {return <Account width={width} height={height} color={color} strokeWidth={strokeWidth} />},
  },
  {
    page: '/cart',
    text: 'Shopping cart',
    icon(width, height, color, strokeWidth) {return <><Basket width={width} height={height} color={color} strokeWidth={strokeWidth} /> <CartAmount /></>},
  },
];

export default menuData;