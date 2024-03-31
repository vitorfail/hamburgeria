
import React, {Component} from 'react';
import Barralateral from '../components/Barralateral/Barralateral';
import BarradePesquisa from '../components/BarradePesquisa/BarradePesquisa';
import Blocos from '../components/Blocos/Blocos'
import Loading from '../components/Loading/Loading';
import RPag from '../components/RPag/RPag';
import Coockie from '../components/Coockie/Coockie';
import Axios from '../Axios';


export default class PagRanking extends Component{
    constructor(){
        super()
        this.state = {
            politicas:true,
            isLoading: true,
            numero_clientes:  'Sem clientes',
            aniversariantes: '0',
            valor_do_mes: 'R$ 0,00',
        }
        this.pesquisar_politicas = this.pesquisar_politicas.bind(this)
    }
    componentDidMount(){
        
       this.pesquisar_politicas()
    }
    pesquisar_politicas(){
        Axios.post('api/politicasprivacidade')
        .then(res => {
            if(res.data.data === '2'){
                
            }
            else{
                if(res.data.data === true){
                    this.setState({politicas: true})
                }
                if(res.data.data === false){
                    this.setState({politicas: false})
                }
                this.setState({isLoading: false})
            }
        })
    }
    render(){
        return(this.state.isLoading? <Loading></Loading>: <div>
                <Barralateral></Barralateral>
                <div className="barra">
                    <BarradePesquisa></BarradePesquisa>
                    <div className="conteudo">
                        <Blocos numero_clientes={this.state.numero_clientes} aniversariantes={this.state.aniversariantes} valor_do_mes={this.state.valor_do_mes}></Blocos>
                        <div className="conteudo-2">
                            <RPag></RPag>
                        </div>
                    </div>
                </div>
                <Coockie politicas={this.state.politicas}></Coockie>
            </div>
        )
    }
}