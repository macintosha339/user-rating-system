import React from 'react';
import UserList  from './components/UserList';
import RatedUserList from './components/RatedUserList';

function App() {
  return (
    <div className="App">
      <UserList users={[{
        id: 132,
        name: 'Lorem'
      }, {
        id: 23,
        name: 'ipsum'
      }]}/>
      <RatedUserList ratedUsers={[]}/>
    </div>
  );
}

export default App;
