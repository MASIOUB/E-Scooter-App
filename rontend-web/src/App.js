import React from 'react';
import './App.css';
import Auth from './components/Auth';
import Welcome from './components/Welcome';
import { addToken} from './reducers/authReducer'
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  dispatch(addToken())
  return (
    <div className="App">
      {
        token ? <Welcome /> : <Auth />
      }
    </div>
  );
}

export default App;
