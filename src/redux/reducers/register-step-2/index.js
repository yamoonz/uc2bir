// @ts-nocheck
import { TYPES } from "./action/type"
import { services } from "./services";

export const register_step_two = data => async dispatch => {
    dispatch({
        type: TYPES.FETCH_PENDING_STEP_TWO,
    });
    try {
        const payload = await services.POST(data);
        return dispatch({
            type: TYPES.FETCH_SUCCESS_STEP_TWO,
            payload: payload.data.data
        });
    } catch(err) {
        return dispatch({
            type: TYPES.FETCH_ERROR_STEP_TWO,
            payload: err.message
        });
    }
}