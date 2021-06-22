
import ilustrationImg from '../assets/img/illustration.svg'
import logoImg from '../assets/img/logo.svg'



import '../styles/scss/new-room.scss'

import {  ButtonPrimary } from '../components/ButtonPrimary'

import {Link} from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'


export function NewRoom() {

    const { user } = useAuth(); 

    return (
        <div id='page-new-room'>

            <aside>
                <img src={ilustrationImg} alt="foto capa" />
                <strong>Crie salsa de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas de sua audiencia em tempo-real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="" />
                    

                    <h2>Crie uma  nova sala {user?.name}</h2>

                    <form action="">
                        <input 
                          type="text" 
                          placeholder='Nome da sala'
                        />

                        <ButtonPrimary type="submit">
                            Criar sala
                        </ButtonPrimary>

                        <p>
                            quer entrar em uma sala existe ? <Link to="/">clique aqui</Link>
                        </p>
                    </form>

                </div>
            </main>


        </div>
    )
}