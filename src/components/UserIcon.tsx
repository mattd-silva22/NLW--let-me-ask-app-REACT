
import { useAuth } from "../hooks/useAuth"

import '../styles/scss/user-icon.scss'




export function UserIcon() {

    const { user } = useAuth()

    return (
        <div className='user-icon-area'>
            <img src={user?.avatar}alt="" />
        </div>
    )




}