import Constants from '../constants/Constants';
import {useDispatch} from "react-redux";

const actions = {
    setQuery,
    selectBuddy,
    doSort,
    doAdd,
    doSearch,
    addBuddy,
    removeBuddy,
    setAlertState,
    setAlertConfirm,
    setView,
    setFilteredBuddies
};

// filter through list
function setQuery(query){
    return {
        type:Constants.SET_SEARCH_QUERY,
        payload:query
    }
}
// select for view
function selectBuddy(selected){
    return {
        type:Constants.SET_SELECTED,
        payload:selected
    }
}
// sort list
function doSort(){
    return (dispatch, getState) => {
        const {filteredBuddies} = getState().state;
        const sorted = filteredBuddies.sort((a,b) => {
            if (a.username < b.username)
                return -1;
            else if (a.username > b.username)
                return 1;
            else
                return 0;
        });
        dispatch(actions.setFilteredBuddies(sorted));
    }
}

function doAdd(){
    return (dispatch, getState) => {
        dispatch(actions.setAlertState(false));
        dispatch(actions.setView(3));
        return Promise.resolve();
    }
}

function doSearch(query){
    return (dispatch, getState) => {
        dispatch(actions.setQuery(query));
        const {buddys} = getState().state;
        if(query){
            const filValue = query.toLowerCase().trim();
            const matches = buddys.filter((item) => {
                return  item.username.toLowerCase().indexOf(filValue)  !== -1 ||
                    item.firstname.toLowerCase().indexOf(filValue) !== -1 ||
                    item.lastname.toLowerCase().indexOf(filValue)  !== -1;
            });
            dispatch(actions.setFilteredBuddies(matches));
        } else {
            dispatch(actions.setFilteredBuddies(buddys));
        }
    }
}

// add to list
function addBuddy(item){
    return (dispatch, getState) => {
        const date = new Date();
        const y = date.getFullYear().toString();
        const m = (date.getMonth()+1).toString(); // getMonth() is zero-based
        const d  = date.getDate().toString();
        const signin = d + "/" + m + "/" + y;
        const newBuddy = {
            avatar:'avatar-m.jpg',
            status:'offline',
            signin: signin
        };
        const {filteredBuddies} = getState().state;
        const properties = Object.keys(item);
        properties.forEach((index) => {
            newBuddy[index] = item[index].val;
            if(index = 'biography'){
                newBuddy[index] = item[index];
            }
        });
        filteredBuddies.unshift(newBuddy);
        dispatch(actions.setFilteredBuddies(filteredBuddies));
        dispatch(actions.setView(1));
    };
}
// remove from list
function removeBuddy(deleted){
    return (dispatch, getState) => {
        const {filteredBuddies, selected} = getState().state;
        const filteredBuddys = filteredBuddies.filter((item) => item.username != selected.username);
        dispatch(actions.setFilteredBuddies(filteredBuddys));
        dispatch(actions.selectBuddy({}));
        dispatch(actions.setView(1));
    };
}
// cancel delete
function cancel(){}
// show alert
function setAlertState(alert, state){
    if(alert === 'alertConfirm') {
        return {
            type:Constants.ALERT_CONFIRM,
            payload:state
        }
    }
    if(alert === 'alertError') {
        return {
            type:Constants.SHOW_ALERT,
            payload:state
        }
    }
}
// confirm delete
function setAlertConfirm(alertConfirm){
    return {
        type:Constants.ALERT_CONFIRM,
        payload:alertConfirm
    }
}

function setView(view){
    return {
        type:Constants.SET_VIEW,
        payload:view
    }
}

function setFilteredBuddies(filtered){
    return {
        type:Constants.SET_FILTERED_BUDDIES,
        payload:filtered
    }
}

export default actions;