import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { device } from 'utils';

const ReservationDetail = ({ goBack = () => {} }) => {
  return <Container></Container>;
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 731px;
  border-radius: 10px;
  background-color: #fcfcfc;
  -webkit-box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  box-shadow: 0px 0px 4px 3px rgba(197, 196, 196, 0.28);
  @media ${device.sm} {
    width: 100%;
  }
`;
const Row = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  align-items: center;
  padding-left: 10px;
  border-bottom-style: ${(props) => (props.borderDisable ? 'none' : 'solid')};
  border-bottom-width: 1px;
  border-bottom-color: rgba(197, 196, 196, 0.5);
  @media ${device.sm} {
    height: 6vw;
    padding-left: 1vw;
  }
`;
const Column = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  @media ${device.sm} {
    padding: 3vw;
  }
`;
const Seperator = styled.div`
  display: flex;
  width: 1px;
  height: 60%;
  background-color: rgba(197, 196, 196, 0.5);
`;
//text
const BoldText = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;
const AdressText = styled.text`
  color: #909090;
  font-family: 'Poppins', sans-serif;
  margin-left: 8px;
  @media ${device.sm} {
    margin-left: 3px;
    font-size: 0.6rem;
  }
`;

//<=
const FlexSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.position == 'END' ? 'flex-end' : 'flex-start'};
  padding: 0 20px 0 20px;
  flex-grow: 2;
  @media ${device.sm} {
  }
`;
const Dot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  background-color: #ef805a;
  margin-right: 8px;
  @media ${device.sm} {
    margin-right: 3px;
  }
`;

const AwaitButton = styled.button`
  width: 120px;
  height: 34px;
  background: #f77e0b;
  color: white;
  border-radius: 5px;
  margin-right: 10px;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
const ApproveButton = styled.button`
  width: 120px;
  height: 34px;
  color: ${(p) => (p.reject ? '#F01C62' : 'var(--blue)')};
  border-radius: 5px;
  margin-right: 10px;
  background: transparent;
  text-decoration: underline;
  white-space: nowrap;
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
const HistoryButton = styled.button`
  height: 34px;
  background: white;
  padding: 5px;
  color: var(--blue);
  border-radius: 5px;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
  border-style: solid;
  border-width: 1px;
  border-color: var(--blue);
  @media ${device.sm} {
    width: 90px;
    height: 17px;
    font-size: 10px;
    border-radius: 4px;
  }
`;
export default ReservationDetail;