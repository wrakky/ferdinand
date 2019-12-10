import { BrowserWindow, BrowserWindowConstructorOptions, WebContents } from 'electron';
import { BrowserViewCommunicationService } from './services/BrowserViewCommunicationService';
import { MessageEvent } from '../common/messaging';
import electronIsDev from 'electron-is-dev';

export class WindowManager {

  private window: BrowserWindow;

  private renderer: WebContents;
  private browserviewCommunicator: BrowserViewCommunicationService;

  constructor(url: string, options: BrowserWindowConstructorOptions) {
    const window = new BrowserWindow(options);
    window.loadURL(url);
    this.window = window;
    this.renderer = window.webContents;
    this.browserviewCommunicator = new BrowserViewCommunicationService(this.renderer);
    this.renderer.on('did-finish-load', () => {
      this.browserviewCommunicator.setReady();
    });
  }

  getWindow(): BrowserWindow {
    return this.window;
  }

  openDevTools() {
    if (electronIsDev) {
      this.window.webContents.openDevTools();
    }
  }

  maximise() {
    this.window.maximize();
  }

  send(event: MessageEvent) {
    this.browserviewCommunicator.send(event);
  }

  receive<T extends MessageEvent>(event: T['type'], callback: (payload: T['payload']) => void) {
    this.browserviewCommunicator.receive(event, callback);
  }

}
