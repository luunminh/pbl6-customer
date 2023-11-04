import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { PATHS } from '@appConfig/paths';
import { MuiTextField } from '@components';
import { isEmpty } from '@shared';
import { ProductGridQueryParams } from 'src/containers/ProductsPage/components/ProductGrid/type';

type Props = {
  searchText?: string;
  onSearch?: (_text: string) => void;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ searchText, placeholder = 'Search' }) => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(searchText || '');

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (!isEmpty(searchValue)) {
      navigate({
        pathname: PATHS.products,
        search: `?${ProductGridQueryParams.SEARCH}=${searchValue}`,
      });
    }
  };

  return (
    <MuiTextField
      size="small"
      placeholder={placeholder}
      value={searchValue}
      onChange={handleInputChange}
      icon={<IoSearchOutline size="18px" />}
      iconType="button"
      onIconClick={handleSearch}
    />
  );
};

export default SearchBar;
