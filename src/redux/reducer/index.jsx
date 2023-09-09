import {CHANGESYMBOL} from './../action/actionconstants';

const initialState ={
    symbol : ""
    
};

export const rootreducer = (state = initialState, action) => {
    switch(action.type){
        case CHANGESYMBOL:
            return {
                ...state,
                symbol : action.payload
            };
        default: 
            return {
                ...state
            };

    }
}