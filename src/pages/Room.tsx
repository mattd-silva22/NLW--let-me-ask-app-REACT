// import { useAuth } from "../hooks/useAuth";

import { useParams } from 'react-router-dom'
import logoImg from '../assets/img/logo.svg'
import { ButtonPrimary } from '../components/ButtonPrimary'
import { RoomButton} from '../components/RoomButton'


import '../styles/scss/room.scss'

type RoomParams = {
    id: string;
}
export function Room() {

    // const { user } = useAuth(); 

    const params = useParams<RoomParams>();


    return (
        <div id='page-room'>
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />

                    <RoomButton code={params.id}/>
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>sala aqui</h1>
                    <span>4 perguntas</span>
                </div>

                <form >
                    <textarea 
                        placeholder="texto legal aqui"
                    />

                    <div className="form-footer">
                        <span>
                            para enviar uma pergunta <button>faça seu login</button>  
                        </span>

                        <ButtonPrimary type='submit'> Enviar pergunta</ButtonPrimary>
                    </div>

                    
                </form>


            </main>
        </div>
    )
}