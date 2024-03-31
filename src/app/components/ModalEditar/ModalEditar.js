import React,{Component} from "react";
import './ModalEditar.css'
import Axios from '../../Axios.js';
import Exit from "../../Exit";
export default class ModalEditar extends Component{
    constructor(props){
        super(props)
        this.state = {
            preencha: 'preencha',


            nome:"",
            data:'',
            cpf:'',
            estado_civil:'',
            genero:'',
            uf:'',
            endereco:'',
            cidade:'',
            telefone:'',
            email:'',
            notific:''
        }
        this.atualizar_cadastro = this.atualizar_cadastro.bind(this)
        this.pesquisar_cadastro = this.pesquisar_cadastro.bind(this)
        this.mask_cpf = this.mask_cpf.bind(this)
    }
    pesquisar_cadastro(ident){
        Axios.post('api/pesquisainfo', {id: ident}
        ).then(res => {
            if(res.data.data === "Usuário não autenticado"){
                Exit()
            }
            else{
                this.setState({nome: res.data.data[1]})
                this.setState({data: res.data.data[2]})
                this.setState({cpf: res.data.data[3]})
                this.setState({estado_civil: res.data.data[4]})
                this.setState({genero: res.data.data[5]})
                this.setState({uf: res.data.data[6]})
                this.setState({endereco: res.data.data[7]})
                this.setState({cidade: res.data.data[8]})
                this.setState({telefone: res.data.data[9]})
                this.setState({email: res.data.data[10]})
                this.setState({notific: res.data.data[11]})    
            }
        })
        .catch(error => {
            alert("Não foi possível pesquisar o cadastro desse cliente. Por favor tente denovo mais tarde")
        })
    }
    atualizar_cadastro(ident){       
        Axios.post('api/atualizarcadastro', {id: ident, 
            nome:this.state.nome.toString(),
            data:this.state.data.toString(),
            cpf:this.state.cpf.toString(),
            estado_civil:this.state.estado_civil.toString(),
            genero:this.state.genero.toString(),
            uf:this.state.uf.toString(),
            endereco:this.state.endereco.toString(),
            cidade:this.state.cidade.toString(),
            telefone:this.state.telefone.toString(),
            email:this.state.email.toString(),
            notific:this.state.notific.toString()}
        ).then(res =>{
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            if(res.data.data === '1'){
                this.props.executar("modal-editar")
            }
            else{
                alert("Não foi possível atualizar esses dados verifique sua internet e tente denovo")
            }
        })
        .catch( error => {

        })
    }
    componentWillReceiveProps(props){
        if(props.exibir === "modal-editar"){

        }
        if(props.exibir === "modal-editar mostrar"){
            this.pesquisar_cadastro(props.id)
        }
        
    }
    mask_cpf(e){
        e = e.replace(/\D/g, '');
        e = e.replace(/(\d)(\d{2})$/, '$1-$2');
        e = e.replace(/(?=(\d{3})+(\D))\B/g,  ".")
        return e;
    }
    render(){
        return(
            <div className={this.props.exibir}>
                <div className="modal">
                    <p className={this.state.preencha}>Informações</p>
                    <div className="info-cliente">
                        <div className= "bloco">
                            <h3>Nome</h3>
                            <input type="tex" value={this.state.nome} onChange={(event) => this.setState({nome: event.target.value})} className= "info-nome" placeholder=""/>
                        </div>
                        <div className= "bloco">
                            <h3>Data de Nascimento</h3>
                            <input type="date" value={this.state.data} onChange={(event) => this.setState({data: event.target.value})}className = "info-data"/>
                        </div>
                        <div className= "bloco">
                            <h3>CPF</h3>
                            <input type="tex" value={this.state.cpf} placeholder="000.000.000-00" onChange={(event) => this.setState({cpf: this.mask_cpf(event.target.value)})} maxLength='14'  className= "info-cpf"/>
                        </div>
                        <div className= "bloco">
                            <h3>Estado Civil</h3>
                            <select value={this.state.estado_civil} onChange={(event) => this.setState({estado_civil: event.target.value})} className="info-estado-civil">
                                <option value="solteiro">Solteiro(a)</option>
                                <option value="casado">Casado(a)</option>
                                <option value="viuvo">Viúvo(a)</option>
                                <option value="divorciado">Divorciado(a)</option>
                            </select>
                        </div>
                        <div className= "bloco">
                            <h3>Gênero</h3>
                            <select value={this.state.genero} onChange={(event) => this.setState({genero: event.target.value})} className="info-sex">    
                                <option value="m">Masculino</option>
                                <option value="f">Feminino</option>
                                <option value="o">Outros</option>
                            </select>
                        </div>
                        <div className= "bloco">
                            <h3>UF</h3>
                            <select value={this.state.uf} onChange={(event) => this.setState({uf: event.target.value})} className="info-uf">
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
                        <div className= "bloco">
                            <h3>Endereço</h3>
                            <input type="tex" value={this.state.endereco} onChange={(event) => this.setState({endereco: event.target.value})} placeholder="" className= "info-end"/>
                        </div>
                        <div className= "bloco">
                            <h3>Cidade</h3>
                            <input type="tex" value={this.state.cidade} onChange={(event) => this.setState({cidade: event.target.value})} placeholder="" className= "info-cidade"/>
                        </div>
                        <div className= "bloco">
                            <h3>Telefone</h3>
                            <input type="tex" placeholder="" value={this.state.telefone} onChange={(event) => this.setState({telefone: event.target.value})} className= "info-tel"/>
                        </div>
                        <div className= "bloco">
                            <h3>Email</h3>
                            <input type="tex" placeholder="" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})} className= "info-email"/>
                        </div>
                        <div className= "bloco">
                            <h3>Notificações</h3>
                            <textarea type="tex" placeholder="" value={this.state.notific} onChange={(event) => this.setState({notific: event.target.value})} className = "info-not"></textarea>
                        </div>
                    </div>
                    <div className="botoes">
                        <div className="botao-salvar">
                            <button className="add-info" name="sim" value="Sim" onClick={(event) => this.atualizar_cadastro(this.props.id)}>Salvar</button>
                        </div>
                        <div className="botao-fechar">
                            <button className="nao" name="nao" onClick={(event) => this.props.executar("modal-editar")} value="Não" >Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}