import React, {Component} from "react";
import Axios from '../../Axios.js';
import '../DRE/DRE.css';
import Exit from "../../Exit.js";
export default class DRE extends Component{
    constructor(){
        super()
        this.state = {
            ////////Data selecionada//////
            ano:'',
            mes:'',
            //////Receita/////
            receita:0,
            //////Entrada///////
            imposto_dre:0,
            custo_dre:0,
            despesas_operacionais_dre:0,
            despesas_venda_dre:0,
            depesas_financeiras_dre:0,
            despesas_administracao_dre:0,
            //////Saida//////
            receita_liquida_dre:0,
            lucro_bruto_dre:0,
            receita_financeira_dre:0,
            /////Resultado/////
            resultado_dre:0

        }
        this.pesquisa_financeira = this.pesquisa_financeira.bind(this)
        this.trocar1 = this.trocar1.bind(this)
        this.trocar2 = this.trocar2.bind(this)

    }
    componentDidMount(){
        var data = new Date();
        var mes =''
        var ano = data.getFullYear().toString()
        if(data.getMonth()< 10){
            mes = '0'+ (data.getMonth() + 1).toString()
        }
        else{
            mes = (data.getMonth() + 1).toString()
        }
        this.setState({mes:mes})
        this.setState({ano:ano})
        this.pesquisa_financeira(mes, ano)
    }
    pesquisa_financeira(m, a){
        Axios.post('api/pagamentosmes', {mes:m, ano:a}
        ).then(res => {
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            else{
                var pag =0
                for(var i=0; i< res.data.data[0].length;i++ ){
                    pag = pag + parseFloat((res.data.data[1])[i]);
                }
                this.setState({receita: pag})
            }
        })
        Axios.post("api/contasdre", {mes:m, ano:a}
        ).then(res =>{
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            if(res.data.data === '1'){
                this.setState({imposto_dre: 0})
                this.setState({custo_dre: 0})
                this.setState({despesas_operacionais_dre: 0})
                this.setState({despesas_venda_dre: 0})
                this.setState({depesas_financeiras_dre: 0})
                this.setState({despesas_administracao_dre: 0})

                this.setState({receita_liquida_dre: 0})
                this.setState({lucro_bruto_dre: 0})
                this.setState({receita_financeira: 0})
                this.setState({resultado_dre: 0})

            }
            else{
                this.setState({imposto_dre: res.data.data[0]})
                this.setState({custo_dre: res.data.data[1]})
                this.setState({despesas_operacionais_dre: res.data.data[2]})
                this.setState({despesas_venda_dre: res.data.data[3]})
                this.setState({depesas_financeiras_dre: res.data.data[4]})
                this.setState({despesas_administracao_dre: res.data.data[5]})

                var receita = this.state.receita

                this.setState({receita_liquida_dre: (receita - res.data.data[0])})
                this.setState({lucro_bruto_dre: (receita - (res.data.data[0]+res.data.data[1]))})
                this.setState({receita_financeira: (receita -(res.data.data[0]+res.data.data[1]+res.data.data[2]+res.data.data[3]+res.data.data[4]))})
                this.setState({resultado_dre: (receita -(res.data.data[0]+res.data.data[1]+res.data.data[2]+res.data.data[3]+res.data.data[4]+ res.data.data[4]))})
            }
        })
    }
    trocar1(m){
        this.setState({mes:m})
        this.pesquisa_financeira(m, this.state.ano)
    }
    trocar2(a){
        this.setState({ano:a})
        this.pesquisa_financeira(this.state.mes, a)
    }
    render(){
        return(
            <div className="dre">
                <div className="titulo_pesquisa">
                    <h1 id="list"className="tooltip-multiline" data-tooltip="Clique para selecionar o mês e o ano" >D.R.E</h1>
                    <select id='meses' value={this.state.mes} onChange={(event) => this.trocar1(event.target.value)} className="tooltip-multiline" data-tooltip="Clique para selecionar o mês">
                        <option value='01'>JANEIRO</option>
                        <option value='02'>FEVEREIRO</option>
                        <option value='03'>MARÇO</option>
                        <option value='04'>ABRIL</option>
                        <option value='05'>MAIO</option>
                        <option value='06'>JUNHO</option>
                        <option value='07'>JULHO</option>
                        <option value='08'>AGOSTO</option>
                        <option value='09'>SETEMBRO</option>
                        <option value='10'>OUTUBRO</option>
                        <option value='11'>NOVEMBRO</option>
                        <option value='12'>DEZEMBRO</option>
                    </select>
                    <select id='anos' value={this.state.ano} onChange={(event) => this.trocar2(event.target.value)} className='meses'  data-tooltip="Clique para selecionar o ano" >
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
                        <option value='1992'>1992</option>
                        <option value='1991'>1991</option>
                        <option value='1990'>1990</option>
                        <option value='1989'>1989</option>
                        <option value='1988'>1988</option>
                    </select>
                    <div className="valor_rs">
                        <h1>VALOR EM R$</h1>
                    </div>
                </div>
                <div className='titulo_dre'>
                    <h1 className="entrada_rs">Receita bruta</h1>
                    <h1 className="entrada_rs2 r">R$ {this.state.receita}</h1>
                </div>
                <div className='titulo_dre2'>
                    <h1 className="saida_rs i">Impostos sobre serviço / mercadoria</h1>
                    <h1 className="saida_rs2 imp">R$ {this.state.imposto_dre}</h1>
                </div>
                <div className='titulo_dre'>
                    <h1 className="entrada_rs">Receita líquida</h1>
                    <h1 className="entrada_rs2 rl">R$ 00,00</h1>
                </div>
                <div className='titulo_dre2'>
                    <h1 className="saida_rs">Custo das mercadorias / Serviços</h1>
                    <h1 className="saida_rs2 c">R$ {this.state.custo_dre}</h1>
                </div>
                <div className='titulo_dre'>
                    <h1 className="entrada_rs">Lucro bruto</h1>
                    <h1 className="entrada_rs2 lb">R$ 00,00</h1>
                </div>
                <div className='titulo_dre2'>
                    <h1 className="saida_rs">Despesas operaionais</h1>
                    <h1 className="saida_rs2 do">R$ {this.state.despesas_operacionais_dre}</h1>
                </div>
                <div className='titulo_dre2'>
                    <h1 className="saida_rs">Despesas com vendas</h1>
                    <h1 className="saida_rs2 dv">R$ {this.state.despesas_venda_dre}</h1>
                </div>
                <div className='titulo_dre2'>
                    <h1 className="saida_rs">Despesas financeiras</h1>
                    <h1 className="saida_rs2 df">R$ {this.state.depesas_financeiras_dre}</h1>
                </div>
                <div className='titulo_dre'>
                    <h1 className="entrada_rs">Receita financeira</h1>
                    <h1 className="entrada_rs2 rf">R$ 00,00</h1>
                </div>
                <div className='titulo_dre2'>
                    <h1 className="saida_rs">Despesas de administração</h1>
                    <h1 className="saida_rs2 da">R$ {this.state.despesas_administracao_dre}</h1>
                </div>
                <div className='resultado_positivo_dre'>
                    <h1 className="resultado_rs">Lucro líquido</h1>
                    <h1 className="resultado_rs2 ll">R$ {this.state.resultado_dre}</h1>
                </div>
            </div>
        )
    }
}