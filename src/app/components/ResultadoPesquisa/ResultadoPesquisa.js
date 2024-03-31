import React, {Component} from "react";
import Axios from "../../Axios.js";
import '../ResultadoPesquisa/ResultadoPesquisa.css'
import Zap from "../../icones/whats_branco.png";
import ModalPagamentos from "../ModalPagamentos/ModalPagamentos.js";
import ModalEditar from "../ModalEditar/ModalEditar.js";
import ModalExcluir from "../ModalExcluir/ModalExcluir.js";
import Seta_direita from "../../icones/seta.png";
import Seta_esquerda from "../../icones/seta-esquerda.png";
import Seta_direita_dupla from "../../icones/seta-direita-dupla.png";
import Seta_esquerda_dupla from "../../icones/seta-esquerda-dupla.png";
export default class ResultadoPesquisa extends Component{
    constructor(props){
        super(props)
        this.lista =[];
        this.state = {
            dados:[],
            restultado: [],
            //////O número de clientes achados que aparece no topo da pagina 
            numero: 0,
            pagamentos_mostrar: "modal-pag",
            editar_mostrar: "modal-editar",
            excluir_mostrar: "modal-excluir",
            cadastro: '0',
            nome: '',
            indexador:0,
            quantidade:50,
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
        this.adiantar_final = this.adiantar_final.bind(this)
        this.voltar = this.voltar.bind(this);
        this.resultado = this.resultado.bind(this);
        this.abrir_pagamentos = this.abrir_pagamentos.bind(this)
        this.abrir_editar = this.abrir_editar.bind(this)
        this.abrir_excluir = this.abrir_excluir.bind(this)
        this.adiantar = this.adiantar.bind(this)
        this.voltar_final = this.voltar_final.bind(this)
    }
    abrir_pagamentos(id, name){
        this.setState({pagamentos_mostrar: "modal-pag mostrar"})
        this.setState({cadastro: id})
        this.setState({nome: name})
    }
    show_pag(visivel){
        this.setState({ pagamentos_mostrar: visivel })
    }
    show_editar(visivel){
        this.setState({ editar_mostrar: visivel })
    }
    abrir_editar(id){
        this.setState({cadastro: id})
        this.setState({editar_mostrar: "modal-editar mostrar"})
    }
    abrir_excluir(id){
        this.setState({cadastro: id})
        this.setState({excluir_mostrar: "modal-excluir mostrar"})
    }
    show_excluir(visivel){
        this.setState({excluir_mostrar: visivel})
    }
    falar_whats(telefone){
        if(telefone === "Sem número" || telefone === "Semnúmero"){
            alert("Esse cliente não possui número cadastrado. Adicione um número ao cadastro do cliente e tente denovo")
        }
        else{
            var link = "http://api.whatsapp.com/send?1=pt_BR&phone=55"+telefone.replace("(", '').replace(")", '').replace(" ", '').replace("-", '')
            window.open(link)    
        }
    }
    resultado(){
        Axios.post("api/pesquisa", 
        {nome: this.props.nomepesquisa}
        ).then(res => {
            if(res.data.data === '0' || res.data.data === '2' || res.data.data === '1'){
                this.setState({numero: 0})
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
                for(var i=this.state.indexador; i< repetidor ; i++){
                    var ident = (res.data.data[0])[i]
                    if((res.data.data[2])[i].length > 31){
                        this.lista.push(<div key={(res.data.data[1])[i]+i} className='enc'> 
                                            <h3 className='n'>{(res.data.data[1])[i]}</h3>
                                            <div className='email_caixa'> 
                                                <h3 id='e'>{(res.data.data[2])[i].substr(0, 29)}</h3> 
                                                <h3  id='e'>{(res.data.data[2])[i].substr(29, (res.data.data[2])[i].length-29)} </h3> 
                                            </div> 
                                            <h3 className='tel'>{(res.data.data[3])[i]}</h3> 
                                            <h3 className='sex'>{(res.data.data[4])[i]}</h3> 
                                            <div className='quadro_botoes'> 
                                                <button className='pag' id={ident} name={(res.data.data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                                <button id={(res.data.data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                                <button id={(res.data.data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                                <button className='falar' id={(res.data.data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp"/></button>
                                            </div>
                                        </div>)
                    }
                    else{
                        this.lista.push(<div key={(res.data.data[1])[i]+i} className='enc'> 
                                            <h3 className='n'>{(res.data.data[1])[i]}</h3> 
                                            <h3 id='e'>{(res.data.data[2])[i]}</h3> 
                                            <h3 className='tel'>{(res.data.data[3])[i]}</h3> 
                                            <h3 className='sex'>{(res.data.data[4])[i]}</h3> 
                                            <div className='quadro_botoes'>
                                                <button className='pag' id={ident} name={(res.data.data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                                <button id={(res.data.data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                                <button id={(res.data.data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                                <button className='falar' id={(res.data.data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp"/></button>
                                            </div>
                                        </div>)
                                                
                    }

                }
                this.setState({resultado: this.lista})
            }
        })
        .catch(error =>{

        })
    }  
    componentDidMount(){
        this.resultado();
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
                    var ident = (data[0])[i]            
                    if((data[2])[i].length> 31){
                        this.lista.push(<div key={(data[1])[i]+i} className='enc'> 
                                            <h3 className='n'>{(data[1])[i]}</h3>
                                            <div className='email_caixa'> 
                                                <h3 id='e'>{(data[2])[i].substr(0, 29)}</h3> 
                                                <h3  id='e'>{(data[2])[i].substr(29, (data[2])[i].length-29)} </h3> 
                                            </div> 
                                            <h3 className='tel'>{(data[3])[i]}</h3> 
                                            <h3 className='sex'>{(data[4])[i]}</h3> 
                                            <div className='quadro_botoes'> 
                                                <button className='pag' id={ident} name={(data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                                <button id={(data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                                <button id={(data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                                <button className='falar' id={(data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp"/></button>
                                            </div></div>)
                    }
                    else{
                        this.lista.push(<div key={(data[1])[i]+i} className='enc'> 
                                                <h3 className='n'>{(data[1])[i]}</h3> 
                                                <h3 id='e'>{(data[2])[i]}</h3> 
                                                <h3 className='tel'>{(data[3])[i]}</h3> 
                                                <h3 className='sex'>{(data[4])[i]}</h3> 
                                                <div className='quadro_botoes'>
                                                    <button className='pag' id={ident} name={(data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                                    <button id={(data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                                    <button id={(data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                                    <button className='falar' id={(data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp"/></button>
                                                </div>
                                            </div>)
                    }
        
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
                var ident = (data[0])[i]            
                if((data[2])[i].length> 31){
                    this.lista.push(<div key={(data[1])[i]+i} className='enc'> 
                                        <h3 className='n'>{(data[1])[i]}</h3>
                                        <div className='email_caixa'> 
                                            <h3 id='e'>{(data[2])[i].substr(0, 29)}</h3> 
                                            <h3  id='e'>{(data[2])[i].substr(29, (data[2])[i].length-29)} </h3> 
                                        </div> 
                                        <h3 className='tel'>{(data[3])[i]}</h3> 
                                        <h3 className='sex'>{(data[4])[i]}</h3> 
                                        <div className='quadro_botoes'> 
                                            <button className='pag' id={ident} name={(data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                            <button id={(data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                            <button id={(data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                            <button className='falar' id={(data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp"/></button>
                                        </div></div>)
                }
                else{
                        this.lista.push(<div key={(data[1])[i]+i} className='enc'> 
                                            <h3 className='n'>{(data[1])[i]}</h3> 
                                            <h3 id='e'>{(data[2])[i]}</h3> 
                                            <h3 className='tel'>{(data[3])[i]}</h3> 
                                            <h3 className='sex'>{(data[4])[i]}</h3> 
                                            <div className='quadro_botoes'>
                                                <button className='pag' id={ident} name={(data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                                <button id={(data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                                <button id={(data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                                <button className='falar' id={(data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp"/></button>
                                            </div>
                                        </div>)
                }
    
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
                var ident = (data[0])[i]            
                if((data[2])[i].length> 31){
                    this.lista.push(<div key={(data[1])[i]+i} className='enc'> 
                                        <h3 className='n'>{(data[1])[i]}</h3>
                                        <div className='email_caixa'> 
                                            <h3 id='e'>{(data[2])[i].substr(0, 29)}</h3> 
                                            <h3  id='e'>{(data[2])[i].substr(29, (data[2])[i].length-29)} </h3> 
                                        </div> 
                                        <h3 className='tel'>{(data[3])[i]}</h3> 
                                        <h3 className='sex'>{(data[4])[i]}</h3> 
                                        <div className='quadro_botoes'> 
                                            <button className='pag' id={ident} name={(data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                            <button id={(data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                            <button id={(data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                            <button className='falar' id={(data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp"/></button>
                                        </div></div>)
                }
                else{
                    this.lista.push(<div key={(data[1])[i]+i} className='enc'> 
                                            <h3 className='n'>{(data[1])[i]}</h3> 
                                            <h3 id='e'>{(data[2])[i]}</h3> 
                                            <h3 className='tel'>{(data[3])[i]}</h3> 
                                            <h3 className='sex'>{(data[4])[i]}</h3> 
                                            <div className='quadro_botoes'>
                                                <button className='pag' id={ident} name={(data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                                <button id={(data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                                <button id={(data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                                <button className='falar' id={(data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp"/></button>
                                            </div>
                                        </div>)
                }

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
                var ident = (data[0])[i]            
                if((data[2])[i].length > 31){
                    this.lista.push(<div key={(data[1])[i]+i} className='enc'> 
                                        <h3 className='n'>{(data[1])[i]}</h3>
                                        <div className='email_caixa'> 
                                            <h3 id='e'>{(data[2])[i].substr(0, 29)}</h3> 
                                            <h3  id='e'>{(data[2])[i].substr(29, (data[2])[i].length-29)} </h3> 
                                        </div> 
                                        <h3 className='tel'>{(data[3])[i]}</h3> 
                                        <h3 className='sex'>{(data[4])[i]}</h3> 
                                        <div className='quadro_botoes'> 
                                            <button className='pag' id={ident} name={(data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                            <button id={(data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                            <button id={(data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                            <button className='falar' id={(data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp" /></button>
                                        </div></div>)
                }
                else{
                    this.lista.push(<div key={(data[1])[i]+i} className='enc'> 
                                            <h3 className='n'>{(data[1])[i]}</h3> 
                                            <h3 id='e'>{(data[2])[i]}</h3> 
                                            <h3 className='tel'>{(data[3])[i]}</h3> 
                                            <h3 className='sex'>{(data[4])[i]}</h3> 
                                            <div className='quadro_botoes'>
                                                <button className='pag' id={ident} name={(data[1])[i]} onClick={(event) => this.abrir_pagamentos(event.target.id, event.target.name)}>Pagamentos</button> 
                                                <button id={(data[0])[i]} onClick={(event) => this.abrir_editar(event.target.id)} className='editar'>Editar</button> 
                                                <button id={(data[0])[i]} className='excluir' onClick={(event) => this.abrir_excluir(event.target.id)}>Excluir</button> 
                                                <button className='falar' id={(data[3])[i]} onClick={(event) => this.falar_whats(event.target.id)}>Falar<img className='zap' src={Zap} alt="Imagem de whatsapp" /></button>
                                            </div>
                                        </div>)
                }

            }
            this.setState({resultado: this.lista})
            this.setState({voltar_final: false})
        }
    }
    render(){
        return(
            <div className="clientes_achados">
                <div className="titulo_pesquisa">
                    <h1 id="list">{this.state.numero} Clientes Encontrados</h1>
                </div>
                <div className="encontrados">
                    {this.lista}
                </div>
                <div className='indexador'>
                    <img src={Seta_esquerda_dupla}className="seta" onClick={(event) => this.voltar_final()} alt="Seta"/>
                    <img src={Seta_esquerda}className="seta" onClick={(event) => this.voltar()} alt="Seta"/>
                    <p>{this.state.numerador}</p>
                    <img src={Seta_direita} className="seta" onClick={(event) => this.adiantar()} alt="Seta" />
                    <img src={Seta_direita_dupla} className="seta" onClick={(event) => this.adiantar_final()} alt="Seta"/>
                </div> 
                <ModalPagamentos id={this.state.cadastro} nome={this.state.nome} exibir={this.state.pagamentos_mostrar} executar={this.show_pag.bind(this)}></ModalPagamentos>
                <ModalEditar id={this.state.cadastro} exibir={this.state.editar_mostrar} executar={this.show_editar.bind(this)} ></ModalEditar>
                <ModalExcluir executar={this.show_excluir.bind(this)} id={this.state.cadastro} exibir={this.state.excluir_mostrar}></ModalExcluir>
            </div>
            
        )
    }
}