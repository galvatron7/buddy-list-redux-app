import Constants from '../constants/Constants'
import BuddyData from "../data";

const initialState = {
    query:'',
    view: 1,
    alertConfirm: false,
    alertError: false,
    buddys: BuddyData,
    filteredBuddies:[],
    selected: {}
};

export default (state = initialState, action) => {
    switch(action.type){
        // select for view
        case Constants.SET_SELECTED:
            return {
                ...state,
                selected:action.payload
            };
        // add to list
        case Constants.SET_FILTERED_BUDDIES:
            return {
                ...state,
                filteredBuddies: action.payload
            };
        // remove from list
        case Constants.DELETE_BUDDY:
            return {};
        case Constants.SET_VIEW:
            return {
                ...state,
                view:action.payload
            };
        // confirm delete
        case Constants.ALERT_CONFIRM:
            return {
                ...state,
                alertConfirm: action.payload
            };
        // show alert error
        case Constants.ALERT_ERROR:
            return {
                ...state,
                alertError: action.payload
            };
        default:
            return state;
    }
}