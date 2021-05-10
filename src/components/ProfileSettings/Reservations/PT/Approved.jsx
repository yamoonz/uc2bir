import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ReservationAccordion from '../ReservationAccordion';
import styled from 'styled-components/macro';
import {
  ApproveCard,
  DatePicker,
  CancellationModal,
  Svg,
  ReservationDetail,
} from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { device } from 'utils';
import { getPtApproved, getPtReservationDetail } from 'actions';
import moment from 'moment';

import { PtApproveCancelStepOne, PtApproveCancelStepTwo } from 'actions';
const Approved = ({ setSubPage = () => {} }) => {
  const [IsSmallScreen, setIsSmallScreen] = useState(false);
  const [openCancellation, setOpenCancellation] = useState(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dispatch = useDispatch();

  const items = useSelector(
    (state) => state.professionalReservation?.ptReservation?.approved
  );
  const funcStatus = useSelector(
    (state) => state.professionalReservation?.ptReservation?.funcStatus
  );
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
    dispatch(getPtApproved());
  }, []);
  useEffect(() => {
    if (selectedDate) {
      dispatch(getPtApproved(moment(selectedDate).format('DD.MM.YYYY')));
    }
  }, [selectedDate]);
  function getSelectedDate() {
    dispatch(getPtApproved(moment(selectedDate).format('DD.MM.YYYY')));
  }
  function openReservationDetail(id) {
    dispatch(getPtReservationDetail(id));
    setSubPage(
      <ReservationDetail
        type="pt"
        goBack={() => {
          setSubPage();
        }}
      />
    );
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
                <>
                  {items?.appointment?.[
                    moment(selectedDate).format('DD.MM.YYYY')
                  ]?.gym?.map((elm, i) => (
                    <ApproveCardContainer key={i}>
                      <ApproveCard
                        date={elm.hour}
                        customerName={elm?.student}
                        type="approve"
                        onApprove={() => {
                          openReservationDetail(elm?.id);
                        }}
                        onReject={() => {
                          setOpenCancellation(elm?.id);
                        }}
                      />
                    </ApproveCardContainer>
                  )) || <text>Bu tarihe ilişkin veri bulunamadı</text>}
                </>
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Park />}
                title="EV / PARK"
              >
                <>
                  {items?.appointment?.[
                    moment(selectedDate).format('DD.MM.YYYY')
                  ]?.home_park?.map((elm, i) => (
                    <ApproveCardContainer key={i}>
                      <ApproveCard
                        date={elm.hour}
                        customerName={elm?.student}
                        type="approve"
                        onApprove={() => {
                          openReservationDetail(elm?.id);
                        }}
                        onReject={() => {
                          setOpenCancellation(elm?.id);
                        }}
                      />
                    </ApproveCardContainer>
                  ))}
                </>
              </ReservationAccordion>
              <ReservationAccordion
                miniIcon={<Svg.SessionType.Online />}
                title="ONLİNE"
              >
                <>
                  {items?.appointment?.[
                    moment(selectedDate).format('DD.MM.YYYY')
                  ]?.online?.map((elm, i) => (
                    <ApproveCardContainer key={i}>
                      <ApproveCard
                        date={elm.hour}
                        customerName={elm?.student}
                        type="approve"
                        onApprove={() => {
                          openReservationDetail(elm?.id);
                        }}
                        onReject={() => {
                          setOpenCancellation(elm?.id);
                        }}
                      />
                    </ApproveCardContainer>
                  ))}
                </>
              </ReservationAccordion>
            </ReservationAccordion>
          </AccordionContainer>
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
      <CancellationModal
        headerText="Randevunuzu iptal etmek istediğinize
        emin misiniz?"
        descText={`Seçili oluşturulan rezervasyonunuz iptal edilecektir. Lütfen iptal koşulları’nı okuduğunuzdan emin olun.`}
        cancelLabel="RANDEVUMU İPTAL ET"
        cancelProcessLabel="Vazgeç"
        open={openCancellation}
        cancelStepOne={(id) => {
          dispatch(PtApproveCancelStepOne(id));
        }}
        stepTwoData={funcStatus}
        cancelStepTwo={(id) => {
          dispatch(
            PtApproveCancelStepTwo(id, () => {
              getSelectedDate();
            })
          );
          setOpenCancellation(undefined);
        }}
        cancelProcess={() => {
          setOpenCancellation(undefined);
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
export default Approved;
