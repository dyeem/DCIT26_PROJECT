import { BUY_CROCHET } from "./crochetTypes"

const initialState = {
    numOfCrochet: 10
}

const crochetReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_CROCHET: return {
            ...state,
            numOfCrochet: state.numOfCrochet - 1
        }
    
        default: return state;
    }
}

export default crochetReducer