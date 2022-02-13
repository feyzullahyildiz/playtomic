import { RequestService } from "../../util/request";
import { AppDispatch } from "../store";


export const setUser = () => async (dispatch: AppDispatch) => {
    try {
        const user = await RequestService.me();
        await new Promise((res) => setTimeout(res, 300));
        dispatch({ type: 'SET_USER', payload: user });
    } catch (error) {
        // Here was a bug, if token expires I cannot make ProtectedPage reload here :(
        RequestService.logout();
        window.location.reload();
        dispatch({ type: 'SET_USER', payload: null });

    }
}