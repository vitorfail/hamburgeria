import React,{useState, useEffect} from "react";
import Axios from "../../Axios";
import './InserirNome.css';
import Exit from '../../Exit'

function InserirNome(props){
    const [nome_, setnome] = useState("");
    const [cnpj_, setcnpj] = useState("");
    const [endereco_, setendereco] = useState("");
    const [municipio_, setmunicipio] = useState("");
    const [uf_, setuf] = useState("");
    const [tema_, settema] = useState("");
    const [ titulo, settitulo] = useState("")

    function pegar_nome(){
        Axios.post("api/dadosuser")
        .then(res =>{
                if(res.data.data === '1'){

                }
                if(res.data.data === "Usuário não autenticado"){
                }
                else{
                    let v = String((res.data.data[1])[0]).toUpperCase()
                    settitulo(v.substring(0, 1))
                    setnome(String((res.data.data[1])[0]))
                    setcnpj(String((res.data.data[0])[0]))
                    setendereco(String((res.data.data[2])[0]))
                    setmunicipio(String((res.data.data[3])[0]))
                    setuf(String((res.data.data[4])[0]))
                    settema(String((res.data.data[5])[0]))
                } 
            }
        )
        .catch(error => {
        })
    }
    useEffect(() => {
        pegar_nome()

    }, [])

    function troca_de_tema(tema){
        if(tema === 'temapadrao'){
            let html = document.querySelector('html');
            html.className = "tema-padrao";
        }
        if(tema === 'temaazul'){
            let html = document.querySelector('html');
            html.className = "tema-azul";
        }
        if(tema === 'temalaranja'){
            let html = document.querySelector('html');
            html.className = "tema-laranja";
        }
        if(tema === 'temaroxo'){
            let html = document.querySelector('html');
            html.className = "tema-roxo";
        }
        if(tema === 'temaverde'){
            let html = document.querySelector('html');
            html.className = "tema-verde";
        }
    }
    function update(){
        Axios.post('api/atualizarusuario', { nome:nome_,  
            cnpj:cnpj_, endereco:endereco_, municipio:municipio_, uf:uf_, tema:tema_})
        .then(res => {
            if(res.data.data === '1'){
                props.executar("nameclatura")
            }
            if(res.data.data === '2'){
                alert("Não foi possível atualizar os dados do usuário. Verifique sua internet e tente denovo.")
                props.executar("nameclatura")
            }
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
        })
        .catch( erro => {
            alert("Não foi possível atualizar os dados do usuário. Verifique sua internet e tente denovo.")
            props.executar("nameclatura")
        })
    }
    return(
        <div className={props.mostrar}>
            <div className='modal'>
                <div className='caixa'>
                    <h1 className='nickname'>{titulo}</h1>
                    <h3>Nome</h3>
                    <input className='mudar-nome' value={nome_} onChange={(event) => setnome(event.target.value)} type='text'/>
                    <h3>CNPJ</h3>
                    <input className='mudar-nome' value={cnpj_} onChange={(event) => setcnpj(event.target.value)} type='text'/>
                    <h3>Endereço</h3>
                    <input className='mudar-nome' value={endereco_} onChange={(event) => setendereco(event.target.value)} type='text'/>
                    <h3>Município</h3>
                    <input className='mudar-nome' value={municipio_} onChange={(event) => setmunicipio(event.target.value)} type='text'/>
                    <h3>UF</h3>
                    <select className='mudar-nome' value={municipio_} onChange={(event) => setmunicipio(event.target.value)}>
                        <option value="ac">AC</option>
                        <option value="al">AL</option>
                        <option value="am">AM</option>
                        <option value="ap">AP</option>
                        <option value="ba">BA</option>
                        <option value="ce">CE</option>
                        <option value="df">DF</option>
                        <option value="es">ES</option>
                        <option value="go">GO</option>
                        <option value="ma">MA</option>
                        <option value="mg">MG</option>
                        <option value="ms">MS</option>
                        <option value="mt">MT</option>
                        <option value="pa">PA</option>
                        <option value="pb">PB</option>
                        <option value="pe">PE</option>
                        <option value="pi">PI</option>
                        <option value="pr">PR</option>
                        <option value="rj">RJ</option>
                        <option value="rn">RN</option>
                        <option value="ro">RO</option>
                        <option value="rr">RR</option>
                        <option value="rs">RS</option>
                        <option value="sc">SC</option>
                        <option value="se">SE</option>
                        <option value="sp">SP</option>
                        <option value="to">TO</option>
                    </select>
                    <div className='escolha-tema' value={tema_} onChange={(event) => settema(event.target.value)}>
                        <input type='radio' name='tema'  id='tema-padrao' value='temapadrao' onClick={(event) => troca_de_tema(event.target.value)}/><h2 className='padrao'>11</h2><p>Tema padrao</p>
                        <input type='radio' name='tema' id='tema-azul' value='temaazul' onClick={(event) => troca_de_tema(event.target.value)}/><h2 className='azul'>11</h2><p>Tema azul</p>
                        <input type='radio' name='tema' id='tema-roxo' value='temaroxo' onClick={(event) => troca_de_tema(event.target.value)}/><h2 className='roxo'>11</h2><p>Tema roxo</p>
                        <input type='radio' name='tema' id='tema-laranja'value='temalaranja' onClick={(event) => troca_de_tema(event.target.value)}/><h2 className='laranja'>11</h2><p>Tema laranja</p>
                        <input type='radio' name='tema' id='tema-vede'value='temaverde' onClick={(event) => troca_de_tema(event.target.value)}/><h2 className='verde'>11</h2><p>Tema verde</p>
                    </div>
                    <div className='menu_nome'>
                        <button className='mudar' onClick={() => update()}>Mudar</button>
                        <button className='fechar_nome' onClick={() => props.executar("nameclatura")}>Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default InserirNome;