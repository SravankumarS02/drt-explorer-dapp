import { ExchangePriceRangeEnum } from 'types';
import { AxiosParamsApiType } from 'types/adapter.types';

import { useAdapterConfig } from '../useAdapterConfig';

export const useExtraRequests = () => {
  const { provider } = useAdapterConfig();

  return {
    /* Dharitrix */
    getExchangeTokenPriceHistory: ({
      identifier,
      range = ExchangePriceRangeEnum.hourly,
      signal
    }: {
      identifier: string;
      range?: ExchangePriceRangeEnum;
    } & AxiosParamsApiType) => {
      if (range === ExchangePriceRangeEnum.daily) {
        return provider({
          url: `/moa/tokens/prices/daily/${identifier}`,
          signal
        });
      }
      return provider({
        url: `/moa/tokens/prices/hourly/${identifier}`,
        signal
      });
    }
  };
};
