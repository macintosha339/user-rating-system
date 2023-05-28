import React from 'react';
import UserList  from './components/UserList';
import RatedUserList from './components/RatedUserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <UserList />
      <RatedUserList ratedUsers={[]}/>
    </div>
  );
}

export default App;
