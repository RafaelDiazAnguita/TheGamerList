import Link from 'next/link'
import style from '../styles/Menu.module.css'

export default function Menu() {
    return (
        <nav className={`container-fluid py-3 px-5 bg-dark ${style.header_container}`}>
            <div className='row'>
                <div className='col text-start'>
                    <Link href="/"><a className={style.header_link}>Home</a></Link>
                </div>
            </div>            
        </nav>
    );
}
