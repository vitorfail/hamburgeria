import lista from '../../icones/list.png';
import lupa from '../../icones/pesquisa.png';
import Planilha from '../../icones/planilha.png'
import Cadastro from '../../icones/instituicao.png'
import DRE from '../../icones/reading-book _1_.png'
import Ajuda from '../../icones/settings.png'
import Sair from '../../icones/logout.png'
import React, {useState, useEffect} from "react";
import InserirNome from '../InserirNome/InserirNome';
import '../BarradePesquisa/BarradePesquisa.css';
import '../BarradePesquisa/Popup-conta.css';
import Axios from '../../Axios.js';
import Conta  from '../../icones/divida.png'
import { useRouter } from 'next/router';
import {Link} from 'next/link';


function BarradePesquisa(){
    const [abrirConta, setConta] = useState('modal-conta');
    const [abrirNome, setNome] = useState('nameclatura');
    const [nomepesquisa,setnomepesquisa]= useState('');
    const [Nome_conta, setNome_conta] = useState('');
    const [Data, setData] = useState('');
    const [Valor, setValor] = useState('');
    const [Tipo, setTipo] = useState('impostos');
    const [menu, setmenu] = useState('balao');
    const [preencha, setpreencha] = useState('preencha');
    const [titulo, settitulo] = useState("");
    const history = useRouter();


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
                } 
            }
        )
        .catch(error => {
        })
    }
    const troca = () => {
        Axios.post('api/inserircontas', 
        {   val: parseFloat((Valor.replace('R$', '')).replace('.', '').replace(',', '.')), 
            vencimento: Data, 
            conta:Nome_conta, tipo: Tipo})
        .then( res => {
            if(Nome_conta === '' ||  Data === '' ||    Valor === ''){
                setpreencha("preencha mostrar")
            }
            else{
                if(res.data.data === '1'){
                    setConta('modal-conta');
                }
                if(res.data.data === 'Usuário não autenticado'){
                    alert("Não foi possível inserir essa conta. Cheque sua conexão com a internet e tent novamente")
                }    
            }
        })
        .catch(error => {
            alert('Não foi possível inserir essa conta. Cheque sua conexão com a internet e tent novamente')
        })
    }
    function entrar(event){
        if(event.key === "Enter" || event.key === 13){
            pesquisa()
        }
    }
    function show(visivel){
        setNome(visivel);
    }
    function mostrar_menu(){
        if(menu === 'balao'){
            setmenu('balao mostrar')
        }
        if(menu === 'balao mostrar'){
            setmenu('balao')
        }
    }
    function mostrar_inserirnome(){
        setNome('nameclatura mostrar')
    }
    function logout(){
        localStorage.removeItem('token_jwt');
        history.push("/login")
    }
    function fechar(){
        setpreencha('preencha')
        setConta('modal-conta')
    }
    const mask = (e) =>{
        e = e.replace(/\D/g, "")
        e = e.replace(/(\d)(\d{2})$/, "$1,$2")
        e = 'R$ ' + e.replace(/(?=(\d{3})+(\D))\B/g, ".")
        setValor(e)
    }
    const pesquisa = () =>{
        if(nomepesquisa === ''){
            history.push('/pesquisa/todos');
        }
        else{
            history.push('/pesquisa/'+nomepesquisa);
        }
    }
    useEffect(() => {
        pegar_nome()

    }, [])
    return(
        <div className="cabecalho">
            <div className={menu}>
                <Link className='link' href='/graficos' ><img src={Planilha} alt="planilha"/>Planilha</Link>
                <Link className='link'  href='/cadastro'><img src={Cadastro} alt="cadastro"/>Cadastro</Link>
                <Link className='link'  href='/financeiro'><img src={DRE} alt="dre"/>DRE</Link>
                <Link className='link'href='/ajuda'  ><img src={Ajuda} alt="ajuda"/>Ajuda</Link>
                <Link className='link' href='/'  >Home</Link>
                <a className='link' onClick={() => logout()} to='/' href="/#"><img src={Sair}  alt="ajuda"/>Sair</a>
            </div>
            <div className="barra_de_pesquisa">
                <div className="pesquisa">
                    <img  className='list' onClick={() => mostrar_menu()} src={lista} alt="Lista"/>
                    <input type="text" onKeyPress={(event) => entrar(event)} onChange={(event) => setnomepesquisa(event.target.value)} name="c-pesquisa" placeholder="Pesquise...."/>
                    <div onClick={(event) => pesquisa()} className='p' ><img src={lupa} alt=""/></div>
                </div>
                <div className="user">
                    <div  className="btn"  onClick={() => setConta('modal-conta mostrar')} >Adicionar Conta</div>
                    <div className="usuario" onClick={() => mostrar_inserirnome()}>
                        <h1 className='nome_de_usuario'>{titulo}</h1>
                    </div>
                </div>
            </div>
            <InserirNome mostrar = {abrirNome}  executar={show.bind(this)}>
            </InserirNome>
            <div className={abrirConta}>
                <div className="modal">
                    <img src={Conta} width="50px" height="50px" alt='Conta'/>
                    <h2>Divida</h2>
                    <p className={preencha}>Preencha todos os dados</p>
                    <div className="entrada">
                        <h3>Tipo de Conta</h3>
                        <input type="tex" className = "contas" onChange={(event) => setNome_conta(event.target.value)} placeholder="Água, luz, energia.."/>
                        <h3>Vencimento</h3>
                        <input type="date" onChange={(event) => setData(event.target.value)} className = "data"/>
                        <h3>Valor</h3>
                        <input type="tex" value={Valor} onChange={(event) => mask(event.target.value)} placeholder="00,00" className = "valor"/>
                        <h3>Tipo</h3>
                        <select className='tipo' onChange={(event) => setTipo(event.target.value)}>
                            <option value='imposto'>Impostos</option>
                            <option value='custo'>Custo das mercadorias/serviços</option>
                            <option value='despesas-operacionais'>Despesas operacionais</option>
                            <option value='despesas-venda'>Despesas com venda</option>
                            <option value='depesas-financeiras'>Despesas financeiras</option>
                            <option value='despesas-administracao'>Despesas de administração</option>
                        </select>
                    </div>
                    <div className="botoes">
                        <div className="botao-sim">
                            <button className="sim" name="sim" value="Sim" onClick={(event) => troca()} >Salvar</button>
                        </div>
                        <div className="botao-nao">
                            <button className="nao" name="nao" value="Não" onClick={() => fechar()}>Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BarradePesquisa;