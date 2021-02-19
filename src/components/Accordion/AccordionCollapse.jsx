import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components/macro';

import { AccordionContext } from './Accordion';

const Collapse = ({ children, uid }) => {
  const { activeId } = useContext(AccordionContext);
  const [height, setHeight] = useState(0);

  const isActive = activeId === uid;

  useEffect(() => {
    if (isActive) {
      let { scrollHeight } = document.getElementById(`item-${uid}`);

      setHeight(isActive ? `${scrollHeight}px` : 0);
    }
  }, [isActive]);

  return (
    <CollapseWrapper id={`item-${uid}`} isActive={isActive} height={height}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          isActive,
          height,
        })
      )}
    </CollapseWrapper>
  );
};

export default Collapse;

const CollapseWrapper = styled.div`
  transition: all 0.5s;
  height: ${(props) => (props.isActive ? props.height : '0px')};
  overflow: hidden;
`;