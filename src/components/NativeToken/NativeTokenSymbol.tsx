import { SVGProps } from 'react';
import { useSelector } from 'react-redux';

import RewaSymbol from 'assets/img/tokens/rewa-symbol.svg';
import SpcLogo from 'assets/img/tokens/spc-logo.svg';
import { isRewaToken } from 'helpers';
import { activeNetworkSelector } from 'redux/selectors';

// temporary?
export const NativeTokenSymbol = (props: SVGProps<SVGSVGElement>) => {
  const { rewaLabel } = useSelector(activeNetworkSelector);

  if (isRewaToken(rewaLabel)) {
    return <RewaSymbol {...props} />;
  }

  switch (rewaLabel?.toLowerCase()) {
    case 'spc':
      return <SpcLogo {...props} />;
    default:
      return null;
  }
};
