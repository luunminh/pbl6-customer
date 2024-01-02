import { PATHS } from '@appConfig/paths';
import { CustomErrorBoundary } from '@components';
import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router';
import Dev from './Dev';
import SplashScreen from './StartupContainers/SplashScreen';
const UserProfile = React.lazy(() => import('@components/UserProfile/UserProfile'));
const SignIn = React.lazy(() => import('@components/UAMContainer/SignIn'));
const CreateAccount = React.lazy(() => import('@components/UAMContainer/Customer/CreateAccount'));
const ForgotPassword = React.lazy(() => import('@components/UAMContainer/ForgotPassword/'));
const ResetPassword = React.lazy(() => import('@components/UAMContainer/ResetPassword/'));

const Homepage = React.lazy(() => import('./Homepage'));
const ProductsPage = React.lazy(() => import('./ProductsPage'));
const StoresPage = React.lazy(() => import('./StoresPage'));
const CartPage = React.lazy(() => import('./Cart'));
const PaymentPage = React.lazy(() => import('./PaymentPage'));
const PaymentResult = React.lazy(() => import('./PaymentResult'));
const OrderPage = React.lazy(() => import('./Order'));

type RouteWrapperProps = {
  isAuthenticated: boolean;
  pageRequiredAuth?: boolean;
  pageForAuthentication?: boolean;
};

export const CustomRoute: React.FC<PropsWithChildren<RouteWrapperProps>> = ({
  isAuthenticated,
  pageRequiredAuth,
  children,
}) => {
  if (isAuthenticated === null) return <SplashScreen />;

  if (isAuthenticated || !pageRequiredAuth) {
    return <CustomErrorBoundary showErrorMessage>{children}</CustomErrorBoundary>;
  }

  const redirectPath = isAuthenticated ? PATHS.root : PATHS.signIn;

  return <Navigate to={redirectPath} />;
};

export const routerGroup = [
  { path: PATHS.root, element: <Homepage />, isRequireAuth: false },
  { path: PATHS.signIn, element: <SignIn />, isRequireAuth: false },
  { path: PATHS.createAccount, element: <CreateAccount />, isRequireAuth: false },
  { path: PATHS.forgotPassword, element: <ForgotPassword />, isRequireAuth: false },
  { path: PATHS.resetPassword, element: <ResetPassword />, isRequireAuth: false },
  { path: PATHS.products, element: <ProductsPage />, isRequireAuth: false },
  { path: PATHS.productDetail, element: <ProductsPage />, isRequireAuth: false },
  { path: PATHS.stores, element: <StoresPage />, isRequireAuth: false },
  { path: PATHS.order, element: <OrderPage />, isRequireAuth: true },
  { path: PATHS.orderDetail, element: <OrderPage />, isRequireAuth: true },
  { path: PATHS.profile, element: <UserProfile />, isRequireAuth: true },
  { path: PATHS.dev, element: <Dev />, isRequireAuth: true },
  { path: PATHS.cart, element: <CartPage />, isRequireAuth: true },
  { path: PATHS.payment, element: <PaymentPage />, isRequireAuth: true },
  { path: PATHS.paymentResult, element: <PaymentResult />, isRequireAuth: false },
];
