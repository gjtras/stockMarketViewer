import {CHANGESYMBOL} from './actionconstants';


export const changeSymbol = (symbol) => {
    return {
        type: CHANGESYMBOL,
        payload: symbol
    };
};