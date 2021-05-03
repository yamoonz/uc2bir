import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import {
  ApproveCard,
  DatePicker,
  RejectModal,
  ApproveModal,
  Svg,
} from 'components';
import { device } from 'utils';
import { getUserRejects } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const Rejecteds = () => {
  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.dtReservation?.rejecteds
  );
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openApprove, setOpenApprove] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const startOfWeeksArr = () => {
    if (items?.date) {
      return Object.keys(items?.date).map(
        (date) => new Date(moment(date, 'DD.MM.YYYY').toDate())
      );
    } else {
      return [];
    }
  };
  useEffect(() => {
    if (window.innerWidth <= 760) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
    setSelectedDate(new Date());
    dispatch(getUserRejects());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      dispatch(getUserRejects(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          {startOfWeeksArr().map((elm, index) => (
            <AccordionContainer key={index}>
              <Number>{index + 1}.</Number>
              <ReservationAccordion
                defaultOpen={index == 0 ? true : false}
                parent
                title="24 OCAK ÇARŞAMBA"
              >
                <ReservationAccordion
                  miniIcon={<Svg.SessionType.Gym />}
                  title="SPOR ALANI"
                  defaultOpen
                >
                  {items?.appointment?.[
                    moment(selectedDate).format('DD.MM.YYYY')
                  ]?.gym?.map((elm, i) => (
                    <ApproveCardContainer key={i}>
                      <ApproveCard
                        date="18:00 - 19:00"
                        customerName="Ali Veli"
                        type="rejecteds"
                        onApprove={() => {
                          setOpenApprove(true);
                        }}
                        onReject={() => {
                          setOpenReject(true);
                        }}
                      />
                    </ApproveCardContainer>
                  ))}
                </ReservationAccordion>
                <ReservationAccordion
                  miniIcon={<Svg.SessionType.Park />}
                  title="EV / PARK"
                >
                  {items?.appointment?.[
                    moment(selectedDate).format('DD.MM.YYYY')
                  ]?.home_park?.map((elm, i) => (
                    <ApproveCardContainer key={i}>
                      <ApproveCard
                        date="18:00 - 19:00"
                        customerName="Ali Veli"
                        type="rejecteds"
                        onApprove={() => {
                          setOpenApprove(true);
                        }}
                        onReject={() => {
                          setOpenReject(true);
                        }}
                      />
                    </ApproveCardContainer>
                  ))}
                </ReservationAccordion>
                <ReservationAccordion
                  miniIcon={<Svg.SessionType.Online />}
                  title="ONLİNE"
                >
                  {items?.appointment?.[
                    moment(selectedDate).format('DD.MM.YYYY')
                  ]?.online?.map((elm, i) => (
                    <ApproveCardContainer key={i}>
                      <ApproveCard
                        date="18:00 - 19:00"
                        customerName="Ali Veli"
                        type="rejecteds"
                        onApprove={() => {
                          setOpenApprove(true);
                        }}
                        onReject={() => {
                          setOpenReject(true);
                        }}
                      />
                    </ApproveCardContainer>
                  ))}
                </ReservationAccordion>
              </ReservationAccordion>
            </AccordionContainer>
          ))}
          {!(startOfWeeksArr().length > 0) && (
            <text>Bu tarihe ilişkin veri bulunamadı</text>
          )}
        </StyledCol>
        <StyledCol
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          xs={{ order: IsSmallScreen ? 1 : 2 }}
          lg={4}
        >
          <DateContainer>
            <DatePicker
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
              }}
              selectsRange
              inline
              highlightDates={[
                {
                  'react-datepicker__day--highlighted': startOfWeeksArr(),
                },
              ]}
              minDate={new Date()}
            />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RejectModal
        open={openReject}
        reject={() => {
          setOpenReject(false);
        }}
        cancel={() => {
          setOpenReject(false);
        }}
      />
      <ApproveModal
        open={openApprove}
        approve={() => {
          setOpenApprove(false);
        }}
        cancel={() => {
          setOpenApprove(false);
        }}
      />
    </StyledContainer>
  );
};

const DateContainer = styled.div`
  width: 100%;
`;
const AccordionContainer = styled.div`
  display: flex;
`;
const ApproveCardContainer = styled.div`
  margin: 20px 0;
  @media ${device.sm} {
    margin: 0;
  }
`;
const Number = styled.text`
  font-size: 16px;
  margin: 15px;
  @media ${device.sm} {
    display: none;
  }
`;

const StyledCol = styled(Col)`
  @media ${device.sm} {
    padding: 0;
    margin: 0;
  }
`;
const StyledRow = styled(Row)`
  @media ${device.sm} {
    margin: 0;
  }
`;
const StyledContainer = styled(Container)`
  @media ${device.sm} {
    margin: 0;
    padding: 0;
  }
`;
export default Rejecteds;