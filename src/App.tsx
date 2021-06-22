
import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom'
import { BrowserRouter , Route } from "react-router-dom"

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
        <Route path='/' exact component={Home}/>
        <Route path='/rooms/new' exact component={NewRoom}/>
      </AuthContextProvider>

    </BrowserRouter>
  )
    
  
}

export default App;
