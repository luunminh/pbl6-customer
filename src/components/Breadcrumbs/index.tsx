import { Link, useLocation } from 'react-router-dom';
import { Stack } from '@mui/material';
import { isEmpty, getCapitalize } from '@shared';
import { PATHS } from '@appConfig/paths';
import './styles.scss';

const Breadcrumbs = () => {
  const { pathname } = useLocation();

  const breadcrumbs = pathname
    .split('/')
    .filter((crumb) => !isEmpty(crumb))
    .reduce((preCrumb, currCrumb) => {
      const currentLink = !isEmpty(preCrumb)
        ? `${preCrumb[preCrumb.length - 1].link}/${currCrumb}`
        : `/${currCrumb}`;
      const crumb = (
        <div className="cmp-breadcrumbs__crumb" key={currCrumb}>
          <Link to={currentLink}>{getCapitalize(currCrumb)}</Link>
        </div>
      );
      return [...preCrumb, { link: currentLink, crumb }];
    }, []);

  return (
    <Stack flexDirection="row" alignItems="center" gap="10px" className="cmp-breadcrumbs-container">
      <Link to={PATHS.root}>
        Home<span style={{ marginLeft: '10px' }}>/</span>
      </Link>
      <Stack className="cmp-breadcrumbs" flexDirection="row" alignItems="center" gap="10px">
        {breadcrumbs.map((breadcrumb) => breadcrumb.crumb)}
      </Stack>
    </Stack>
  );
};

export default Breadcrumbs;
