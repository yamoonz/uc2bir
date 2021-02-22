// @ts-nocheck
import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import { space, color } from 'styled-system';

const StyledTitle = styled(Typography)`
  font-family: ${(props) =>
    (props.fontFamily && props.fontFamily) || 'Poppins, sans-serif'} !important;
  font-weight: ${(props) => props.fontWeight || 'bold'} !important;
  font-size: ${(props) => props.fontSize && props.fontSize} !important;
  letter-spacing: ${(props) => !props.letterSpacing && 'initial'} !important;
  text-align: ${(props) =>
    props.textLeft
      ? props.textAlign
        ? props.textAlign
        : 'center'
      : 'left'} !important;
  display: block !important;

  ${color}
  ${space}
`;

const Titles = ({
  component,
  textRight,
  textLeft,
  lineDisable = true,
  color = 'dark',
  children,
  icon = null,
  ...rest
}) => (
  <StyledTitle
    gutterBottom
    textLeft
    className={`typography title ${lineDisable ? '' : 'line'} ${
      textLeft ? 'text-left' : ''
    } ${textRight ? 'text-right' : ''}`}
    color={color}
    {...rest}
  >
    {icon && icon}
    {children}
  </StyledTitle>
);

export default Titles;
