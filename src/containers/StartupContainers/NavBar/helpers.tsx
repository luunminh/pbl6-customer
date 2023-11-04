import { PATHS } from '@appConfig/paths';
import {
  IoHomeOutline,
  IoHome,
  IoBagOutline,
  IoBag,
  IoStorefrontOutline,
  IoStorefront,
} from 'react-icons/io5';

export const getShortName = ({ firstName = '', lastName = '' }) => {
  return `${firstName[0]}${lastName[0]}`;
};

// TODO mock data -> change later
export const storeOptions = [
  {
    label: 'Lien Chieu, Da Nang',
    value: 'Store 1',
  },
  {
    label: 'Thanh Khe, Da Nang',
    value: 'Store 2',
  },
];

export type NavBarItemType = {
  label: string;
  path: string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
};

export const navBarItems: NavBarItemType[] = [
  {
    label: 'Home',
    path: PATHS.root,
    icon: (
      <div className="title-icon" aria-details="Home">
        <IoHomeOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Home">
        <IoHome size={20} />
      </div>
    ),
  },
  {
    label: 'Products',
    path: PATHS.products,
    icon: (
      <div className="title-icon" aria-details="Products">
        <IoBagOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Products">
        <IoBag size={20} />
      </div>
    ),
  },
  {
    label: 'Stores',
    path: PATHS.stores,
    icon: (
      <div className="title-icon" aria-details="Stores">
        <IoStorefrontOutline size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Stores">
        <IoStorefront size={20} />
      </div>
    ),
  },
];
