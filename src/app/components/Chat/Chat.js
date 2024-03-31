import React, { useState } from "react";
import "./Chat.css"
import Enviar from "../../icones/enviar.png"
import axios from "axios";

export default function Chat(){
    const [stylemodal, setstylemodal] = useState({"height":"30px"})
    const [aparecer, setaparecer] = useState(false)
    const [conversa, setconversa] = useState('')
    const [conversa_enviada, setconversa_enviada] = useState('')

    //const manager = new NlpManager({ languages: ['pt'], forceNER: true });
    // Adds the utterances and intents for the NLP
    //manager.addDocument('pt', 'Bom dia', 'Saudacao');
    //manager.addDocument('pt', 'Boa tarde', 'Saudacao');
    //manager.addDocument('pt', 'Boa noite', 'Saudacao');
    //manager.addDocument('pt', 'Olá', 'Saudacao');
    //manager.addDocument('pt', 'oi', 'Saudacao');
    //manager.addDocument('pt', 'olá gostaria de falar', 'Saudacao');
    //manager.addDocument('pt', 'eai', 'Saudacao');
    //manager.addDocument('pt', 'eae', 'Saudacao');
    function mostrarchat(){
        if(aparecer === false){
            setstylemodal({"height":"354px"})
            setaparecer(true)
        }
        else{
            setstylemodal({"height":"30px"})
            setaparecer(false)
        }
    }
    function enviar(){
        setconversa(conversa => [...conversa, <div  key={Math.random()} className="ms enviada">
                        <div className="mensagem enviada">
                            {conversa_enviada}
                        </div>
                    </div>])
        axios.post("https://chatbot-azure.vercel.app/api/post", {coment:conversa_enviada})
        .then( res => {
            setconversa(conversa =>  [...conversa, <div key={Math.random()} className="ms recebida">
                    <div className="mensagem recebida">
                        {res.data}
                    </div>
                </div>]) 
        })
        .catch(error =>{
            console.log(error)
            setconversa(conversa => [...conversa, <div key={Math.random()} className="ms recebida">
                    <div className="mensagem recebida">
                        Não vou poder responder no momento
                    </div>
                </div>]) 

        })
                   
    }
    return(
        <div style={stylemodal} className="chat">
            <h3  onClick={() => mostrarchat()}>Mensagens</h3>
            <div  className="conteudo-chat">
                {conversa}
            </div>
            <div className="enviar">
                <input onChange={(event) => setconversa_enviada(event.target.value)} placeholder="Enviar mensagem......"></input>
                <img alt="enviar" onClick={() => enviar()} src={Enviar}></img>
            </div>
        </div>
    )
}