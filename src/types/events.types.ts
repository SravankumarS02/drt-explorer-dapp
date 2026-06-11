import { ELLIPSIS } from 'appConstants';
import { SliceType } from './general.types';

export interface EventType {
  txHash: string;
  logAddress: string;
  identifier: string;
  address: string;
  data: string;
  topics: string[];
  shardID: number;
  additionalData: string[];
  txOrder: number;
  order: number;
  timestamp: number;
}

export interface UIEventType extends EventType {
  isNew?: boolean; // UI flag
}

export interface EventsSliceType extends SliceType {
  events: UIEventType[];
  eventsCount: number | typeof ELLIPSIS;
}

export interface CustomEventsSliceType extends EventsSliceType {
  uuid?: string;
}

export enum TransactionEventIdentifiersEnum {
  DCDTNFTTransfer = 'DCDTNFTTransfer',
  DCDTNFTBurn = 'DCDTNFTBurn',
  DCDTNFTAddQuantity = 'DCDTNFTAddQuantity',
  DCDTNFTCreate = 'DCDTNFTCreate',
  MultiDCDTNFTTransfer = 'MultiDCDTNFTTransfer',
  DCDTTransfer = 'DCDTTransfer',
  DCDTBurn = 'DCDTBurn',
  DCDTLocalMint = 'DCDTLocalMint',
  DCDTLocalBurn = 'DCDTLocalBurn',
  DCDTWipe = 'DCDTWipe',
  DCDTFreeze = 'DCDTFreeze',
  transferValueOnly = 'transferValueOnly',
  writeLog = 'writeLog',
  signalError = 'signalError'
}
