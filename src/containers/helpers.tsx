import { PATHS } from '@appConfig/paths';
import SplashScreen from './StartupContainers/SplashScreen';
import { Navigate } from 'react-router';
import { CustomErrorBoundary } from '@components';
import React, { PropsWithChildren } from 'react';
import Dev from './Dev';
const OnDevelop = React.lazy(() => import('./StartupContainers/OnDevelop'));
const UserProfile = React.lazy(() => import('@components/UserProfile/UserProfile'));
const SignIn = React.lazy(() => import('@components/UAMContainer/SignIn'));
const CreateAccount = React.lazy(() => import('@components/UAMContainer/Customer/CreateAccount'));
const ForgotPassword = React.lazy(() => import('@components/UAMContainer/ForgotPassword/'));
const ResetPassword = React.lazy(() => import('@components/UAMContainer/ResetPassword/'));
const ProductsPage = React.lazy(() => import('./ProductsPage'));
const StoresPage = React.lazy(() => import('./StoresPage'));

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
  { path: PATHS.root, element: <OnDevelop />, isRequireAuth: false },
  { path: PATHS.signIn, element: <SignIn />, isRequireAuth: false },
  { path: PATHS.createAccount, element: <CreateAccount />, isRequireAuth: false },
  { path: PATHS.forgotPassword, element: <ForgotPassword />, isRequireAuth: false },
  { path: PATHS.resetPassword, element: <ResetPassword />, isRequireAuth: false },
  { path: PATHS.products, element: <ProductsPage />, isRequireAuth: false },
  { path: PATHS.stores, element: <StoresPage />, isRequireAuth: false },
  { path: PATHS.order, element: <OnDevelop />, isRequireAuth: true },
  { path: PATHS.profile, element: <UserProfile />, isRequireAuth: true },
  { path: PATHS.dev, element: <Dev />, isRequireAuth: true },
];
