import React, { useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Password from 'components/ProfileSettings/Forms/tabs/Password';
import SettingsForm from 'components/ProfileSettings/Forms/SettingsForm';
import CompanyInf from 'components/ProfileSettings/Forms/CompanyInf';
import Phone from 'components/ProfileSettings/Forms/tabs/Phone';
import ComputedTest from 'components/ProfileSettings/Forms/tabs/ComputedTest';
import Address from 'components/ProfileSettings/Address';
import About from 'components/ProfileSettings/About';
import VKI from 'components/ProfileSettings/Forms/VKI';
import {
  Accordion,
  Text,
  Box,
  Svg,
  Files,
  Modal,
  CancellationDismissInfo,
  pulse,
} from 'components';
import ProfileCancellation from 'components/ProfileSettings/ProfileCancellation/ProfileCancellation';
import {
  USER,
  PERSONAL_TRAINER,
  WORK_PLACE,
  DIETITIAN,
} from '../../../constants';
import Notifications from 'components/ProfileSettings/Notifications';

const trainerAndDietitanData = [
  {
    settingsName: 'Profil',
    body: <SettingsForm />,
  },
  {
    settingsName: 'Hakkımda',
    body: <About />,
  },
  {
    settingsName: 'İletişim',
    body: <Phone />,
  },
  {
    settingsName: 'Şifre İşlemleri',
    body: <Password />,
  },
  {
    settingsName: 'Belgeler',
    body: <Files />,
    pulse: true,
  },
  {
    settingsName: 'Adresim',
    body: <Address />,
  },
  {
    settingsName: 'Şirket Bilgileri',
    body: <CompanyInf />,
  },
];

const regularUserTabs = [
  {
    settingsName: 'Profil',
    body: <SettingsForm />,
  },
  {
    settingsName: 'İletişim',
    body: <Phone />,
  },
  {
    settingsName: 'Şifre İşlemleri',
    body: <Password />,
  },
  {
    settingsName: 'Boy & Ağırlık & VKI Bilgineriniz',
    body: <VKI />,
  },
  {
    settingsName: 'Tamamlanmış Testler ',
    body: <ComputedTest />,
  },
  {
    settingsName: 'Adresim',
    body: <Address locationDisable />,
  },
];

const workPlaceData = [
  {
    settingsName: 'İş Yeri Profil',
    body: <SettingsForm />,
  },
  {
    settingsName: 'İş Yeri Hakkında',
    body: <About />,
  },
  {
    settingsName: 'İletişim',
    body: <Phone />,
  },
  {
    settingsName: 'İş Yeri Bilgileri',
    body: <CompanyInf />,
  },
  {
    settingsName: 'Şifre İşlemleri',
    body: <Password />,
  },
  {
    settingsName: 'İş Yeri Belgeler',
    body: <Files />,
    pulse: true,
  },
  {
    settingsName: 'İş Yeri Adres',
    body: <Address />,
  },
];

const ProfileSettingsList = () => {
  const user = useSelector((state) => state.auth.user);

  const { activeTabKey } = useParams();

  const cancellationDismissModalRef = useRef();

  let tabData;

  switch (user?.type_id) {
    case USER:
      tabData = regularUserTabs;
      break;
    case PERSONAL_TRAINER:
      tabData = trainerAndDietitanData;
      break;
    case WORK_PLACE:
      tabData = workPlaceData;
      break;
    case DIETITIAN:
      tabData = trainerAndDietitanData;
      break;
    default:
      tabData = regularUserTabs;
      break;
  }

  const settings = tabData?.map((item, index) => (
    <Wrapper key={'wrapper' + index}>
      <Accordion.Item>
        <Accordion.Toggle>
          <SettingsRow pulse={item.pulse}>
            <Box col>
              <Text color="dark" textAlign="left" fontWeight="500" p="2px">
                {item.settingsName}
              </Text>
            </Box>

            <Svg.ArrowUpIcon />
          </SettingsRow>
        </Accordion.Toggle>
        <Accordion.Collapse>
          <BodyWrapper>{item.body}</BodyWrapper>
        </Accordion.Collapse>
      </Accordion.Item>
    </Wrapper>
  ));

  return (
    <>
      {activeTabKey !== 'notifications' && (
        <>
          <Accordion>{settings}</Accordion>

          <ProfileCancellation />
        </>
      )}

      {activeTabKey === 'notifications' && <Notifications />}

      {/* <CancellationReason /> */}

      <Modal ref={cancellationDismissModalRef}>
        <CancellationDismissInfo />
      </Modal>
    </>
  );
};

export default ProfileSettingsList;

const Wrapper = styled.div`
  border-radius: 15px;
  background: #fff;
  box-shadow: 2px 3px 18px rgba(0, 0, 0, 0.09);
  margin-bottom: 25px;
`;

const SettingsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  border-bottom: 1px solid transparent;
  border-bottom: ${(p) => p.isActive && `1px solid ${p.theme.colors.gray5}`};
  padding: 10px 15px;

  ${(p) =>
    p.pulse &&
    css`
      animation: pulse 1s;
      animation-iteration-count: 2;
      border-radius: 20px;
      ${pulse}
    `}

  svg {
    transition: all 0.5s;
    transform: ${(p) => p.isActive && 'rotate(180deg)'};
  }
`;

const BodyWrapper = styled.div`
  padding: 10px 15px;
`;
