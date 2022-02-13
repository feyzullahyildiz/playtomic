import { RequestService } from "../../util/request";
import { AppDispatch } from "../store";


export const setUser = () => async (dispatch: AppDispatch) => {
    try {
        const user = await RequestService.me();
        await new Promise((res) => setTimeout(res, 300));
        dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
        dispatch({ type: 'SET_USER', payload: null });

    }
}