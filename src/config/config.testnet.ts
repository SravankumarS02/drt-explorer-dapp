import { NetworkType } from 'types/network.types';

import { getStorageCustomNetworks } from './helpers';
import { allApps, schema } from './sharedConfig';
export * from './sharedConfig';

export const networks: NetworkType[] = [
  {
    default: true,
    id: 'testnet',
    name: 'Testnet',
    chainId: 'T',
    adapter: 'api',
    theme: 'testnet',
    rewaLabel: 'xREWA',
    walletAddress: 'https://testnet-wallet.dharitri.org',
    explorerAddress: 'https://testnet-explorer.dharitri.org',
    nftExplorerAddress: 'https://testnet.xspotlight.com',
    apiAddress: 'https://testnet-api.dharitri.org',
    updatesWebsocketUrl: 'https://testnet-socket-api.dharitri.org'
  },

  // Saved Custom Network Configs
  ...getStorageCustomNetworks()
];

export const dharitriApps = allApps([
  {
    id: 'wallet',
    url: 'https://testnet-wallet.dharitri.org'
  },
  {
    id: 'explorer',
    url: 'https://testnet-explorer.dharitri.org'
  },
  {
    id: 'dharitrix',
    url: 'https://testnet.dharitrix.com'
  },
  {
    id: 'xspotlight',
    url: 'https://testnet.xspotlight.com'
  },
  {
    id: 'bridge',
    url: 'https://testnet-bridge.dharitri.org'
  }
]);

networks.forEach((network) => {
  schema.validate(network, { strict: true }).catch(({ errors }) => {
    console.error(`Config invalid format for ${network.id}`, errors);
  });
});
