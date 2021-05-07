import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import './App.css';

import UsersReactQuery from './features/react-query/'
import UsersReduxToolkit from './features/redux-toolkit/'
import UsersRedux from './features/redux/'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/react-query">React Query (Hook)</Link></li>
            <li><Link to="/redux">Redux (Global)</Link></li>
            <li><Link to="/redux-toolkit">Redux Toolkit (Global)</Link></li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/"><UsersReactQuery /></Route>
            <Route path="/react-query"><UsersReactQuery /></Route>
            <Route path="/redux"><UsersRedux /></Route>
            <Route path="/redux-toolkit"><UsersReduxToolkit /></Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App
