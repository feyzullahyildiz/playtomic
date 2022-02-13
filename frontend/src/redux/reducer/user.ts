interface Reducer {
    user: GithubUser | null
}
const initialData: Reducer = {
    user: null
}
type Actions = BaseAction<'SET_USER', GithubUser | null>; 
export const userReducer = (state = initialData, action: Actions): Reducer => {
    if (action.type === 'SET_USER') {
        return { ...state, user: action.payload }
    }
    return state;
}
