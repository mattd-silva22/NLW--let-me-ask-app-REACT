import { useAuth } from "../hooks/useAuth";

import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import logoImg from '../assets/img/logo.svg'
import { ButtonPrimary } from '../components/ButtonPrimary'
import { RoomButton} from '../components/RoomButton'


import '../styles/scss/room.scss'
import { database } from "../services/firebase";
type FirebaseQuestions =    Record<string ,{
    author: {
        name: string;
        avatar: string;
        id: string;
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>
type Questions = {
    id: string;
    author: {
        name: string;
        avatar: string;
        id: string;
    }

    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
};
type RoomParams = {
    id: string;
}



export function Room() {

    const { user } = useAuth(); 
    const [ newQuestion , setNewQuestion] = useState('')

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const [questions , setQuestions] = useState<Questions[]>([])
   
    const [ roomTitle , setRoomTitle] = useState('')

    


    useEffect(()=> {
        const roomRef = database.ref(`rooms/${roomId}`);

         roomRef.on('value' , room =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

            const parsedQuestions  = Object.entries(firebaseQuestions).map( ([key , value]) =>{
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }

                
            });

            setQuestions(parsedQuestions);
            setRoomTitle(databaseRoom.title);

            
        })
    } ,[roomId])
    

    async function handleCreateNewQuestion(event:FormEvent) {
        event.preventDefault();
         if (newQuestion.trim() ==='') {
             return;
         }

         if (!user) {
             return alert('usuario nao logado')
         }

         const question = {
             content: newQuestion,
             author: {
                 name: user.name,
                 avatar: user.avatar,
                 id: user.id
             },
             isHighlighted: false,
             isAnswered: false
         };

         await database.ref(`rooms/${roomId}/questions`).push(question)

         setNewQuestion('')

         
    }
    return (
        <div id='page-room'>
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />

                    <RoomButton code={roomId}/>
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>Sala: {roomTitle}</h1>
                    { questions.length == 0 ? (
                        null
                    ) :  (
                        <span> {questions.length} pergunta(s)</span>
                    )}
                </div>

                <form onSubmit={handleCreateNewQuestion}>
                    <textarea 
                        placeholder="texto legal aqui"
                        onChange = { event => { setNewQuestion(event.target.value)}}
                        value = {newQuestion}
                    />

                    <div className="form-footer">
                        { user? (
                            <div className='user-info'>
                                <img src={user.avatar }alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>
                                para enviar uma pergunta <button>faça seu login</button>  
                            </span>
                        )
                    
                        }

                        <ButtonPrimary type='submit' disabled={!user}> Enviar pergunta</ButtonPrimary>
                    </div>

                    
                </form>


            </main>
        </div>
    )
}