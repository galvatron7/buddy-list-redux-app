import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import actions from '../../actions/actions';

const BuddyView = (props) => {
    const [message, setMessage] = useState("Select one of your buddies to view their info...");
    const [buddyProfile, setBuddyProfile] = useState({
        username: {
            placeholder:"Username",
            val:'',
            isvalid: true,
        },
        firstname: {
            placeholder:"Firstname",
            val:'',
            isvalid: true,
        },
        lastname: {
            placeholder:"Lastname",
            val:'',
            isvalid: true,
        },
        email: {
            placeholder:"Email",
            val:'',
            isvalid: true,
        }
    });
    const {selected} = useSelector(state => state.state);
    const {view} = useSelector(state => state.state);
    const {alertConfirm} = useSelector(state => state.state);
    const {alertError} = useSelector(state => state.state);
    const dispatch = useDispatch();

    const valUsername = (event) => {
        const input = event.target.value;
        const nameRegex = /^[a-zA-Z]{2,50}$/;
        if(input && (nameRegex.test(input))){
            buddyProfile.username.isvalid = true;
            buddyProfile.username.val = input;
            return true;
        }
        buddyProfile.username.isvalid = false;
        return false;
    };

    const valFirstname = (event) => {
        const input = event.target.value;
        const nameRegex = /^[a-zA-Z]{2,50}$/;
        if(input && (nameRegex.test(input))){
            buddyProfile.firstname.isvalid = true;
            buddyProfile.firstname.val = input;
            return true;
        }
        buddyProfile.firstname.isvalid = false;
        return false;
    };

    const valLastname = (event) => {
        const input = event.target.value;
        const nameRegex = /^[a-zA-Z]{2,50}$/;
        if(input && (nameRegex.test(input))){
            buddyProfile.lastname.isvalid = true;
            buddyProfile.lastname.val = input;
            return true;
        }
        buddyProfile.lastname.isvalid = false;
        return false;
    };

    const valEmail = (event) => {
        const input = event.target.value;
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const maxLength = 50;
        if(input && (re.test(input)) && input.length <= maxLength){
            buddyProfile.email.isvalid = true;
            buddyProfile.email.val = input;
            return true;
        }
        buddyProfile.email.isvalid = false;
        return false;
    };

    const addBio = (event) => {
        const input = event.target.value;
        buddyProfile.biography = input;
    };

    const handleAddClick = (event) => {
        event.preventDefault();
        const fields = Object.keys(buddyProfile);
        for(let i = 0; i < fields.length; i++){
            if(buddyProfile[fields[i]].isvalid === false || buddyProfile[fields[i]].val === ''){
                dispatch(actions.setAlertState('alertError', true));
                return;
            }
        }
        dispatch(actions.setAlertState('alertError', false));
        dispatch(actions.addBuddy(buddyProfile));
    };

    const handleDeleteClick = (event) => {
        event.preventDefault();
        dispatch(actions.setAlertState('alertConfirm', false));
        dispatch(actions.removeBuddy());
    };

    const handleCancelClick = (event) => {
        event.preventDefault();
        dispatch(actions.setAlertState('alertConfirm', false));
    };

    const handleConfirmClick = (event) => {
        event.preventDefault();
        dispatch(actions.setAlertState('alertConfirm', true));
    };

    return (
        <div className="content">
            <div className={`buddy-view ${view === 3 ? 'show':'hidden'} `}>
                <div className={`buddy-error ${alertError? 'show':'hidden'} `} >
                    There is an error in the form... Please Check it!
                </div>
                <form className="buddy-start">
                    <h1>Add user</h1>
                    <input type="text" className="buddy-txt" onBlur={valUsername} placeholder="Username"></input>
                    <input type="text" className="buddy-txt" onBlur={valFirstname} placeholder="First Name"></input>
                    <input type="text" className="buddy-txt" onBlur={valLastname} placeholder="Last Name"></input>
                    <input type="email" className="buddy-txt" onBlur={valEmail} placeholder="Email"></input>
                    <textarea onChange={addBio} className="buddy-txt"></textarea>
                    <div>
                        <button className="button" onClick={handleAddClick}>Add Buddy</button>
                    </div>
                </form>
            </div>
            <div className={`buddy-view ${view == 2 ? 'show':'hidden'} `} >
                <div className={`buddy-alert ${alertConfirm ? 'show':'hidden'} `} >
                    <span>Are you sure you want to remove your buddy?</span>
                    <button className="button confirm-btn" onClick={handleDeleteClick}>Yes</button>
                    <button className="button confirm-btn" onClick={handleCancelClick}>No</button>
                </div>
                <div className="buddy-banner">
                    <img className="buddy-img" src={`../img/${selected?.avatar}`} />
                </div>
                <div className="buddy-btn-bar" >
                                    <span>
                                        <strong>Email:</strong> &nbsp;
                                        {selected.email}
                                    </span>
                    <div className="buddy-del-ctr">
                        <button className="button" onClick={() => dispatch(actions.setAlertState('alertConfirm', true))}>Unfriend</button>
                    </div>
                </div>
                <h1 className="buddy-bio">{selected.username}</h1>
                <p	className={`buddy-signin ${selected.status === 'offline'?'show':'hidden'}`}>
                    <strong>Last Sign in:</strong> &nbsp; {selected.signin}
                </p>
                <div className="bio-ctr">
                    <p className="buddy-bio">
                        {selected.biography}
                    </p>
                </div>
            </div>
            <div className={`buddy-view ${view === 1? 'show':'hidden'} `}>
                <div className="buddy-start">
                    <h1>{message}</h1>
                </div>
            </div>
        </div>
    );
};

export default BuddyView;