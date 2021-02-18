// @ts-nocheck
import React from 'react';
import { ReactSVG } from 'react-svg';

//import svg
import { ReactComponent as Menu } from './images/menu.svg';
import { ReactComponent as Search } from './images/search.svg';

//import resct svg
import InfoHome from './images/info-home.svg';
import InfoOnline from './images/info-online.svg';
import InfoSport from './images/info-sport.svg';
import Upload from './images/upload.svg';
import Error from './images/error.svg';
import Tick from './images/tick.svg';
import Trash from './images/trash.svg';
import Close from './images/close.svg';
import Username from './images/username.svg';
import Email from './images/email.svg';
import Phone from './images/phone.svg';
import Password from './images/password.svg';
import Eye from './images/eye.svg';
import Info from './images/info.svg';
import Success from './images/success.svg';
import ListItem from './images/list-item.svg';
import ArrowDown from './images/arrow-down.svg';
import ArrowRight from './images/arrow-right.svg';
import Certificate from './images/certificate.svg';
import Comment from './images/comment.svg';
import Heart from './images/heart.svg';
import Player from './images/player.svg';
import Fitness from './images/fitness.svg';
import Yoga from './images/yoga.svg';
import KickBoks from './images/kick-boks.svg';
import AthleticPerformance from './images/athletic-performance.svg';
import Tennis from './images/tennis.svg';
import Swimming from './images/swimming.svg';
import Pilates from './images/pilates.svg';

const Svg = {
  Menu: (props) => <Menu {...props} />,
  Search: (props) => <Search {...props} />,
  InfoHome: (props) => <ReactSVG {...props} src={InfoHome} />,
  InfoOnline: (props) => <ReactSVG {...props} src={InfoOnline} />,
  InfoSport: (props) => <ReactSVG {...props} src={InfoSport} />,
  TrashIcon: (props) => <ReactSVG {...props} src={Trash} />,
  UploadIcon: (props) => <ReactSVG {...props} src={Upload} />,
  TickIcon: (props) => <ReactSVG {...props} src={Tick} />,
  ErrorIcon: (props) => <ReactSVG {...props} src={Error} />,
  CloseIcon: (props) => <ReactSVG {...props} src={Close} />,
  UsernameIcon: (props) => <ReactSVG {...props} src={Username} />,
  EmailIcon: (props) => <ReactSVG {...props} src={Email} />,
  PhoneIcon: (props) => <ReactSVG {...props} src={Phone} />,
  EyeIcon: (props) => <ReactSVG {...props} src={Eye} />,
  PasswordIcon: (props) => <ReactSVG {...props} src={Password} />,
  InfoIcon: (props) => <ReactSVG {...props} src={Info} />,
  SuccessIcon: (props) => <ReactSVG {...props} src={Success} />,
  ListItemIcon: (props) => <ReactSVG {...props} src={ListItem} />,
  ArrowDownIcon: (props) => <ReactSVG {...props} src={ArrowDown} />,
  ArrowRightIcon: (props) => <ReactSVG {...props} src={ArrowRight} />,
  YogaIcon: (props) => <ReactSVG {...props} src={Yoga} />,
  FitnessIcon: (props) => <ReactSVG {...props} src={Fitness} />,
  PilatesIcon: (props) => <ReactSVG {...props} src={Pilates} />,
  TennisIcon: (props) => <ReactSVG {...props} src={Tennis} />,
  CertificateIcon: (props) => <ReactSVG {...props} src={Certificate} />,
  Comment: (props) => <ReactSVG {...props} src={Comment} />,
  Heart: (props) => <ReactSVG {...props} src={Heart} />,
  Player: (props) => <ReactSVG {...props} src={Player} />,

  Categories: [
    {
      name: 'Fitness',
      svg: (props) => <ReactSVG {...props} src={Fitness} />,
    },
    {
      name: 'Pilates',
      svg: (props) => <ReactSVG {...props} src={Pilates} />,
    },
    {
      name: 'Tenis',
      svg: (props) => <ReactSVG {...props} src={Tennis} />,
    },
    {
      name: 'Yoga',
      svg: (props) => <ReactSVG {...props} src={Yoga} />,
    },
    {
      name: 'Kick Boks',
      svg: (props) => <ReactSVG {...props} src={KickBoks} />,
    },
    {
      name: 'Athletic Performans',
      svg: (props) => <ReactSVG {...props} src={AthleticPerformance} />,
    },
    {
      // Değişecek
      name: 'Cimnastik',
      svg: (props) => <ReactSVG {...props} src={Swimming} />,
    },
  ],
};

export default Svg;
