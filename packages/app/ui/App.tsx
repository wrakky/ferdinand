import React, { FunctionComponent, useCallback, useReducer } from 'react';
import { MessageEventType } from '../common/messaging';
import { ActionType, applicationReducer, initialState } from './applicationReducer';
import styled from 'styled-components';
import { ServicesList } from './components/ServicesList';
import { useMessage } from './hooks/useMessage';
import { ServiceContainer } from './components/ServiceContainer';
import { Service } from '../common/Service';
import { ipcRenderer } from 'electron';
import { Splash } from './components/Splash';

interface Props {
  
}

const AppContainer = styled.div`
  height: 100%;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
`;

export const App: FunctionComponent<Props> = (props) => {
  const [state, dispatch] = useReducer(applicationReducer, initialState);

  const setServices = useCallback((services: Service[]) => {
    dispatch(({
      type: ActionType.SetServices,
      payload: services
    }));
  }, [dispatch]);
  useMessage(MessageEventType.SET_SERVICES, setServices);

  const setActiveService = useCallback((id: string) => {
    ipcRenderer.send(MessageEventType.SET_ACTIVE_SERVICE, id);
  }, [state.services]);

  const onSizeChange = useCallback((size: ClientRect) => {
    ipcRenderer.send(MessageEventType.RESIZE, {
      x: size.left,
      y: size.top,
      width: size.width,
      height: size.height
    });
  }, []);

  return (
    <AppContainer>
      {(state.services === null || state.services.length === 0) && <Splash services={state.services} />}
      {(state.services !== null && state.services.length > 0) && (
        <>
          <ServicesList services={state.services}
                      onClick={setActiveService} />
          <ServiceContainer onSizeChange={onSizeChange}/>
        </>
      )}
    </AppContainer>
  );
};
