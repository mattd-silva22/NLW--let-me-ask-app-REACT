import { ReactNode } from 'react';
import '../styles/scss/question-box.scss'


type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
        id: string;
    }

    children?: ReactNode;
}


export function QuestionBox(props:QuestionProps) {
    return (
        <div className="question">
            <p>{props.content}</p>

            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt="" />
                    <span>{props.author.name}</span>
                </div>
                <div>
                {props.children}
                </div>
            </footer>
            
        </div>
    );
}