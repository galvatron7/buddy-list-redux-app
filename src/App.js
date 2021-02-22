import MastHead from './components/MastHead/MastHead';
import BuddyList from './components/BuddyList/BuddyList';
import BuddyView from './components/BuddyView/BuddyView';
import BuddySearch from "./components/BuddySearch/BuddySearch";
import BuddyToolBar from './components/BuddyToolBar/BuddyToolBar';

import './App.scss';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import actions from "./actions/actions";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(actions.doSearch());
  },[]);

  return (
    <div className="app-container">
      <MastHead/>
      <div className="container">
        <div className="navigation">
          <BuddySearch/>
          <BuddyToolBar/>
          <BuddyList/>
        </div>
        <BuddyView></BuddyView>
      </div>
      <div className="footer">
        <span>
          Powered By - Shane White {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}

export default App;
