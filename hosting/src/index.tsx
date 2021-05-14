import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import useGlobalState from './context/useGlobalState';
import UserContext from './context/userContext'

const Index = () => {
  const store = useGlobalState();
  return (
    <UserContext.Provider value={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UserContext.Provider>
  )
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
 