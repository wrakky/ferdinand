import { ipcRenderer, IpcRendererEvent } from 'electron';
import { MessageEvent, MessageEventType } from '../../common/messaging';

export class MainCommunicationService {

  send(event: MessageEvent) {
    ipcRenderer.send(event.type, event.payload);
  }

  receive(event: MessageEventType, callback: (payload: any) => void) {
    ipcRenderer.on(event, (event: IpcRendererEvent, payload: any) => {
      callback(payload);
    });
  }

}
