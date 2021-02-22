import actions from "../../actions/actions";
import {useDispatch} from "react-redux";

const BuddyToolBar = (props) => {

    const dispatch = useDispatch();

    const handleSortClick = (event) => {
        dispatch(actions.doSort());
    };

    const handleAddClick = (event) => {
        dispatch(actions.setAlertState("alertError", false));
        dispatch(actions.setView(3))
    };

    return(
        <div className="buddy-tool-bar" >
            <button className="button" onClick={() => handleSortClick()}>Sort</button>
            <button className="button" onClick={() => handleAddClick()}>Add Buddy</button>
        </div>
    )
};

export default BuddyToolBar;