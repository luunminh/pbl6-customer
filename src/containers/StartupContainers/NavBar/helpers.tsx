import { PATHS } from '@appConfig/paths';
import {
  IoBag,
  IoBagOutline,
  IoHome,
  IoHomeOutline,
  IoStorefront,
  IoStorefrontOutline,
} from 'react-icons/io5';

export const getShortName = ({ firstName = '', lastName = '' }) => {
  return `${firstName[0]}${lastName[0]}`;
};

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
