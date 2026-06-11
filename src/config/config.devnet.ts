import { NetworkType } from 'types/network.types';

import { getStorageCustomNetworks } from './helpers';
import { allApps, schema } from './sharedConfig';
export * from './sharedConfig';

export const networks: NetworkType[] = [
  {
    default: true,
    id: 'devnet',
    name: 'Devnet',
    chainId: 'D',
    adapter: 'api',
    theme: 'testnet',
    rewaLabel: 'xREWA',
    walletAddress: 'https://devnet-wallet.dharitri.org',
    explorerAddress: 'https://devnet-explorer.dharitri.org',
    nftExplorerAddress: 'https://devnet.xspotlight.com',
    apiAddress: 'https://devnet-api.dharitri.org',
    updatesWebsocketUrl: 'https://devnet-socket-api.dharitri.org'
  },

  // Saved Custom Network Configs
  ...getStorageCustomNetworks()
];

export const dharitriApps = allApps([
  {
    id: 'wallet',
    url: 'https://devnet-wallet.dharitri.org'
  },
  {
    id: 'explorer',
    url: 'https://devnet-explorer.dharitri.org'
  },
  {
    id: 'dharitrix',
    url: 'https://devnet.dharitrix.com'
  },
  {
    id: 'xspotlight',
    url: 'https://devnet.xspotlight.com'
  }
]);

networks.forEach((network) => {
  schema.validate(network, { strict: true }).catch(({ errors }) => {
    console.error(`Config invalid format for ${network.id}`, errors);
  });
});
