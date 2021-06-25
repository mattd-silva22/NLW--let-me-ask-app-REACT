import { useAuth } from "../hooks/useAuth";

import { FormEvent,  useState } from 'react'
import { useParams } from 'react-router-dom'
import logoImg from '../assets/img/logo.svg'
import { ButtonPrimary } from '../components/ButtonPrimary'
import { RoomButton} from '../components/RoomButton'


import '../styles/scss/room.scss'
import { database } from "../services/firebase";
import { QuestionBox } from "../components/QuestionBox";
import { useRoom } from "../hooks/useRoom";


type RoomParams = {
    id: string;
}





export function AdminRoom() {

    const { user } = useAuth(); 
    const [ newQuestion , setNewQuestion] = useState('')

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { roomTitle, questions} = useRoom(roomId);

    

    


    
    

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

                    <div>
                      <RoomButton code={roomId}/>
                      <ButtonPrimary>Encerrar sala</ButtonPrimary>  
                    </div>

                    
                </div>
            </header>

            <main >
                <div className="room-title">
                    <h1>Sala: {roomTitle}</h1>
                    { questions.length === 0 ? (
                        null
                    ) :  (
                        <span> {questions.length} pergunta(s)</span>
                    )}
                </div>

                
                <div className="question-list">
                    {questions.map(question => {
                    return (
                        <QuestionBox
                            key={question.id}
                            content={question.content}
                            author = {question.author}
                        />
                    )
                     })}
                </div>
                


            </main>
        </div>
    )
}