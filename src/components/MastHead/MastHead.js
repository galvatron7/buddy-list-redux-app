import React,{useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFire} from "@fortawesome/free-solid-svg-icons";

const MastHead = (props) => {
    const [state, setState] = useState({
        menu:[
            {label:"Item A"},
            {label:"Item B"},
            {label:"Item C"},
            {label:"Item D"},
        ]
    });

    return(
        <div className="masthead">
            <div className="logo">
                <FontAwesomeIcon icon={faFire} />
                <a href="#" className="brand">Buddys</a>
            </div>
            <nav className="nav">
                <ul>
                    {
                        state.menu.map((item, i) =>
                            <li key={i}><a href="#">{item.label}</a></li>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
};

export default MastHead;