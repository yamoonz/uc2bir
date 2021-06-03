import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import { ApproveCard, DatePicker, RateModal, Svg } from 'components';
import { device } from 'utils';
import { getUserSessionHistorys } from 'actions';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { rateAndComment } from 'actions';

const SessionHistory = () => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openRateModal, setOpenRateModal] = useState(false);
  const [appointment, setAppointment] = useState(undefined);

  const dispatch = useDispatch();
  const items = useSelector(
    (state) => state.professionalReservation?.userReservation?.session_historys
  );
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
    dispatch(getUserSessionHistorys());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      getSelectedDate();
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getUserSessionHistorys(moment(selectedDate).format('DD.MM.YYYY')));
  }
  return (
    <StyledContainer>
      <StyledRow>
        <StyledCol xs={{ order: IsSmallScreen ? 2 : 1 }} lg={8}>
          <AccordionContainer>
            <ReservationAccordion
              defaultOpen={true}
              parent
              title={moment(selectedDate).format('DD.MM.YYYY')}
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
                      date={elm?.hour}
                      customerName={elm?.address_title}
                      has_comment={elm?.pt?.has_comment}

                      type="history"
                      rateText="Eğitmeni Puanla"
                      onApprove={() => {
                        setAppointment({
                          id: elm?.id,
                          userId: elm?.pt?.id,
                        });
                        setOpenRateModal(true);
                      }}
                    />
                  </ApproveCardContainer>
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Park />}
                title="EV / PARK"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.home_park?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      date={elm?.hour}
                      customerName={elm?.pt?.name}
                      type="history"
                      rateText="Eğitmeni Puanla"
                      has_comment={elm?.pt?.has_comment}

                      onApprove={() => {
                        setAppointment({
                          id: elm?.id,
                          userId: elm?.pt?.id,
                        });
                        setOpenRateModal(true);
                      }}
                    />
                  </ApproveCardContainer>
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Online />}
                title="ONLİNE"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.online?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      date={elm?.hour}
                      customerName={elm?.pt?.name || elm?.dt?.name}
                      type="history"
                      rateText="Eğitmeni / Diyetisyeni Puanla"
                      has_comment={elm?.dt?.has_comment}

                      onApprove={() => {
                        setAppointment({
                          id: elm?.id,
                          userId: elm?.dt?.id || elm?.pt?.id,
                        });
                        setOpenRateModal(true);
                      }}
                    />
                  </ApproveCardContainer>
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Online />}
                title="KLİNİK"
                defaultOpen
              >
                {items?.appointment?.[
                  moment(selectedDate).format('DD.MM.YYYY')
                ]?.clinic?.map((elm, i) => (
                  <ApproveCardContainer key={i}>
                    <ApproveCard
                      date={elm?.hour}
                      customerName={elm?.dt?.name}
                      type="history"
                      rateText="Diyetisyeni Puanla"
                      has_comment={elm?.dt?.has_comment}

                      onApprove={() => {
                        setAppointment({ id: elm?.id, userId: elm?.dt?.id });
                        setOpenRateModal(true);
                      }}
                    />
                  </ApproveCardContainer>
                ))|| <text>Bu tarihe ilişkin veri bulunamadı</text>}
              </ReservationAccordion>
            </ReservationAccordion>
          </AccordionContainer>
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
            />
          </DateContainer>
        </StyledCol>
      </StyledRow>
      <RateModal
        appointment_id={appointment?.id}
        descText="Seçili profesyonel puanlamak ister misiniz?"
        rateLabel="PUANLA"
        cancelLabel="VAZGEÇ"
        open={openRateModal}
        rate={({ rate, comment }) => {
          dispatch(
            rateAndComment(
              {
                appointment_id: appointment?.id,
                rating: rate,
                comment: comment,
                commented_id: appointment?.userId,
              },
              () => {
                setAppointment(undefined);
                setOpenRateModal(false);
              }
            )
          );
        }}
        cancel={() => {
          setAppointment(undefined);
          setOpenRateModal(false);
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
  display: flex;
  justify-content: center;
  margin: 20px 0;
  @media ${device.sm} {
    margin: 0;
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
export default SessionHistory;
