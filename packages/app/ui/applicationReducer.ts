import { Service } from '../common/Service';

export interface ApplicationState {
  services: Service[] | null;
}

export const initialState: ApplicationState = {
  services: null
};

export enum ActionType {
  SetServices
}

interface Action {
  type: ActionType;
  payload: any;
}

export interface SetServicesAction {
  type: ActionType.SetServices;
  payload: Service[];
}

export type Actions = SetServicesAction;

export const applicationReducer = (state = initialState, action: Actions): ApplicationState => {
  switch (action.type) {
    case ActionType.SetServices:
      return {
        ...state,
        services: action.payload
      };
    default:
      return state;
  }
};
