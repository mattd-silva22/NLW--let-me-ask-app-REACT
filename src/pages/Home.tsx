
import ilustrationImg from '../assets/img/illustration.svg'
import logoImg from '../assets/img/logo.svg'
import googleIcon from '../assets/img/google-icon.svg'

import '../styles/scss/auth.scss'

export function Home() {
    return (
        <div id='page-auth'>

            <aside>
                <img src={ilustrationImg} alt="foto capa" />
                <strong>Crie salsa de Q&amp;A ao-vivo</strong>
                <p>Tire as duvidas de sua audiencia em tempo-real</p>
            </aside>

            <main>
                <div>
                    <img src={logoImg} alt="" />
                    <button>
                        <img src={googleIcon} alt="" />
                        crie sua sala com o google
                    </button>

                    <div> ou entre em uma sala</div>

                    <form action="">
                        <input 
                          type="text" 
                          placeholder='Digite o codigo da sala'
                        />

                        <button type='submit'>
                            entrar na sala 
                        </button>
                    </form>

                </div>
            </main>

            



        </div>
    )
}