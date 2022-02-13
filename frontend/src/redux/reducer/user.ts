interface State {
    user: GithubUser | null
}
const initialData: State = {
    user: null
}
type Actions = BaseAction<'SET_USER', GithubUser | null>; 
export const userReducer = (state = initialData, action: Actions): State => {
    if (action.type === 'SET_USER') {
        return { ...state, user: action.payload }
    }
    return state;
}
