
import ilustrationImg from '../assets/img/illustration.svg'
import logoImg from '../assets/img/logo.svg'
import googleIcon from '../assets/img/google-icon.svg'

import '../styles/scss/auth.scss'

import {  ButtonPrimary } from '../components/ButtonPrimary'

import {useHistory} from 'react-router-dom'


import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'




export function Home() {

    const history = useHistory();
    const { user , singInWithGoogle } = useAuth();

    const [ roomCode , setRoomCode] = useState('');
     async function handleCreateRoom() {
        if (!user) {
           await  singInWithGoogle()
        }
        
        history.push('/rooms/new')
    }

    async function handleJoinRoom(event:FormEvent) {
            event.preventDefault();

            if(roomCode.trim() === '') {
                return;
            }

            const roomRef = await database.ref(`rooms/${roomCode}`).get()

            if(!roomRef.exists()) {
                alert('Room does not exists')
                return;
            }

            const isRoomEnded = await database.ref(`rooms/${roomCode}/endedAt`).get()
            if(isRoomEnded.exists()) {
                alert(`Sala encerrada  as ${isRoomEnded.val()}`)
                return;
            }

            history.push(`/rooms/${roomCode}`)

    }

    return (
        <div id='page-auth'>

            <aside>
                <img src={ilustrationImg} alt="foto capa" />
                <strong>Crie sala de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas de sua audiencia em tempo-real</p>
            </aside>

            <main>
                
                <div className="main-content">
                    <img src={logoImg} alt="" />
                    <button className="create-room-btn" onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="Faça login com sua conta google" />
                        crie sua sala com o google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form action="" onSubmit={handleJoinRoom}>
                        <input 
                          type="text" 
                          placeholder='Digite o codigo da sala'
                          onChange = { event => { setRoomCode(event.target.value)}}
                          value = {roomCode}
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

    
