import {Component} from 'react';
import Axios from '../../Axios.js';
import Excluir from "../.././icones/exclamacao.png";
import './ModalExcluir.css';
import Exit from '../../Exit.js';
export default class ModalExcluir extends Component{
    constructor(props){
        super(props)
        this.state = {

        }
        this.excluir_cadastro = this.excluir_cadastro.bind(this);    
    }
    excluir_cadastro(){
        Axios.post('api/deletarcliente', {id: this.props.id})
        .then(res => {
            if(res.data.data === '1' || res.data.data === 1){
                this.props.executar("modal-excluir")
            }
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            if(res.data.data !== '1'){
                alert("Não foi possível excluir esse cliente. Verifique sua internet e tente novamente")
            }
        })
        .catch( error => {
            alert("Não foi possível excluir esse cliente. Verifique sua internet e tente novamente")
        })
    }
    render(){
        return(
            <div className={this.props.exibir}>
                <div className="modal">
                    <img src={Excluir} width="50px" height="50px" alt="Excluir"/>
                    <h3>Tem certeza que quer excluir esse cliente? Ele será excluido permanentemente do banco de dados</h3>
                    <div className="botoes">
                        <div className="botao-sim">
                            <button id='confirmar-exclusao' onClick={(event) => this.excluir_cadastro()} className="sim" name="sim" value="Sim">Sim</button>
                        </div>
                        <div className="botao-nao">
                            <button className="nao" name="nao" value="Não" onClick={(event) => this.props.executar("modal-excluir")}>Não</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}