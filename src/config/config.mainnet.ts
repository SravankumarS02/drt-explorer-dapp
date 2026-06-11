import { NetworkType } from 'types/network.types';

import { getStorageCustomNetworks } from './helpers';
import { allApps, schema } from './sharedConfig';
export * from './sharedConfig';

export const networks: NetworkType[] = [
  {
    default: true,
    id: 'mainnet',
    name: 'Mainnet',
    chainId: '1',
    adapter: 'api',
    theme: 'default',
    rewaLabel: 'REWA',
    walletAddress: 'https://wallet.dharitri.org',
    explorerAddress: 'https://explorer.dharitri.org',
    nftExplorerAddress: 'https://xspotlight.com',
    apiAddress: 'https://api.dharitri.org',
    growthApi: 'https://tools.dharitri.org/growth-api',
    hasExchangeData: true
  },

  // Saved Custom Network Configs
  ...getStorageCustomNetworks()
];

export const dharitriApps = allApps();

networks.forEach((network) => {
  schema.validate(network, { strict: true }).catch(({ errors }) => {
    console.error(`Config invalid format for ${network.id}`, errors);
  });
});
