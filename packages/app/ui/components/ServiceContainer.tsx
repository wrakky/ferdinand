import React, { FunctionComponent, useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';

interface Props {
  onSizeChange: (size: ClientRect) => void;
}

const StyledServiceContainer = styled.div`
  flex: 1;
  height: 100%;
`;

export const ServiceContainer: FunctionComponent<Props> = ({ onSizeChange }) => {

  const containerRef = useRef<HTMLDivElement|null>(null);
  const onResize = useCallback(() => {
    if (containerRef.current) {
      onSizeChange(containerRef.current.getBoundingClientRect());
    }
  }, [containerRef]);
  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  useLayoutEffect(() => {
    onResize();
  }, []);
  return (
    <StyledServiceContainer ref={containerRef} />
  );
};
