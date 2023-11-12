import { Link, useLocation, useParams } from 'react-router-dom';
import { Container, Stack } from '@mui/material';
import { isEmpty, getCapitalize } from '@shared';
import { PATHS } from '@appConfig/paths';
import { useGetProductDetail } from '@queries';
import './styles.scss';

const Breadcrumbs = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const { productDetail } = useGetProductDetail({ id });

  const breadcrumbs = pathname
    .split('/')
    .filter((crumb) => !isEmpty(crumb))
    .reduce((preCrumb, currCrumb) => {
      const currentLink = !isEmpty(preCrumb)
        ? `${preCrumb[preCrumb.length - 1].link}/${currCrumb}`
        : `/${currCrumb}`;
      const crumb = (
        <div className="cmp-breadcrumbs__crumb" key={currCrumb}>
          <Link to={currentLink}>{`${
            currCrumb.includes(id) ? productDetail?.name : getCapitalize(currCrumb)
          }`}</Link>
        </div>
      );
      return [...preCrumb, { link: currentLink, crumb }];
    }, []);

  return (
    <Stack className="cmp-breadcrumbs-container">
      <Container maxWidth="xl">
        <Stack flexDirection="row" alignItems="center" gap="10px">
          <Link to={PATHS.root}>
            Home<span style={{ marginLeft: '10px' }}>/</span>
          </Link>
          <Stack className="cmp-breadcrumbs" flexDirection="row" alignItems="center" gap="10px">
            {breadcrumbs.map((breadcrumb) => breadcrumb.crumb)}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Breadcrumbs;
