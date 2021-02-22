import BuddyItem from '../BuddyItem/BuddyItem';
import {useDispatch, useSelector} from "react-redux";
import actions from "../../actions/actions";

const BuddyList = (props) => {

    const {filteredBuddies} = useSelector(state => state.state);
    const buddys = useSelector(state => state.state.buddys);
    const buddyList = (filteredBuddies?.length > 0)? filteredBuddies : buddys;
    const dispatch = useDispatch();

    const handleClick = (bd) => {
        dispatch(actions.selectBuddy(bd));
        dispatch(actions.setAlertState('alertConfirm', false));
        dispatch(actions.setView(2));
    };

    return(
        <div className="buddy-list-ctr">
            <ul className="buddy-list">
                {
                    buddyList.map((buddy, i) =>
                        (
                            <li onClick={() => handleClick(buddy)} key={i}>
                                <BuddyItem info={buddy} />
                            </li>
                        )
                    )
                }
            </ul>
        </div>
    );
};

export default BuddyList;