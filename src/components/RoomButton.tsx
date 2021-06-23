import { type } from 'os';
import copyImg from '../assets/img/copy.svg';
import '../styles/scss/room-btn.scss'

type RoomCodeProps = {
    code: string;
}

export function RoomButton(props:RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
    }
    return (
        <button className='room-code' onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="Copy room code" />
            </div>
            <span> Sala: {props.code} </span>
        </button>
    )
}