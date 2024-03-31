import {Component} from 'react';
import Axios from '../../Axios.js';
import Seta_direita from "../../icones/seta.png";
import Seta_esquerda from "../../icones/seta-esquerda.png";
import Seta_direita_dupla from "../../icones/seta-direita-dupla.png";
import Seta_esquerda_dupla from "../../icones/seta-esquerda-dupla.png";
import './RVisitas.css';

export default class RVisitas extends Component{
    constructor(){
        super()
        this.lista =[];
        this.state = {
            mes:'',
            ano:'',
            dados:[],
            resultado:0,
            indexador:0,
            quantidade:50,
            //////O número de clientes achados que aparece no topo da pagina 
            numero: 0,
            /////O numerador que mostra as paginas passando
            numerador:0,
            ////////Verifica se pode passar para proxima página///
            passador: false,
            passador_final:false,
            /////Verificação se pode voltar para aba anterior///
            voltar_final: false,
            ////O numero de paginas que vai ter/////
            pages:0

        }
        this.pesquisa_pagamentos = this.pesquisa_pagamentos.bind(this)
        this.trocar1 = this.trocar1.bind(this)
        this.trocar2 = this.trocar2.bind(this)
        this.adiantar_final = this.adiantar_final.bind(this)
        this.voltar = this.voltar.bind(this);
        this.adiantar = this.adiantar.bind(this)
        this.voltar_final = this.voltar_final.bind(this)
    }
    componentDidMount(){
        var data = new Date()
        var mes_ = 0
        var ano_ = data.getFullYear().toString()
        if(data.getMonth() < 10){
            mes_ = "0"+ (data.getMonth()+1).toString()
        }
        else{
            mes_= (data.getMonth() +1).toString()
        }
        this.setState({ano: ano_})
        this.setState({mes: mes_})
        this.pesquisa_pagamentos(mes_, ano_)
    }
    trocar1(m){
        this.setState({mes: m})
        this.pesquisa_pagamentos(m, this.state.ano)
    }
    trocar2(a){
        this.setState({ano: a})
        this.pesquisa_pagamentos(this.state.mes, a)
    }
    pesquisa_pagamentos(mes_, ano_){
        Axios.post('api/rankings', 
            { passe: "visita"}
        ).then( res => {
            if(res.data.data === '1' || res.data.data === 'Usuário não autenticado'){
                this.setState({resultado: ''})
            }
            else{
                if(res.data.data === '1'){
                    this.setState({resultado: ''})
                }
                else{
                    var repetidor = 0
                    this.setState({dados: res.data.data})
                    this.setState({numero: res.data.data[0].length})
                    this.setState({numerador: 1})
                    var verificador = res.data.data[0].length / 50
                    this.setState({pages: verificador})
                    if(this.state.numero> 50){
                        repetidor = 50
                        this.setState({passador: true})
                        this.setState({passador_final: true})
                        this.setState({voltar_final: true})
                    }
                    else{
                        repetidor = this.state.numero
                    }
                    this.lista = [] 
                    var l =0;
                    for(var i=this.state.indexador; i< repetidor; i++){
                        l++
                        this.lista.push(<div key={(res.data.data[0])[i]+i} className='enc p'> 
                                            <h3 className='r'>º{l}</h3> 
                                            <h3 className='n'>{(res.data.data[0])[i]}</h3> 
                                            <h3 className='n'>{(res.data.data[1])[i]} Visitas</h3> 
                                        </div>)
                    }
                    this.setState({resultado: this.lista})
                }
            }
        })
        .catch( error  => {
        })
    }
    adiantar(){
        if( this.state.passador === true){
            if(this.state.numero > this.state.quantidade ){
                this.setState({numerador: (this.state.numerador +1)})
                this.lista =[]
                var index = this.state.indexador + 50
                var quant = this.state.quantidade + 50
                this.setState({indexador: index})
                this.setState({quantidade: quant})
                var data = this.state.dados;
                for(var i=index; i< quant ; i++){
                    this.lista.push(<div key={(data[0])[i]+i} className='enc p'> 
                        <h3 className='r'>º{i}</h3> 
                        <h3 className='n'>{(data[0])[i]}</h3> 
                        <h3 className='n'>{(data[1])[i]} Visitas</h3> 
                    </div>)
                }
                this.setState({resultado: this.lista})
                this.setState({voltar_final: true})
                this.setState({passador_final: true})
            }
        }
    }
    voltar(){
        if(this.state.indexador !== 0){
            this.setState({numerador: (this.state.numerador -1)})
            this.lista =[]
            var index = this.state.indexador - 50
            var quant = this.state.quantidade - 50
            this.setState({indexador: index})
            this.setState({quantidade: quant})
            var data = this.state.dados;
            for(var i=index; i< quant ; i++){
                this.lista.push(<div key={(data[0])[i]+i} className='enc p'> 
                    <h3 className='r'>º{i+1}</h3> 
                    <h3 className='n'>{(data[0])[i]}</h3> 
                    <h3 className='n'>{(data[1])[i]} Visitas</h3> 
                </div>)
            }
            this.setState({resultado: this.lista}) 
            this.setState({passador_final: true})   
            this.setState({voltar_final: true})
        }
    }
    adiantar_final(){
        if( this.state.passador_final === true){
            this.setState({numerador: Math.ceil(this.state.pages)})
            this.lista =[]
            var index = (this.state.pages * 50) - 50
            var quant = this.state.pages * 50
            this.setState({indexador: index})
            this.setState({quantidade: quant})
            var data = this.state.dados;
            for(var i=index; i< quant ; i++){
                this.lista.push(<div key={(data[0])[i]+i} className='enc p'> 
                    <h3 className='r'>º{i+1}</h3> 
                    <h3 className='n'>{(data[0])[i]}</h3> 
                    <h3 className='n'>{(data[1])[i]} Visitas</h3> 
                </div>)
            }
            this.setState({resultado: this.lista})
            this.setState({passador_final: false})
            this.setState({voltar_final: true})
        }
    }
    voltar_final(){
        if( this.state.voltar_final === true){
            this.setState({numerador: 1})
            this.lista =[]
            var index = 0
            var quant = 50
            this.setState({indexador: index})
            this.setState({quantidade: 50})
            var data = this.state.dados;
            for(var i=index; i< quant ; i++){
                this.lista.push(<div key={(data[0])[i]+i}  className='enc p'> 
                    <h3 className='r'>º{i+1}</h3> 
                    <h3 className='n'>{(data[0])[i]}</h3> 
                    <h3 className='n'>{(data[1])[i]} Visitas</h3> 
                </div>)
            }
            this.setState({resultado: this.lista})
            this.setState({voltar_final: false})
        }
    }
    render(){
        return(
            <div className="clientes_achados">
                <div className="titulo_pesquisa">
                    <h1 id="list">Ranking de visitas</h1>
                </div>
                <div className="encontrados">
                    {this.state.resultado}
                </div>
                <div className='indexador'>
                    <img src={Seta_esquerda_dupla}className="seta" onClick={(event) => this.voltar_final()} alt='Voltar até o final'/>
                    <img src={Seta_esquerda}className="seta" onClick={(event) => this.voltar()} alt='Voltar'/>
                    <p>{this.state.numerador}</p>
                    <img src={Seta_direita} className="seta" onClick={(event) => this.adiantar()} alt='Adiantar'/>
                    <img src={Seta_direita_dupla} className="seta" onClick={(event) => this.adiantar_final()} alt='Adiantar até o final'/>
                </div> 
            </div>
        )
    }
}