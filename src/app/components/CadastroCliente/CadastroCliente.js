import React, {Component} from 'react';
import '.././CadastroCliente/CadastroCliente.css'
import Axios from '../../Axios.js';
import Pergunta from "../../icones/pergunta.png";
import Sucesso from '../../icones/correto.png';
import './Popup-sucesso.css';
export default class CadastroCliente extends Component{
    constructor(){
        super()
        this.state = {
            nome: '',
            data_nascimento:'',
            cpf:'',
            estado_civil: 'solteiro',
            genero:'Masculino',
            uf:'ac',
            endereco:'',
            cidade:'',
            telefone:'',
            email:'',
            notific:'',
            ModalPergunta:"modal-container",
            ModalSucess: 'modal-sucess'           
        }
        this.mostrar_pergunta = this.mostrar_pergunta.bind(this);
        this.cadastrar = this.cadastrar.bind(this);
        this.fechar_pergunta = this.fechar_pergunta.bind(this);
        this.fechar_sucess = this.fechar_sucess.bind(this);
        this.abrir_sucess = this.abrir_sucess.bind(this);
        this.mask_cpf = this.mask_cpf.bind(this);
        this.mask_data = this.mask_data.bind(this);
        this.mask_telefone = this.mask_telefone.bind(this);
    }
    cadastrar(){
        Axios.post('api/cadastrar', {
            nome_input :this.state.nome,
            data_input: this.state.data_nascimento,
            cpf_input: this.state.cpf,
            estado_civil_input:this.state.estado_civil,
            genero_input: this.state.genero,
            uf_input: this.state.uf,
            endereco_input: this.state.endereco,
            cidade_input: this.state.cidade,
            telefone_input: this.state.telefone,
            email_input: this.state.email,
            notific_input: this.state.notific
        }).then(res => {
            if(res.data.data === '1'){
                this.fechar_pergunta();
                this.abrir_sucess();
            }
            if(res.data.data === '0'){
                alert("Houve um erro e não foi possivel cadastrar");
            }
        })
        .catch(error => {

        })
    }
    mostrar_pergunta(){
        this.setState({ModalPergunta: "modal-container mostrar"});
    }
    fechar_pergunta(){
        this.setState({ModalPergunta: "modal-container"});
    }
    fechar_sucess(){
        this.setState({ModalSucess: "modal-sucess"})
    }
    abrir_sucess(){
        this.setState({ModalSucess: "modal-sucess mostrar"})
    }
    mask_cpf(e){
        e = e.replace(/\D/g, '');
        e = e.replace(/(\d)(\d{2})$/, '$1-$2');
        e = e.replace(/(?=(\d{3})+(\D))\B/g,  ".")
        return e;
    }
    mask_data(e){
        e = e.replace(/\D/g, '');
        e = e.replace(/(\d)(\d{4})$/, '$1/$2');
        e = e.replace(/^(\d{2})(\d)/, '$1/$2');
        return e;
    }
    mask_telefone(e){
        e = e.replace(/\D/g, "");
        e = e.replace(/(\d)(\d{4})$/,'$1-$2')
        e = e.replace(/^(\d{1})(\d{1})/,'($1$2) ') 
        return e;
    }
    render(){
        return(
            <div className="cadastro_de_clientes">
                <div className="cadastro">
                    <div className="box">
                        <h3>Cadastro de Clientes</h3>
                    </div>
                    <div className="dados_input">
                        <div className="dados_nome">
                            <h3>Nome</h3>
                            <input id="nome" onChange={(event) => this.setState({nome: event.target.value})} placeholder="Nome Completo" type="text"/>
                        </div>
                        <div className="dados_data-nascimento">
                            <h3>Data de Nascimento</h3>
                            <input id="data" value={this.state.data_nascimento} onChange={(event) => this.setState({data_nascimento: this.mask_data(event.target.value)})} maxLength="10" placeholder="00/00/0000"/>
                        </div>
                        <div className="dados_cpf">
                            <h3>CPF</h3>
                            <input id="cpf" value={this.state.cpf} onChange={(event) => this.setState({cpf: this.mask_cpf(event.target.value)})} maxLength="14" placeholder="000.000.000-00" className="cpf" />
                        </div>
                        <div className="dados_estado-civil">
                            <h3>Estado civil</h3>
                            <select id="estado_civil" onChange={(event) => this.setState({estado_civil: event.target.value})} className="estado">
                                <option value="solteiro">Solteiro(a)</option>
                                <option value="casado">Casado(a)</option>
                                <option value="viuva">Viuvo(a)</option>
                                <option value="divorciado">Divorciado(a)</option>
                            </select>
                        </div>
                        <div className="dados_genero">
                            <h3>Gênero</h3>
                            <select id="genero" onChange={(event) => this.setState({genero: event.target.value})} className="genero">
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                                <option value="Outros">outros</option>
                            </select>
                        </div>
                        <div className="dados_uf">
                            <h3>UF</h3>
                            <select id="uf" onChange={(event) => this.setState({uf: event.target.value})} className="uf">
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
                        </div>
                        <div className="dados_endereco">
                            <h3>Endereço</h3>
                            <input id="endereco" onChange={(event) => this.setState({endereco: event.target.value})} type="text" placeholder="Rua-Bairro, Número"/>
                        </div>
                        <div className="dados_cidade">
                            <h3>Cidade</h3>
                            <input id="cidade" onChange={(event) => this.setState({cidade: event.target.value})} type="text"/>
                        </div>
                        <div className="dados_telefone">
                            <h3>Telefone</h3>
                            <input id="telefone" maxLength={15} type="text" value={this.state.telefone} onChange={(event) => this.setState({telefone: this.mask_telefone(event.target.value)})} placeholder="(00) 00000-0000"/>
                        </div>
                        <div className="dados_email">
                            <h3>E-mail</h3>
                            <input id="email" type="email" onChange={(event) => this.setState({email: event.target.value})} placeholder="email@homail.com"/>
                        </div>
                        <div className="dados_notific">
                            <h3>Notificações</h3>
                            <textarea id="notific" onChange={(event) => this.setState({notific: event.target.value})} ></textarea>
                        </div>
                    </div>
                    <div className="btn_baixo">
                        <div className="btn_enviar">
                            <button className="enviar" onClick={this.mostrar_pergunta}>Enviar</button>
                        </div>
                        <div className="btn_limpar">
                            <button className="limpar">Limpar</button>
                        </div>
                    </div>
                </div>
                <div id="modal-fechar" className={this.state.ModalPergunta}  >
                    <div className="modal">
                        <img src={Pergunta} width="50px" height="50px" alt="Interrogação"/>
                        <h3>Quer cadastrar esse cliente?</h3>
                        <div className="botoes">
                            <div className="botao-sim">
                                <button className="sim" name="sim" value="Sim" onClick={this.cadastrar}>Sim</button>
                            </div>
                            <div className="botao-nao">
                                <button className="nao" name="nao" value="Não" onClick={this.fechar_pergunta}>Não</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="3" className={this.state.ModalSucess}>
                    <div className="modal">
                        <img src={Sucesso} alt="Deu certo"/>
                        <h3>Cliente cadastrado</h3>
                        <div className="botoes">
                            <div className="botao-sim">
                                <button className="sim" name="sim" value="Sim" onClick={this.fechar_sucess}>Ok</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}