import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet, useParams } from 'react-router-dom';

import { NATIVE_TOKEN_IDENTIFIER } from 'appConstants';
import { Loader } from 'components';
import { isRewaToken } from 'helpers';
import { useAdapter, useGetPage, useHasExchangeData } from 'hooks';
import { activeNetworkSelector, tokenExtraSelector } from 'redux/selectors';
import { setToken, setTokenExtra } from 'redux/slices';
import { ExchangePriceRangeEnum } from 'types';

import { FailedTokenDetails } from './FailedTokenDetails';
import { TokenDetailsCard } from './TokenDetailsCard';
import { TokenHolderDetailsCard } from './TokenHolderDetailsCard';

export const TokenLayout = () => {
  const dispatch = useDispatch();
  const { getToken, getExchangeTokenPriceHistory } = useAdapter();
  const { hash: identifier = '' } = useParams();
  const { firstPageRefreshTrigger } = useGetPage();
  const { id: activeNetworkId, rewaLabel } = useSelector(activeNetworkSelector);
  const { tokenExtra } = useSelector(tokenExtraSelector);

  const hasExchangeData = useHasExchangeData();
  const isRewaNetworkToken =
    isRewaToken(rewaLabel) &&
    identifier.toLowerCase() === NATIVE_TOKEN_IDENTIFIER.toLowerCase();

  const isNativeToken =
    identifier.toLowerCase() === rewaLabel?.toLowerCase() || isRewaNetworkToken;

  const [isDataReady, setIsDataReady] = useState<boolean | undefined>();

  const fetchTokenDetails = () => {
    if (identifier) {
      const promises = [
        getToken(identifier),
        ...(hasExchangeData && tokenExtra.identifier !== identifier
          ? [getExchangeTokenPriceHistory({ identifier })]
          : [])
      ];
      Promise.all(promises).then((response) => {
        const [tokenData, tokenPriceHistoryData] = response;

        if (tokenData.success && tokenData.data) {
          dispatch(setToken({ isDataReady: true, token: tokenData.data }));
          if (hasExchangeData && tokenExtra.identifier !== identifier) {
            dispatch(
              setTokenExtra({
                isDataReady: true,
                tokenExtra: {
                  identifier: tokenData.data.identifier,
                  range: ExchangePriceRangeEnum.hourly,
                  priceHistory: tokenPriceHistoryData?.data ?? []
                }
              })
            );
          }
        }
        setIsDataReady(tokenData.success);
      });
    }
  };

  useEffect(() => {
    if (!isNativeToken) {
      fetchTokenDetails();
    }
  }, [firstPageRefreshTrigger, activeNetworkId, identifier, isNativeToken]);

  const loading = isDataReady === undefined;
  const failed = isDataReady === false;

  if (isNativeToken) {
    return <Navigate replace to={`/${rewaLabel?.toLowerCase()}`} />;
  }

  if (failed) {
    return <FailedTokenDetails tokenIdentifier={identifier} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='container page-content'>
      <TokenDetailsCard />
      <TokenHolderDetailsCard />
      <Outlet />
    </div>
  );
};
