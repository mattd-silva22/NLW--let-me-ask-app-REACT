import { useEffect, useState } from "react"
import { database } from "../services/firebase";



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


export function useRoom(roomId:string) {

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
    
    return { questions , roomTitle}




}



