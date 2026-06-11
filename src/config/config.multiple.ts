import { NetworkType } from 'types/network.types';
import {
  getInternalNetworks,
  getStorageCustomNetworks,
  getInternalLinks
} from './helpers';
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
    walletAddress: 'https://testnet-wallet.dharitri.org/',
    explorerAddress: 'https://testnet-explorer.dharitri.org/',
    nftExplorerAddress: 'https://testnet.xspotlight.com',
    apiAddress: 'https://testnet-api.dharitri.org',
    updatesWebsocketUrl: 'https://testnet-socket-api.dharitri.org'
  },
  {
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

  // Internal Testnets
  ...getInternalNetworks(),

  // Saved Custom Network Configs
  ...getStorageCustomNetworks()
];

export const links = getInternalLinks(networks);

export const dharitriApps = allApps();

networks.forEach((network) => {
  schema.validate(network, { strict: true }).catch(({ errors }) => {
    console.error(`Config invalid format for ${network.id}`, errors);
  });
});
