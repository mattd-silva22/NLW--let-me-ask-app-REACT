
import ilustrationImg from '../assets/img/illustration.svg'
import logoImg from '../assets/img/logo.svg'
import googleIcon from '../assets/img/google-icon.svg'

import '../styles/scss/auth.scss'

import {  ButtonPrimary } from '../components/ButtonPrimary'

import {useHistory} from 'react-router-dom'


import { useAuth } from '../hooks/useAuth'




export function Home() {

    const history = useHistory();
    const { user , singInWithGoogle } = useAuth();

     async function handleCreateRoom() {
        if (!user) {
           await  singInWithGoogle()
        }
        
        history.push('/rooms/new')
    }

    return (
        <div id='page-auth'>

            <aside>
                <img src={ilustrationImg} alt="foto capa" />
                <strong>Crie salsa de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas de sua audiencia em tempo-real</p>
            </aside>

            <main>
                
                <div className="main-content">
                    <img src={logoImg} alt="" />
                    <button className="create-room-btn" onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="" />
                        crie sua sala com o google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form action="">
                        <input 
                          type="text" 
                          placeholder='Digite o codigo da sala'
                        />

                        <ButtonPrimary type="submit">
                            Entre em uma sala
                        </ButtonPrimary>
                    </form>

                </div>
            </main>

            



        </div>
    )
    
   
    }

    
