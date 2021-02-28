import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AddUser from './components/AddUser/AddUser';
import UsersList from './components/UsersList/UserList';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/add-user' component={AddUser} />
        <Route exact path='/edit-user/:id' component={AddUser} />
        <Route exact path='/' component={UsersList} />
      </Switch>
    </Router>
  );
};

export default App;
