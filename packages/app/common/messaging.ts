import { ViewSize } from '../main/services/ViewManager';
import { Service } from './Service';

export enum MessageEventType {
  SET_SERVICES = 'SET_SERVICES',
  SET_ACTIVE_SERVICE = 'SET_ACTIVE_SERVICE',
  RESIZE = 'RESIZE',
  LOAD_SERVICE = 'LOAD_SERVICE',
  SET_UNREAD_COUNT = 'SET_UNREAD_COUNT',
  TEST = 'TEST'
}

export interface MessageEvent {
  type: MessageEventType;
  payload: any;
}

export class SetServicesEvent implements MessageEvent {
  public type = MessageEventType.SET_SERVICES;
  constructor(public payload: Service[]) {}
}

export class SetActiveServiceEvent implements MessageEvent {
  public type = MessageEventType.SET_ACTIVE_SERVICE;
  constructor(public payload: string) {}
}

export class ResizeEvent implements MessageEvent {
  public type = MessageEventType.RESIZE;
  constructor(public payload: ViewSize) {}
}

export class LoadServiceEvent implements MessageEvent {
  public type = MessageEventType.LOAD_SERVICE;
  constructor(public payload: { id: string, type: string, muted: boolean }) {}
}

export class SetUnreadCountEvent implements MessageEvent {
  public type = MessageEventType.SET_UNREAD_COUNT;
  constructor(public payload: { serviceId:string, count: number }) {}
}

export class TestEvent implements MessageEvent {
  public type = MessageEventType.TEST;
  constructor(public payload: any) {}
}
