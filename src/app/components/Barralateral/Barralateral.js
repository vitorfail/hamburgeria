import Planilha from '../../icones/planilha.png';
import Instituicao from '../../icones/instituicao.png';
import DRE from '../../icones/reading-book _1_.png';
import Config from '../../icones/settings.png';
import Saida from '../../icones/logout.png';
import React, {useState, useEffect} from "react";
import '../Barralateral/Barralateral.css'
import {Link, useHistory} from 'react-router-dom';
export default function Barralateral(props){
    const history = useHistory();
    const [label1, setlabel1] = useState("link")
    const [label2, setlabel2] = useState("link")
    const [label3, setlabel3] = useState("link")
    const [label4, setlabel4] = useState("link")
    useEffect(() => { 
        if(props.focus === "label1"){
            setlabel1("link focus");
        }
        if(props.focus === "label2"){
            setlabel2("link focus");
        }
        if(props.focus === "label3"){
            setlabel3("link focus");
        }
        if(props.focus === "label4"){
            setlabel4("link focus");
        }
    }, [props.focus])
    function logout(){
        localStorage.removeItem('token_jwt');
        history.push("/login")
    }
    return(
        <div className="barralateral">
            <div className="nome_titulo">
                <Link  className='link' to='/'>Forwin</Link>
            </div>
            <ul>
                <Link className={label1}  to='/graficos'><img src={Planilha} alt='Planilha'/>&nbsp;<span >Planilha</span></Link>
                <Link  className={label2}   to='/cadastro' ><img src={Instituicao} alt='Instituição'/>&nbsp;<span >Cadastro</span></Link>
                <Link className={label3}  to='/financeiro' ><img src={DRE} alt='DRE'/>&nbsp;<span >DRE</span></Link>
                <Link className={label4}  to='/ajuda' ><img src={Config} alt='Config'/>&nbsp;<span >Ajuda</span></Link>
                <div className="link" onClick={() => logout()} ><img src={Saida} alt='Saida'/>&nbsp;<span>Sair</span></div>
            </ul>
        </div>
    )
}
