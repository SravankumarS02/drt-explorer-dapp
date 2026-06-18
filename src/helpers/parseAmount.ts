import BigNumber from 'bignumber.js';
import { DECIMALS } from 'config';
import { ELLIPSIS } from 'appConstants';

export function parseAmount(
  amount: string | number | BigNumber,
  numDecimals?: number
) {
  const amountAsBigInteger = BigNumber.isBigNumber(amount)
    ? amount
    : new BigNumber(amount);
  if (!amountAsBigInteger.isInteger() || amountAsBigInteger.isNegative()) {
    return ELLIPSIS;
  }

  return amountAsBigInteger
    .shiftedBy(numDecimals !== undefined ? numDecimals : DECIMALS)
    .decimalPlaces(0)
    .toFixed(0);
}
