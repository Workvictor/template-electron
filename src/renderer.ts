import { ipcRenderer } from 'electron';

import './index.css';
import { IPC_Channel, TInitDB } from './ipc';
import { UiFrame } from './gui/frame';
import { Button } from './gui/button/button';

ipcRenderer.on(IPC_Channel.initDB.toString(), (...argv: TInitDB) => {
  const [, db] = argv;
  // console.log(db);
});

ipcRenderer.send(IPC_Channel.initDB.toString());

const main = document.querySelector('main');

if (main) {
  const hitButton = new Button('Hit Button!');

  const dialogFrame = new UiFrame(hitButton);

  hitButton.onClick(() => {
    // console.log('click1');
  });

  main.append(dialogFrame);
}
