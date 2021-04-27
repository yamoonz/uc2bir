import {
  HTTP_REQUEST,
  GET_ROOMS,
  MESSAGE_SEARCH,
  RESET_MESSAGE_SEARCH,
  GET_ROOM_MESSAGES,
  SEND_MESSAGE,
  SET_ROOM_NAME,
  RESET_MESSAGES,
  READ_MESSAGE,
  MESSAGE_SIDEBAR_OPEN,
} from '../../constants';
import { toast } from 'react-toastify';

export const getRooms = (isFirstTime) => async (dispatch) => {
  const url = `/user/message/rooms`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: GET_ROOMS,
      transformData: (data) => data.data,
      callBack: (data) => {
        if (isFirstTime) {
          const allRooms = data.data;

          dispatch(
            setRoomName(allRooms?.[0]?.room_name, data.data?.[0]?.user_meta)
          );
        }
      },
    },
  });
};

export const setMessageSideBarOpen = (open) => async (dispatch) => {
  dispatch({
    type: MESSAGE_SIDEBAR_OPEN,
    payload: {
      messageSideBarOpen: open,
    },
  });
};

export const searchMessage = (searchValue) => async (dispatch, getState) => {
  const rooms = getState().profileSettings2.messages.rooms.data;

  const filteredRooms = rooms.filter((room) =>
    room.user_meta?.name?.toLowerCase().includes(searchValue.toLowerCase())
  );

  dispatch({
    type: MESSAGE_SEARCH,
    payload: {
      searchValue,
      foundRooms: filteredRooms,
    },
  });
};

export const updateUserRead = () => async (dispatch, getState) => {
  const url = `/user/message/update-unread`;

  const {
    selectedRoomName,
  } = getState().profileSettings2.messages.selectedRoom;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: READ_MESSAGE,
      body: { room_name: selectedRoomName },
      callBack: () => dispatch(getRooms()),
    },
  });
};

export const getRoomMessages = (roomName) => async (dispatch) => {
  const url = `/user/message/messages`;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: GET_ROOM_MESSAGES,
      body: { room_name: roomName },
      transformData: (data) => data.data,
      callBack: () => dispatch(updateUserRead()),
    },
  });
};

export const sendMessageToRoom = (message, successCallback) => async (
  dispatch,
  getState
) => {
  const url = `/user/message/send`;

  const {
    selectedRoomUser,
  } = getState().profileSettings2.messages.selectedRoom;

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SEND_MESSAGE,
      body: { message, receiver_id: selectedRoomUser?.id || 0 },
      callBack: successCallback,
      errorHandler: (message) => toast.error(message),
    },
  });
};

export const sendFileToRoom = (file, successCallback) => async (
  dispatch,
  getState
) => {
  const url = `/user/message/send`;

  const {
    selectedRoomUser,
  } = getState().profileSettings2.messages.selectedRoom;

  const formData = new FormData();

  formData.append('files[]', file);

  formData.append('receiver_id', selectedRoomUser?.id || 0);

  await dispatch({
    type: HTTP_REQUEST,
    payload: {
      method: 'POST',
      url,
      label: SEND_MESSAGE,
      body: formData,
      callBack: successCallback,
      errorHandler: (message) => toast.error(message),
    },
  });
};

export const resetProductSearch = () => ({
  type: RESET_MESSAGE_SEARCH,
});

export const setRoomName = (roomName, user) => ({
  type: SET_ROOM_NAME,
  payload: {
    roomName,
    user,
  },
});

export const resetSelectedRoom = () => ({
  type: RESET_MESSAGES,
});
