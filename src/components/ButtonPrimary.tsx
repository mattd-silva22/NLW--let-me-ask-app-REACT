
import { ButtonHTMLAttributes } from 'react'
import '../styles/scss/btn-primary.scss'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

  
export function ButtonPrimary(props:ButtonProps) {

    return (

        <button className="button-primary" {...props}/>

        
    )
}



// export default Button



