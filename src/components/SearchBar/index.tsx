import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { PATHS } from '@appConfig/paths';
import { MuiTextField } from '@components';
import { Callback, isEmpty } from '@shared';
import { ProductGridQueryParams } from 'src/containers/ProductsPage/components/ProductGrid/type';

type Props = {
  searchText?: string;
  onSearch?: Callback;
  placeholder?: string;
};

const SearchBar: React.FC<Props> = ({ searchText, onSearch, placeholder = 'Search' }) => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState(searchText || '');

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) return onSearch(searchValue);
    if (!isEmpty(searchValue)) {
      navigate({
        pathname: PATHS.products,
        search: `?${ProductGridQueryParams.SEARCH}=${searchValue}`,
      });
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <MuiTextField
        size="small"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        icon={<IoSearchOutline size="18px" />}
        iconType="button"
        onIconClick={handleSearch}
      />
    </form>
  );
};

export default SearchBar;
