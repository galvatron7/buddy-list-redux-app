import actions from "../../actions/actions";
import {useDispatch} from "react-redux";

const BuddyToolBar = (props) => {

    const dispatch = useDispatch();

    const handleSortClick = (event) => {
        dispatch(actions.doSort());
    };

    const handleAddClick = (event) => {
        new Promise((resolve, reject) => {
                dispatch(actions.setAlertState("alertError", false));
                resolve();
            })
            .then(() => {
                dispatch(actions.setView(3))
            });
    };

    return(
        <div className="buddy-tool-bar" >
            <button className="button" onClick={() => handleSortClick()}>Sort</button>
            <button className="button" onClick={() => handleAddClick()}>Add Buddy</button>
        </div>
    )
};

export default BuddyToolBar;