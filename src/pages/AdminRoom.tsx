import { useAuth } from "../hooks/useAuth";

import { FormEvent,  useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import logoImg from '../assets/img/logo.svg'
import delImg from '../assets/img/delete.svg'
import checkImg from '../assets/img/check.svg'
import answerImg from '../assets/img/answer.svg'


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
 
    const history = useHistory()
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { roomTitle, questions, roomAuthorId} = useRoom(roomId);

    

    async function handleCloseRoom(roomID:string) {
        let closeDate = new Date()
        await database.ref(`rooms/${roomId}`).update({
            
            endedAt: `${closeDate.toLocaleDateString('pt-BR')}  ${closeDate.toLocaleTimeString('pt-BR')}`,
        })

        history.push('/')

    }

     async function handleDeleteQuestion(questionId: string) {
        if ( window.confirm('Tem certeza que voce deseja excluir esta pergunta')) {

            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();

        }
    }


    async function handleCheckQuestionAsAnswered(questionId:string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({isAnswered: true})
    }

    async function handleHighlightQuestion(questionId:string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({isHighlighted: true})
    }

    
    // const isUserAdmin = (user?.id === roomAuthorId);
    
    // if (!isUserAdmin )  {
    //     return
    // }


   
    

      

    


    

    


    
    

   
    return (
        
        <div id='page-room'>
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />

                    <div>
                      <RoomButton code={roomId}/>
                      <ButtonPrimary
                        onClick={()=> handleCloseRoom(roomId)}
                      >Encerrar sala</ButtonPrimary>  
                    </div>

                    
                </div>
            </header>

            

           

         
    

            <main >
                <div className="room-title">
                    <h1>Sala: {roomTitle}</h1>
                    { questions.length === 0 ? (
                        <span> {questions.length} pergunta(s)</span>
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
                            isAnswered = {question.isAnswered}
                            isHighlighted = {question.isHighlighted}
                        >
                           

                           {!question.isAnswered && (
                              <>
                                <button
                                type="button"
                                onClick={()=> handleCheckQuestionAsAnswered(question.id)}
                                >
                                    <img src={checkImg} alt="" />
                                </button>
        
        
                                
                                <button
                                type="button"
                                onClick={()=> handleHighlightQuestion(question.id)}
                                >
                                    <img src={answerImg} alt="" />
                                </button>
                             </>
                           )}

                           <button
                           type="button"
                           onClick={()=> handleDeleteQuestion(question.id)}
                           >
                               <img src={delImg} alt="" />
                           </button>
                        </QuestionBox>  



                    )
                     })}
                </div>
                


            </main>
        </div>
    )
}