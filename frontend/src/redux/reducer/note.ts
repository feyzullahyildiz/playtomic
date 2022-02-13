
interface State {
    data: Note[];
}
const initialData: State = {
    data: [],
}
type Actions =
    BaseAction<'LOAD_NOTES', Note[]>
    // | BaseAction<'ADD_NOTE', undefined>
    // | BaseAction<'DELETE_NOTE', number>
    ;

export const noteReducer = (state: State = initialData, action: Actions): State => {
    if (action.type === 'LOAD_NOTES') {
        return { ...state, data: action.payload }
    }
    return state;
}