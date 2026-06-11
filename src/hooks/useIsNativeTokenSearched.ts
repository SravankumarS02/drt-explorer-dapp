import { useSelector } from 'react-redux';

import { BRAND_NAME, NATIVE_TOKEN_IDENTIFIER } from 'appConstants';
import { isRewaToken } from 'helpers';
import { useGetSearch } from 'hooks';
import { activeNetworkSelector } from 'redux/selectors';

export const useIsNativeTokenSearched = () => {
  const { rewaLabel } = useSelector(activeNetworkSelector);
  const { search } = useGetSearch();

  if (!search) {
    return false;
  }

  const searchedToken = search.toLowerCase().trim();

  if (
    isRewaToken(rewaLabel) &&
    searchedToken === NATIVE_TOKEN_IDENTIFIER.toLowerCase()
  ) {
    return true;
  }

  const isNativeTokenSearched = [
    'rewa',
    'numbat',
    'dharitri',
    BRAND_NAME.toLowerCase(),
    (rewaLabel ?? '').toLowerCase()
  ].includes(searchedToken);

  return isNativeTokenSearched;
};
