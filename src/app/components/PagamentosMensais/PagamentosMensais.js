import {Component} from 'react';
import Axios from '../../Axios.js';
import Exit from '../../Exit.js';
import Seta_direita from "../../icones/seta.png";
import Seta_esquerda from "../../icones/seta-esquerda.png";
import Seta_direita_dupla from "../../icones/seta-direita-dupla.png";
import Seta_esquerda_dupla from "../../icones/seta-esquerda-dupla.png";

export default class PagamentosMensais extends Component{
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
    pesquisa_pagamentos(mes_, ano_){
        Axios.post('api/pagamentosmes', {mes: mes_, ano:ano_}
        ).then( res => {
            if(res.data.data === '1' || res.data.data === 'Usuário não autenticado'){
                Exit()
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
                for(var i=this.state.indexador; i< repetidor; i++){
                   this.lista.push(<div key={(res.data.data[2])[i]+(res.data.data[0])[i]} className='enc p'> <h3 className='n'>{(res.data.data[2])[i]}</h3> <h3 className='v'>R$ {(res.data.data[1])[i]}</h3> <h3 className='n'>{(res.data.data[0])[i]}</h3> </div>)
                }
                this.setState({resultado: this.lista})
            }
        })
        .catch( error  => {

        })
    }
    trocar1(m){
        this.setState({mes: m})
        this.pesquisa_pagamentos(m, this.state.ano)
    }
    trocar2(a){
        this.setState({ano: a})
        this.pesquisa_pagamentos(this.state.mes, a)
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
                    this.lista.push(<div key={(data[2])[i]+i} className='enc p'> <h3 className='n'>{(data[2])[i]}</h3> <h3 className='v'>R$ {(data[1])[i]}</h3> <h3 className='n'>{(data[0])[i]}</h3> </div>)
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
                this.lista.push(<div key={(data[2])[i]+i} className='enc p'> <h3 className='n'>{(data[2])[i]}</h3> <h3 className='v'>R$ {(data[1])[i]}</h3> <h3 className='n'>{(data[0])[i]}</h3> </div>)
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
                this.lista.push(<div key={(data[2])[i]+i} className='enc p'> <h3 className='n'>{(data[2])[i]}</h3> <h3 className='v'>R$ {(data[1])[i]}</h3> <h3 className='n'>{(data[0])[i]}</h3> </div>)
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
                this.lista.push(<div key={(data[2])[i]+i} className='enc p'> <h3 className='n'>{(data[2])[i]}</h3> <h3 className='v'>R$ {(data[1])[i]}</h3> <h3 className='n'>{(data[0])[i]}</h3> </div>)
            }
            this.setState({resultado: this.lista})
            this.setState({voltar_final: false})
        }
    }
    render(){
        return(
            <div className="clientes_achados">
                <div className="titulo_pesquisa">
                    <h1 id="list">Pagamentos de</h1>
                    <select className='meses' value={this.state.mes} onChange={(event) => this.trocar1(event.target.value)}>
                        <option value='01'>Janeiro</option>
                        <option value='02'>Fevereiro</option>
                        <option value='03'>Março</option>
                        <option value='04'>Abril</option>
                        <option value='05'>Maio</option>
                        <option value='06'>Junho</option>
                        <option value='07'>Julho</option>
                        <option value='08'>Agosto</option>
                        <option value='09'>Setembro</option>
                        <option value='10'>Outubro</option>
                        <option value='11'>Novembro</option>
                        <option value='12'>Dezembro</option>
                    </select>
                    <select className='ano' value={this.state.ano} onChange={(event) => this.trocar2(event.target.value)}>
                        <option value='2030'>2030</option>
                        <option value='2029'>2029</option>
                        <option value='2028'>2028</option>
                        <option value='2027'>2027</option>
                        <option value='2026'>2026</option>
                        <option value='2025'>2025</option>
                        <option value='2024'>2024</option>
                        <option value='2023'>2023</option>
                        <option value='2022'>2022</option>
                        <option value='2021'>2021</option>
                        <option value='2020'>2020</option>
                        <option value='2019'>2019</option>
                        <option value='2018'>2018</option>
                        <option value='2017'>2017</option>
                        <option value='2016'>2016</option>
                        <option value='2015'>2015</option>
                        <option value='2014'>2014</option>
                        <option value='2013'>2013</option>
                        <option value='2012'>2012</option>
                        <option value='2011'>2011</option>
                        <option value='2010'>2010</option>
                        <option value='2009'>2009</option>
                        <option value='2008'>2008</option>
                        <option value='2007'>2007</option>
                        <option value='2006'>2006</option>
                        <option value='2005'>2005</option>
                        <option value='2004'>2004</option>
                        <option value='2003'>2003</option>
                        <option value='2002'>2002</option>
                        <option value='2001'>2001</option>
                        <option value='2000'>2000</option>
                        <option value='1999'>1999</option>
                        <option value='1998'>1998</option>
                        <option value='1997'>1997</option>
                        <option value='1996'>1996</option>
                        <option value='1995'>1995</option>
                        <option value='1994'>1994</option>
                        <option value='1993'>1993</option>
                        <option value='1991'>1991</option>
                        <option value='1990'>1990</option>
                        <option value='1989'>1989</option>
                        <option value='1988'>1988</option>
                    </select>
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