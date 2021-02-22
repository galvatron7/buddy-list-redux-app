import actions from "../../actions/actions";
import {useDispatch, useSelector} from "react-redux";

const BuddySearch = (props) => {
    const {query} = useSelector(state => state);
    const dispatch = useDispatch();

    const filterBuddiesChange = (query) => {
        dispatch(actions.doSearch(query));
    };

    return (
        <div className="wrapper-outer">
            <div className="wrapper search">
                <input defaultValue={query}
                       onChange={(e) => filterBuddiesChange(e.target.value)}
                       className="wrapper-inner"
                       placeholder="Search"
                       type="text"/>
            </div>
            <div className="btn search">
                <button className="inner-btn">
                    <span className="btn-txt">Go</span>
                </button>
            </div>
        </div>
    )
};

export default BuddySearch;