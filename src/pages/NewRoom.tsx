
import ilustrationImg from '../assets/img/illustration.svg'
import logoImg from '../assets/img/logo.svg'



import '../styles/scss/new-room.scss'

import {  ButtonPrimary } from '../components/ButtonPrimary'

import {Link, useHistory} from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { useAuth } from '../hooks/useAuth'

import { database } from '../services/firebase'
import { Room } from './Room'




export function NewRoom() {
    
    const history = useHistory()
    
    const { user } = useAuth(); 

    const [ newRoom , setNewRoom ]   = useState('');

    

    async function handleCreateRomm(event:FormEvent) {
        event.preventDefault()
        if(newRoom.trim() === "") {
            return;
        }
        const roomRef =  database.ref('rooms')

        const firebaseRoom =  await roomRef.push({
            title: newRoom,
            authorId: user?.id,
            
        })

        history.push(`/admin/rooms/${firebaseRoom.key}`)
        // history.push(`/rooms/${firebaseRoom.key}`)
        
    }
    return (
        <div id='page-new-room'>

            <aside>
                <img src={ilustrationImg} alt="foto capa" />
                <strong>Crie sala de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas de sua audiencia em tempo-real</p>
            </aside>

            <main>

                <div className="main-content">
                    <img src={logoImg} alt="" />
                    
                    <div>
                        <p className='teste'> Bem-vindo , {user?.name} </p>

                        <h2>Crie uma  nova sala </h2>
                    </div>

                    
                    

                    <form onSubmit={handleCreateRomm}>
                        <input 
                          type="text" 
                          placeholder='Nome da sala'
                          onChange = { event => { setNewRoom(event.target.value)}}
                          value={newRoom}
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