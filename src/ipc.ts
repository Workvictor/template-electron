import { DBType } from './db';

export enum IPC_Channel {
  main,
  initDB,
}

export type TInitDB = [any, DBType, ...any[]];
