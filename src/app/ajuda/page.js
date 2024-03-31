
import React, {Component} from 'react';
import Barralateral from '../components/Barralateral/Barralateral';
import BarradePesquisa from '../components/BarradePesquisa/BarradePesquisa';
import Loading from '../components/Loading/Loading';
import Axios from '../Axios';
import Coockie from '../components/Coockie/Coockie';
import SumarioAjuda from '../components/SumarioAjuda/SumarioAjuda';
import Tema from ".././Tema"
export default class Ajuda extends Component{
    constructor(){
        super()
        this.state = {
            politicas:true,
            isLoading: true
        }
        this.pesquisar_politicas = this.pesquisar_politicas.bind(this)
    }
    componentDidMount(){
        ;
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
        return(this.state.isLoading ? <Loading></Loading>: <div> 
                <Barralateral focus={'label4'}></Barralateral>
                <div className="barra">
                    <BarradePesquisa></BarradePesquisa>
                    <div className="conteudo">
                        <div className="conteudo-2">
                            <SumarioAjuda></SumarioAjuda>
                        </div>
                    </div>
                </div>
                <Coockie politicas={this.state.politicas}></Coockie>
            </div>
        )
    }
}