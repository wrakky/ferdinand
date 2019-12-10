import { WebContents, ipcMain, IpcMainEvent } from 'electron';
import { MessageEvent, MessageEventType } from '../../common/messaging';

export class BrowserViewCommunicationService {

  private messageBuffer: MessageEvent[] = [];
  private ready = false;

  constructor(private renderer: WebContents) {}

  setReady() {
    this.ready = true;
    this.messageBuffer.forEach(event => {
      this.send(event);
    })
  }

  send(event: MessageEvent) {
    if (this.ready) {
      this.renderer.send(event.type, event.payload);
    } else {
      this.messageBuffer.push(event);
    }
  }

  receive(event: MessageEventType, callback: (payload: any) => void) {
    ipcMain.on(event, (event: IpcMainEvent, payload: any) => {
      callback(payload);
    });
  }

}
