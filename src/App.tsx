
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom'
import { BrowserRouter , Route , Switch} from "react-router-dom"
import { Room } from './pages/Room'
import {createContext} from 'react'

import {AuthContextProvider} from './contexts/AuthContext'

type User = {
  id: string;
  name: string;
  avatar: string;

}

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);

function App() {

  
  
  
  return ( 
    <BrowserRouter>

     <AuthContextProvider>
       
       <Switch> 
         <Route path='/' exact component={Home}/>
        <Route path='/rooms/new' component={NewRoom}/>
        <Route path='/rooms/:id'  component={Room}/>
      </Switch>
        
      </AuthContextProvider>

    </BrowserRouter>
  )
    
  
}

export default App;
