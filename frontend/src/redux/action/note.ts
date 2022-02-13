import { RequestService } from "../../util/request";
import { AppDispatch } from "../store";

export const loadNotes = () => async (dispatch: AppDispatch) => {
    try {
        const notes = await RequestService.loadNotes();
        dispatch({ type: 'LOAD_NOTES', payload: notes })
    } catch (error) {
        dispatch({ type: 'LOAD_NOTES', payload: [] })

    }
}

export const addNote = (text: string) => async (dispatch: AppDispatch) => {
    try {
        await RequestService.addNote(text);
        loadNotes()(dispatch);
    } catch (error) {
        loadNotes()(dispatch);
    }
}
export const deleteNote = (id: number) => async (dispatch: AppDispatch) => {
    try {
        await RequestService.deleteNote(id);
        loadNotes()(dispatch);
    } catch (error) {
        loadNotes()(dispatch);
    }
}