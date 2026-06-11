import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { NATIVE_TOKEN_SEARCH_LABEL } from 'appConstants';
import { TransactionsTable } from 'components';
import { isRewaToken } from 'helpers';
import { useAdapter, useFetchTransactions } from 'hooks';
import { NativeTokenTabs } from 'layouts/NativeTokenLayout/NativeTokenTabs';
import { activeNetworkSelector } from 'redux/selectors';
import { TransactionFiltersEnum } from 'types';

export const NativeTokenTransactions = () => {
  const [searchParams] = useSearchParams();
  const { getTransfers, getTransfersCount } = useAdapter();
  const { id: activeNetworkId, rewaLabel } = useSelector(activeNetworkSelector);

  const {
    fetchTransactions,
    transactions,
    totalTransactions,
    isDataReady,
    dataChanged
  } = useFetchTransactions({
    dataPromise: getTransfers,
    dataCountPromise: getTransfersCount,
    filters: {
      token: isRewaToken(rewaLabel) ? NATIVE_TOKEN_SEARCH_LABEL : rewaLabel
    }
  });

  useEffect(() => {
    fetchTransactions();
  }, [activeNetworkId]);

  useEffect(() => {
    fetchTransactions(Boolean(searchParams.toString()));
  }, [searchParams]);

  return (
    <div className='card p-0'>
      <div className='row'>
        <div className='col-12'>
          <TransactionsTable
            transactions={transactions}
            token={rewaLabel}
            totalTransactions={totalTransactions}
            title={<NativeTokenTabs />}
            dataChanged={dataChanged}
            isDataReady={isDataReady}
            inactiveFilters={[TransactionFiltersEnum.token]}
            showLockedAccounts
          />
        </div>
      </div>
    </div>
  );
};
