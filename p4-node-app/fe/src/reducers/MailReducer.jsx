const initialState = {
  mails: localStorage.getItem("mails") ? JSON.parse(localStorage.getItem("mails")) : []
}

const MailReducer = (state, action) => {
  switch(action.type) {
    case "LIST_MAIL": 
      return { mails: action.payload }
    case "ADD_MAIL":
      return { mails: [action.payload, ...state.mails]}
    case "EDIT_MAIL": 
      return { mails: state.mails.map(mail => mail._id === action.payload._id ? action.payload : mail )}
    case "DELETE_MAIL":
      return { mails: state.mails.map(mail => mail._id === action.payload._id ? {...state.mails} : mail )}
    default:
      return state
  }
}

export { initialState, MailReducer };