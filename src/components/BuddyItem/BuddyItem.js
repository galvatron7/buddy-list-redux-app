const BuddyItem = (props) => {

    const {avatar, username, firstname, lastname, status} = props.info;

    const handleClick = (event) => {
        event.preventDefault();
    };

    return(
            <div className="block">
                <img className="block-img" src={`../img/${avatar}`} />
                <div className="block-detail">
                    <a className="block-header" href="" onClick={handleClick} >
                        <span>{username}</span>
                    </a>
                    <div className="block-min-txt">
                        <span>{firstname}</span>&nbsp;
                        <span>{lastname}</span>
                    </div>
                    <span className="block-min-txt" >{status}</span>
                </div>
            </div>
        )
};

export default BuddyItem;