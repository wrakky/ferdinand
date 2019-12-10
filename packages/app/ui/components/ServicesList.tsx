import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { ServiceIcon } from './ServiceIcon';
import { Service } from '../../common/Service';

interface Props {
  services: Service[];
  onClick: (id: string) => void;
}

const ServicesListContainer = styled.div`
  height: 100%;
  width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f5f5f5;
`;

export const ServicesList: FunctionComponent<Props> = ({ services, onClick }) => {
  return (
    <ServicesListContainer>
      {services.map(({ id, name, icon, active, count }) => (
        <ServiceIcon key={id}
                     name={name}
                     icon={icon}
                     active={active}
                     count={count}
                     onClick={() => onClick(id)} />
      ))}
    </ServicesListContainer>
  );
};
