import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import StateTask from './stateTask';
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={StateTask}/>
        {/* <Route path="/" component={myContext}/> */}
      </Switch>
    </BrowserRouter>
  );
}
export default App;