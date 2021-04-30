import {
  MiniProfileCard,
  Material,
  PaymentCard,
  Svg,
  MultiContract,
  TrainerCard,
} from 'components';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { device } from 'utils';
import { Modal } from 'react-bootstrap';
import {
  setReservation,

  //getTemplates,
  getPtReservationCalendar,
  getAreaForPT,
  deleteAllSlot,
} from 'actions';

import axios from 'axios';
import PtSelection from './ptSelection';

const uri = `${process.env.REACT_APP_API_URL}/regions`;

const PacketReservation = ({ setPage, setBannerActive }) => {
  const dispatch = useDispatch();
  //Local States

  const [city, setCity] = useState(false);

  const [sessionTypes, setSessionTypes] = useState(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [field, setField] = useState('main');

  //Redux States
  const { userInfo } = useSelector((state) => state.userProfile.userInfo);
  const wallet = useSelector((state) => state.userProfile.wallet);
  const staticPages = useSelector((state) => state.staticPages);
  const reservation = useSelector((state) => state.reservation);

  useEffect(() => {
    setBannerActive(false);
  }, []);
  useEffect(() => {}, [userInfo]); //USER İNFO KOMPLE EKSİK
  useEffect(() => {
    // iF DATE OPTİON TRUE
    if (!reservation?.data?.isSelected) {
      dispatch(deleteAllSlot());
    } else {
      dispatch(
        getAreaForPT(
          userInfo.id,
          reservation.data?.date,
          null,
          reservation?.data?.branch_id,
          reservation.data?.session,
          1
        )
      );
    }
  }, [reservation?.data?.session]);

  useEffect(() => {
    if (!reservation?.data?.isSelected) {
      if (
        reservation?.data?.branch_id &&
        reservation?.data?.session &&
        reservation?.data?.date
      ) {
        dispatch(
          getPtReservationCalendar(
            userInfo.id,
            reservation.data?.date,
            null,
            reservation?.data?.branch_id,
            reservation.data?.session
          )
        );
      }
    }
  }, [
    reservation?.data?.branch_id,
    reservation?.data?.session,
    reservation?.data?.date,
  ]);
  useEffect(() => {
    if (!city) {
      axios
        .post(uri)
        .then((res) => res.data)
        .then((data) => data.data)
        .then((data) => {
          const new_data = data?.map((val) => {
            return {
              id: val.id,
              val: val.id,
              name: val.name,
            };
          });
          return setCity(new_data);
        })
        .catch((err) =>
          toast.error(err, {
            position: 'bottom-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        );
    }
  }, [city]);

  function CreditCard() {
    return (
      <>
        <InfoContainer>
          <DataContainer>
            <Info borderDisable>
              <Text style={{ fontWeight: 800 }}>Kart Bilgileri</Text>
            </Info>

            <Material.TextField
              label="Kart Üzerindeki İsim"
              type="text"
              name="holder_name"
              defaultValue={reservation?.data?.holder_name}
              onBlur={(e) => {
                dispatch(setReservation({ holder_name: e.target.value }));
              }}
            />

            <Material.TextField
              mask="9999 9999 9999 9999"
              label="Kart No Giriniz"
              type="text"
              name="card_number"
              defaultValue={reservation?.data?.card_number}
              onBlur={(e) => {
                dispatch(setReservation({ card_number: e.target.value }));
              }}
            />
            <Info borderDisable>
              <Material.TextField
                label="SKT"
                type="text"
                name="skt"
                mask="99/9999"
                defaultValue={
                  reservation?.data?.expiration_month +
                  '/' +
                  reservation?.data?.expiration_year
                }
                onBlur={(e) => {
                  var sktArr = e.target.value.split('/');
                  dispatch(
                    setReservation({
                      expiration_month: sktArr[0],
                      expiration_year: sktArr[1],
                    })
                  );
                }}
              />
              <Material.TextField
                mask="999"
                label="CVV"
                type="text"
                name="cvv"
                defaultValue={reservation?.data?.cvc}
                onBlur={(e) => {
                  dispatch(setReservation({ cvc: e.target.value }));
                }}
              />
            </Info>
            <Material.TextField
              label="Yüklenecek Tutarı Giriniz"
              type="number"
              name="deposit_amount"
              defaultValue={reservation?.data?.deposit_amount}
              onBlur={(e) => {
                dispatch(setReservation({ deposit_amount: e.target.value }));
              }}
            />
            {/**<Material.TextField
                label="Yükelenecek Tutarı Giriniz"
                type="text"
                name="cvv"
              /> */}
          </DataContainer>
          <div style={{ padding: '10px' }}>
            <text>
              Güvenliğiniz sebebi ile bu işleminiz 3D secure ile
              gerçekleştirilecektir.
            </text>
          </div>
          <div style={{ padding: '10px' }}>
            <Material.CheckBox
              checked={reservation?.data?.is_contracts_accepted}
              onChange={() => {
                if (reservation?.data.is_contracts_accepted) {
                  dispatch(setReservation({ is_contracts_accepted: false }));
                } else {
                  setOpenModal(true);
                }
              }}
              label={
                <div>
                  <span className="underline-text" onClick={() => {}}>
                    Ön Bilgilendirme Koşulları’nı ve Mesafeli Satış Sözleşmesini
                    okudum, onaylıyorum.
                  </span>
                </div>
              }
            />
          </div>
        </InfoContainer>
      </>
    );
  }
  function _renderLeftArea() {
    switch (reservation?.data?.payment_type) {
      case 'wallet':
      case 'both':
        var wallet_balance = wallet?.data?.balance || 0;
        var amount = reservation?.data?.totals_amount || 0;
        var diff = wallet_balance - amount;
        return (
          <>
            <InfoContainer>
              <DataContainer>
                <Info>
                  <Text style={{ fontWeight: 800 }}>Cüzdanım</Text>
                  <Text style={{ fontWeight: 800 }}>{wallet_balance}</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>İşlem Tutarı</Text>
                  <Text style={{ fontWeight: 800 }}>{amount}</Text>
                </Info>
                <Info>
                  <Text style={{ fontWeight: 800 }}>Kalan Tutar</Text>
                  <Text
                    style={{
                      fontWeight: 800,
                      color: diff < 0 ? 'red' : 'black',
                    }}
                  >
                    {diff}
                  </Text>
                </Info>
              </DataContainer>
              <div style={{ padding: '10px' }}>
                <text>
                  Yapacağınız işlem sonrası cüdanınızda kalacak olan toplam
                  tutar {reservation?.data?.totals_amount} TL’dir
                </text>
              </div>
            </InfoContainer>
            {diff < 0 && <CreditCard />}
          </>
        );
      case 'credit_card':
        return <CreditCard />;

      default:
        return (
          <>
            <MiniProfileCard
              photo={userInfo.photo}
              name={'Gelin Paketi'}
              rating={userInfo.rating}
              type_id={userInfo.type_id}
              price={userInfo.price}
            />
            <SelectionContainer>
              {reservation?.data?.isSelected && (
                <InputContainer>
                  <Text color="#9B9B9B">{'Tarih ve Saat Seçiminiz'}</Text>
                  <Material.TextField
                    type="text"
                    defaultValue="04.08.2021 - 10:00"
                    inputProps={{
                      readOnly: true,
                    }}
                  />
                </InputContainer>
              )}
              <InputContainer>
                <Text color="#9B9B9B">{'Eğitmen Seçiniz:'}</Text>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setField('ptSelection');
                  }}
                >
                  <div style={{ pointerEvents: 'none' }}>
                    <Material.SimpleSelect
                      name="pt"
                      label={reservation?.data?.selectedPt?.name || 'Seçiniz'}
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </InputContainer>
              {reservation?.data?.selectedPt && (
                <InputContainer>
                  <TrainerCard
                    image={reservation?.data?.selectedPt?.photo}
                    name={reservation?.data?.selectedPt?.name}
                    stars={reservation?.data?.rating}
                    category={reservation?.data?.selectedPt?.title}
                    address={
                      reservation?.data?.selectedPt?.district +
                      ' / ' +
                      reservation?.data?.selectedPt?.city
                    }
                    price={reservation?.data?.price}
                    classification={reservation?.data?.classification}
                  />
                </InputContainer>
              )}
              <InputContainer>
                <Text color="#9B9B9B">{'Oturum Türü Seçiniz:'}</Text>
                <Material.SimpleSelect
                  items={sessionTypes}
                  name="sessionType"
                  defaultValue={reservation?.data?.session}
                  onChange={(e) =>
                    dispatch(
                      setReservation({
                        session: e.target.value,
                        location_id: undefined,
                        gym_price: 0,
                      })
                    )
                  }
                />
              </InputContainer>
            </SelectionContainer>
          </>
        );
    }
  }

  switch (field) {
    case 'main':
      return (
        <Main>
          <BackLink onClick={() => setPage('Home')}>
            <Svg.ArrowLeftIcon />

            <span>Rezervasyon Oluşturun</span>
          </BackLink>
          <Container>
            <LeftWrapper>{_renderLeftArea()}</LeftWrapper>
            <RightWrapper>
              <PaymentCard type="packet" dateOption={false} />
            </RightWrapper>
            <StyledModal show={openModal} onHide={() => setOpenModal(false)}>
              <MultiContract
                acceptKvkk={true}
                setAccept={() => {
                  dispatch(setReservation({ is_contracts_accepted: true }));
                }}
                setOpenModal={setOpenModal}
                confirmationData={staticPages.data}
                userTypeId={1}
              />
            </StyledModal>
          </Container>
        </Main>
      );
    case 'ptSelection':
      return <PtSelection setField={setField} />;

    default:
      break;
  }
};
const Main = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const StyledModal = styled(Modal)`
  .modal-content {
    width: 600px;
    background-color: var(--white1);
    padding: 15px 30px;
    @media ${device.sm} {
      height: 70vh;
      width: 90vw;
      overflow: scroll;
    }
  }
`;
const Container = styled.div`
  display: flex;
  width: 100%;
  @media ${device.sm} {
    flex-direction: column;
  }
`;
const LeftWrapper = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  @media ${device.sm} {
    width: 100%;
  }
`;
const RightWrapper = styled.div`
  width: 50%;
  @media ${device.sm} {
    width: 100%;
  }
`;
const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  border-top-style: solid;
  border-width: 1px;
  border-color: rgba(144, 144, 144, 0.1);
  padding: 30px;
  @media ${device.sm} {
    padding: 0;
  }
`;
const Text = styled.text`
  font-size: 1rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  color: ${(props) => props.color || 'black'};
  @media ${device.sm} {
    font-size: 0.7rem;
  }
`;

const InfoContainer = styled.div`
  margin-top: 40px;
  width: 586px;
  background: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  @media ${device.sm} {
    width: 100%;
  }
`;
const DataContainer = styled.div`
  width: 100%;
  background: white;
  border-radius: 10px;
  border-style: solid;
  border-width: 1px;
  border-color: #c6c6c6;
  padding: 5px 20px;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  border-style: ${(p) => (p.borderDisable ? 'none' : 'solid')};
  border-color: rgba(144, 144, 144, 0.5);
  border-width: 0 0 1px 0;
  padding: 10px 5px;
`;

const InputContainer = styled.div`
  pointer-events: ${(p) => (p.disable ? 'none' : 'initial')};
  opacity: ${(p) => (p.disable ? '0.7' : '1')};
  margin-bottom: 20px;
`;

const BackLink = styled(Text)`
  display: flex;
  cursor: pointer;
  margin-bottom: 15px;

  svg {
    margin-top: 2px;
  }

  > span {
    margin-left: 10px;
    color: ${(p) => p.theme.colors.softDark};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

export default PacketReservation;
