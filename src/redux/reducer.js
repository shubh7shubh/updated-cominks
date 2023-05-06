import * as types from "./types"

let initialState = {
    activeUser:{},
    users: []
}

export const DataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SETUSERDETAILS:
              return { ...state, activeUser:action.payload };
             

        case "SETPARAPHRASE":
            const updatedUserForParaphrase = state.users.map((e) => {
                if(e._id === action.payload.userId){
                    return {...e,paraphrase:[...e.paraphrase,action.payload.message]}
                }
                return e
            }) 
            return {...state,activeUser:updatedUserForParaphrase}

        default:
            return state;
    }




}