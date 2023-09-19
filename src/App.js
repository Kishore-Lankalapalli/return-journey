import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Registration from './components/RegistrationPage'
import GreenlightRedlight from './components/GreenlightRedlight'

import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Registration} />
      <Route exact path="/game" component={GreenlightRedlight} />
    </Switch>
  </BrowserRouter>
)

export default App
