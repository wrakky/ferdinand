import { useEffect } from 'react';
import { ipcRenderer, IpcRendererEvent } from 'electron';

export const useMessage = (event: string, callback: (payload: any) => void) => {
  useEffect(() => {
    ipcRenderer.on(event, (event: IpcRendererEvent, payload: any) => {
      console.log('message', event, payload);
      callback(payload);
    });
  }, [ipcRenderer, event, callback]);
};
