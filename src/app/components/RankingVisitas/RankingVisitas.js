import React, {Component} from "react";
import Rank from '../../icones/rank1.png';
import Axios from "../../Axios.js";
import { Link } from "react-router-dom";
import './RankingVisitas.css';
export default class RankingVisitas extends Component{
    constructor(){
        super()
        this.state = {
            visitas: []
        }
        this.atualizar_visitas = this.atualizar_visitas.bind(this);
    }
    componentDidMount(){
        this.atualizar_visitas();
    }
    atualizar_visitas(){
        Axios.post('api/rankingstop', {
            passe: 'visita'
        }).then(res => {
            if(res.data.data ==='1' || res.data.data ==='2'){
                let lista = this.state.visitas.concat(<div className="cad">
                                                            <h3 className="n">Sem clientes</h3>
                                                        </div>);
                this.setState({visitas: lista});
            }
            else{
                var lista = this.state.visitas.concat(<div key={(res.data.data[0])[0]+1} className="cad">
                                                        <h3 className="n">{(res.data.data[0])[0]}</h3> 
                                                        <h3 className="t">{(res.data.data[1])[0]} Visitas</h3>
                                                    </div>);
                this.setState({visitas: lista});
                var lista1 = this.state.visitas.concat(<div key={(res.data.data[0])[1]+1} className="cad">
                                                            <h3 className="n">{(res.data.data[0])[1]}</h3> 
                                                            <h3 className="t">{(res.data.data[1])[1]} Visitas </h3>
                                                        </div>);
                this.setState({visitas: lista1});
                var lista2 = this.state.visitas.concat(<div key={(res.data.data[0])[2]+1} className="cad">
                                                            <h3 className="n">{(res.data.data[0])[2]}</h3> 
                                                            <h3 className="t">{(res.data.data[1])[2]} Visitas</h3>
                                                        </div>);
                this.setState({visitas: lista2});
                var lista3 = this.state.visitas.concat(<div key={(res.data.data[0])[3]+1} className="cad">
                                                            <h3 className="n">{(res.data.data[0])[3]}</h3> 
                                                            <h3 className="t">{(res.data.data[1])[3]} Visitas</h3>
                                                    </div>);
                this.setState({visitas: lista3});
                var lista4 = this.state.visitas.concat(<div key={(res.data.data[0])[4]+1} className="cad">
                                                            <h3 className="n">{(res.data.data[0])[4]}</h3> 
                                                            <h3 className="t">{(res.data.data[1])[4]} Visitas</h3>
                                                        </div>);
                this.setState({visitas: lista4});
            }
        }).catch(error => {
            var lista = this.state.visitas.concat(<div className="cad"><h3 className="n">Sem clientes</h3></div>);
            this.setState({visitas: lista});
        })
    }
    render(){
        return(
            <div className="ranking r2">
                <div className="clientes-recentes">
                    <h2>Ranking de visitas</h2>
                    <img src={Rank} alt="Rankings"/>
                    <Link className="ver_todos" to="/rankingsv">Ver todos</Link>
                </div>
                <div className="titulos_tabela">
                    <h3>Nomes</h3>
                    <h3>N de visitas</h3>
                </div>
                <div id='ranking_visitas'>
                    {this.state.visitas}
                </div>
            </div>
        )
    }
}