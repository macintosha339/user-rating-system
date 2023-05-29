import React from 'react';
import { UserList } from './modules/UserList';
import { RatedUserList } from './modules/RatedUserList';
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
