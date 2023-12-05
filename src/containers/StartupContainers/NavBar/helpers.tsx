import { PATHS } from '@appConfig/paths';
import {
  IoHomeOutline,
  IoHome,
  IoBagOutline,
  IoBag,
  IoStorefrontOutline,
  IoStorefront,
} from 'react-icons/io5';
import { CiCircleList } from 'react-icons/ci';
import { FaListUl } from 'react-icons/fa';

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
  {
    label: 'Orders',
    path: PATHS.order,
    icon: (
      <div className="title-icon" aria-details="Stores">
        <CiCircleList size={20} />
      </div>
    ),
    activeIcon: (
      <div className="title-icon" aria-details="Stores">
        <FaListUl size={20} />
      </div>
    ),
  },
];
