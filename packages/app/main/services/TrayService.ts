import { Tray, Menu, app } from 'electron';
import * as path from 'path';

export class TrayService {

  private tray: Tray;

  private iconInactive = path.resolve(path.join(__dirname, './resources/icons/grey/32x32.png'));
  private iconActive = path.resolve(path.join(__dirname, './resources/icons/color/32x32.png'));

  constructor() {
    const tray = new Tray(this.iconInactive);
    tray.setToolTip('Ferdinand');
    this.tray = tray;
  }

  build() {
    this.buildMenu();
  }

  private buildMenu() {
    this.tray.setContextMenu(Menu.buildFromTemplate([
      {
        label: 'Quit',
        click() {
          app.quit();
        }
      }
    ]));
  }

  updateActive(active: boolean) {
    if (active) {
      this.setActive();
    } else {
      this.setInactive();
    }
  }

  setActive() {
    this.tray.setImage(this.iconActive);
  }

  setInactive() {
    this.tray.setImage(this.iconInactive);
  }

}
