import fs from 'fs';
import parse from 'csv-parse';
import path from 'path';

import weaponCSV from './weapons.csv';
import { FSTable } from './FSTable';

const weapons_tb = new FSTable(path.join(__dirname, weaponCSV));

const tableList = [weapons_tb];

const db = {
  weapons: weapons_tb.data,
};

export type DBType = typeof db;

export const db_init = () => {
  tableList.forEach((table) => {
    table.clear();
    fs.createReadStream(table.name).pipe(parse()).on('data', table.add);
  });
  return db;
};
