import React, { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  name: string;
  icon: string;
  active: boolean;
  count: number;
  onClick: () => void;
}

const Icon = styled.div
  .attrs(({ title, onClick }) => ({
    title,
    onClick
  }))<{ active: boolean, count: number }>`
  position: relative;
  width: 61px;
  height: 64px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 3px solid transparent;
  ${props => props.active && css`
    background: #ddc9f8;
    border-left: 3px solid #5314a7;
  `}
  img {
    width: 32px;
    height: 32px;
  }
  span {
    position: absolute;
    bottom: ${props => props.count > 99 ? 5 : 10}px;
    right: ${props => props.count > 99 ? 5 : 10}px;
    background: #5314a7;
    color: white;
    font-weight: bold;
    font-size: 10px;
    width: ${props => props.count > 99 ? 20 : 15}px;
    height: ${props => props.count > 99 ? 20 : 15}px;
    border-radius: ${props => props.count > 99 ? 20 : 15}px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
  }
`;

export const ServiceIcon: FunctionComponent<Props> = ({ name, icon, active, count, onClick }) => {
  return (
    <Icon active={active} count={count} title={name} onClick={() => onClick()}>
      <img src={icon} title={name} alt={name}/>
      {count > 0 && <span>{count}</span>}
    </Icon>
  );
};
