import { combineReducers } from 'redux';

import auth from '../reducers/authReducer';
import profile from '../reducers/profileReducer';
import stepOne from '../reducers/stepOneReducer';
import stepTwo from '../reducers/stepTwoReducer';
import stepThree from '../reducers/stepThreeReducer';
import stepFour from '../reducers/stepFourReducer';
import registerData from '../reducers/registerDataReducer';
import forgotPassword from '../reducers/forgotPaswword';
import resetPassword from '../reducers/resetPassword';
import quizGet from '../reducers/quizGetReducer';
import profileSettings from '../reducers/profileSettingsReducer';
import onlineReducer from '../reducers/onlineReducer';
// TODO: profileSettings değiştirildiğinde bu da düzeltilebilir.
import profileSettings2 from '../reducers/profileSettingsReducer/index';
import myGalleries from '../reducers/profileSettingsReducer/galleriesReducer';
import myBlogs from '../reducers/profileSettingsReducer/blogsReducer';
import footer from '../reducers/footerReducer';
import userProfileReducer from '../reducers/userProfileReducer/index';
import searchProfessional from '../reducers/searchProfessionalReducer';
import home from '../reducers/homeReducer';
import reservation from '../reducers/reservationReducer';
import reservationCalendar from '../reducers/reservationCalendarReducer';
import staticPages from '../reducers/staticPagesReducer';
import professionalReservation from '../reducers/reservationProfessionalReducers';
import buyPacket from '../reducers/buyPacketReducer';
import payment from '../reducers/paymentReducer';
import paymentPacket from '../reducers/paymentPacketReducer';

const reducers = combineReducers({
  auth,
  profile,
  stepOne,
  stepTwo,
  stepThree,
  stepFour,
  registerData,
  forgotPassword,
  resetPassword,
  quizGet,
  profileSettings,
  profileSettings2,
  myGalleries,
  myBlogs,
  footer,
  userProfile: userProfileReducer,
  searchProfessional,
  home,
  reservation,
  reservationCalendar,
  staticPages,
  professionalReservation,
  buyPacket,
  payment,
  onlineReducer,
  paymentPacket,
});

export default reducers;
