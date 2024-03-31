import React, {Component} from "react";
import './ModalPagamentos.css'
import './loading.scss'
import Axios from "../../Axios.js";
import pdf from '../../icones/pdf.png'
import jsPDF from "jspdf";
import Exit from "../../Exit"; 
export default class ModalPagamentos extends Component{
    constructor(props){
        super(props)
        this.state = {
            nome:'',


            pagamentos_mostrar: this.props.exibir,
            preferido: 'Nenhum',
            ranking_pag: "Sem pagamentos",
            resultado: [],
            novo_pag: 'novo-input',
            preencha: 'preencha',
            valor_novo_input: '',
            data_novo_input: '',
            tipo_novo_input: '',
            procedimento_novo_input:'',
            loading:'loading'
        }
        this.pesquisar_pagamentos = this.pesquisar_pagamentos.bind(this)
        this.modal_novo_pagamento = this.modal_novo_pagamento.bind(this)
        this.inserir_novoPagamento = this.inserir_novoPagamento.bind(this)
        this.mascara_valor = this.mascara_valor.bind(this)
        this.fecharmodal = this.fecharmodal.bind(this)
        this.gerar_nota = this.gerar_nota.bind(this)
    }
    componentWillReceiveProps(props){
        this.pesquisar_pagamentos(props.id)
    }
    fecharmodal(){
        this.setState({ranking_pag: "Sem pagamentos"})
        this.setState({preferido: "Nenhum"})        
        this.setState({novo_pag:'novo-input'})
        this.setState({preencha: "preencha"})
        this.props.executar('modal-pag')
    }
    modal_novo_pagamento(){
        this.setState({novo_pag:'novo-input mostrar'})
    }
    pesquisar_pagamentos(ident){
        Axios.post('api/pagamentos', {id: ident}
        ).then(res => {
            if(res.data.data === 'Usuário não autenticado'){
                Exit()
            }
            if(res.data.data === '1' || res.data.data === '2'){
                this.setState({resultado: <h3 className="s-pag">Sem pagamentos encontrados</h3>})
                this.setState({preferido: "Nenhum"})
                this.state({ranking_pag: "Sem pagamentos"})
            }
            else{
                var debito = 0;
                var credito = 0;
                var credito_p = 0;
                var avista = 0;
                var boleto = 0;
                var cheque = 0;
                var tipo_de_pagamento = ['Debito', 'Credito', 'Credito parcelado', 'A vista' , 'Boleto', 'Cheque']
                var total = [];
                this.setState({resultado: []})
                var list = []
                for(var i=0; i< (res.data.data[0]).length; i++){

                    if((res.data.data[3])[i] ==="debito"){
                        debito++;
                    }
                    if((res.data.data[3])[i] ==="credito"){
                        credito =credito+1 ;
                    }
                    if((res.data.data[3])[i] ==="credito-parcelado"){
                        credito_p++;
                    }
                    if((res.data.data[3])[i] ==="a-vista"){
                        avista++;
                    }
                    if((res.data.data[3])[i] ==="boleto"){
                        boleto++;
                    }
                    if((res.data.data[3])[i] ==="cheque"){
                        cheque++;
                    }
                    list = this.state.resultado.concat(<div key={(res.data.data[2])[i]+(res.data.data[4])[i]+i} className='pag-enc' >
                                                    <h3 className='pag-nome'>{(res.data.data[4])[i]}</h3>
                                                    <h3>{(res.data.data[1])[i]}</h3>
                                                    <h3>R$ {(res.data.data[2])[i]}</h3>
                                                    <img id={(res.data.data[2])[i]} name={(res.data.data[4])[i]} onClick={(event) => this.gerar_nota(ident, event.target.id, event.target.name)} alt="Nota" src={pdf}/>
                                                </div>)
                    this.setState({resultado: list})
                }
                total.push(debito, credito, credito_p, avista, boleto, cheque);
                var maior = Math.max.apply(null, total);
                this.setState({preferido: tipo_de_pagamento[total.indexOf(maior)]})
                this.setState({ranking_pag: "º"+res.data.data[5]+" lugar"})
            }
        })
        .catch( error => {
            this.setState({pag: <h3 className="s-pag" >Sem pagamentos encontrados. Recarrege a página</h3>})
        })
    }
    mascara_valor(e){
        e = e.replace(/\D/g, "")
        e = e.replace(/(\d)(\d{2})$/, "$1,$2")
        e = 'R$ ' + e.replace(/(?=(\d{3})+(\D))\B/g, ".")
        this.setState({valor_novo_input:e})
    }
    inserir_novoPagamento(i, name){
        var val = this.state.valor_novo_input
        val = val.replace("R$ ", "")
        val = val.replace(".", "")
        val = val.replace(",", ".")
        val = parseFloat(val)
        if(this.state.data_novo_input === ''|| val===  '' ||this.state.tipo_novo_input === '' || name === '' || this.state.procedimento_novo_inpu === ''){
            this.setState({preencha: "preencha mostrar"})
        }
        else{
            Axios.post('api/adicionarpagamento', 
            { id: i,  
            data: this.state.data_novo_input,
            valor: val,  
            tipo: this.state.tipo_novo_input,
            nome: name,
            procedimento: this.state.procedimento_novo_input}
            ).then(res => {
                if(res.data.data === 'Usuário não autenticado'){
                    Exit()
                }
                if(res.data.data === '1'){
                    this.setState({novo_pag: 'novo-input'})
                    this.pesquisar_pagamentos(i)
                }
                else{
    
                }
            })
        }
    }
    gerar_nota(id, valor_, procedimento_){
        this.setState({loading: 'loading mostrar'})
        let cnpj_vendedor = "000.0000.00000"
        let cnpj_comprador = "000.0000.00000"
        let nome_vendedor = "TRIPLEX DE NILFIGARD"
        let nome_comprador = "JOÃO DA SILVA"
        let endereco_vendedor = "Rua aparecida araujo bezerra"
        let endereco_comprador = "Rua aparecida araujo bezerra"
        let municipio_vendedor = "Recife"
        let municipio_comprador = "Recife"
        let uf_vendedor = "CE"
        let uf_comprador = "CE"
        let descriminacao = procedimento_
        let valor = String(valor_)

        let doc = new jsPDF()
        let d = new Date()
        let mes = (d.getMonth()+1).toString() 
        let mesf = (mes.length === 1) ? '0'+mes : mes;
        let data = d.getDate()+'/'+mesf+'/'+d.getFullYear()
        let hora = d.getHours()
        let minutos = d.getMinutes()
        let segundos = d.getSeconds()
        let horario = hora+':'+minutos+':'+segundos
        doc.setFont("times")
        doc.setFontSize(30);
        doc.text(75, 20, "NOTA FISCAL");
        Axios.post('api/dadosuser', {id: id}
        ).then(res => {
            if(res.data.data === 'Usuário não autenticado' || res.data.data === '2'){
                Exit()
            }
            else{
                cnpj_vendedor = res.data.data[0]
                nome_vendedor = res.data.data[1]
                endereco_vendedor = res.data.data[2]
                municipio_vendedor = res.data.data[3]
                uf_vendedor = res.data.data[4]
                Axios.post('api/pesquisainfo', {id: id}
                ).then(res => {
                    if(res.data.data === 'Usuário não autenticado' || res.data.data === '1'){
                        Exit()
                    }
                    else{
                        cnpj_comprador= res.data.data[3]
                        nome_comprador= String(res.data.data[1]).toUpperCase()
                        endereco_comprador= res.data.data[7]
                        municipio_comprador= res.data.data[8]
                        uf_comprador= String(res.data.data[6]).toUpperCase()
                        ///Barra superior//////////////////////////////////////
                        doc.setLineWidth(1); 
                        doc.line(0.5, 0.6, 209, 0.6);
                        ///Barra superior-2//////////////////////////////////////
                        doc.setLineWidth(1); 
                        doc.line(0.5, 30, 209, 30);
                        ///Barra superior-3//////////////////////////////////////
                        doc.setLineWidth(1); 
                        doc.line(0.5, 71, 209, 71);
                        ///Barra superior-4//////////////////////////////////////
                        doc.setLineWidth(0.5); 
                        doc.line(0.5, 108, 209, 108);
                        ///Barra superior-5//////////////////////////////////////
                        doc.setLineWidth(0.5); 
                        doc.line(0.5, 220, 209, 220);
                        ///Barra superior-6//////////////////////////////////////
                        doc.setLineWidth(0.5); 
                        doc.line(0.5, 229, 209, 229);        
                        ///Barra direita//////////////////////////////////////
                        doc.setLineWidth(1); 
                        doc.line(209.3, 0.2, 209.3, 350);
                        ///Barra inferior//////////////////////////////////////
                        doc.setLineWidth(1); 
                        doc.line(0.5, 296.3, 320, 296.3);
                        ///Barra esquerda//////////////////////////////////////
                        doc.setLineWidth(1); 
                        doc.line(0.7, 0.1, 0.7, 350);
                        ///Barra esquerda data//////////////////////////////////////
                        doc.setLineWidth(0.5); 
                        doc.line(160, 1, 160, 30);
                        ///Data//////////////////////////////////////////////////
                        doc.setFontSize(12);
                        doc.text(170, 16, "Data de emissão");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(170, 20, data);
                        doc.setFontSize(12);
                        doc.text(190, 20, horario);
                        ///Vendedor///////////////////////////////////////////
                        doc.setFontSize(14);
                        doc.text(95, 35, "VENDEDOR");
                        ///CNPJ Vendedor///////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 40, "CPF/CNPJ:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(30, 40, cnpj_vendedor);
                        ///Nome vendedor/////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 46, "Nome/Razão social:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(45, 46, nome_vendedor);
                        ///Endereço vendedor/////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 52, "Endereço:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(30, 52, endereco_vendedor);
                        ///Municipio vendedor/////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 58, "Município:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(30, 58, municipio_vendedor);
                        ///UF vendedor/////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(150, 58, "UF:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(158, 58, uf_vendedor);
                        ///Comprador///////////////////////////////////////////
                        doc.setFontSize(14);
                        doc.text(92, 80, "COMPRADOR");
                        ///CNPJ comprador///////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 86, "CPF/CNPJ:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(30, 86, cnpj_comprador);
                        ///Nome comprador/////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 92, "Nome/Razão social:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(45, 92, nome_comprador);
                        ///Endereço comprador/////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 98, "Endereço:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(30, 98, endereco_comprador);
                        ///Municipio comprador/////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 104, "Município:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(30, 104, municipio_comprador);
                        ///UF comprador/////////////////////////////////////////
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(150, 104, "UF:");
                        doc.setFont("times", 'bold')
                        doc.setFontSize(12);
                        doc.text(158, 104, uf_comprador);
                        ///Discriminação os serviços///////////////////////////////////////////
                        doc.setFontSize(14);
                        doc.text(70, 113, "DISCRIMINAÇÃO DOS SERVIÇOS")
                        doc.setFont("times", 'normal')
                        doc.setFontSize(14);
                        doc.text(10, 121, descriminacao)
                        ///Valor da nota///////////////////////////////////////////
                        doc.setFont("times", 'bold')
                        doc.setFontSize(14);
                        doc.text(68, 225, "VALOR TOTAL DA NOTA = R$ "+valor);
                        doc.setFontSize(14);
                        doc.text(72, 235, "OUTRAS INFORMAÇÕES");
                        doc.setFont("times", 'normal')
                        doc.setFontSize(12);
                        doc.text(10, 245, "Esse documento serve apenas para controle. Não tem valor jurídico ou legal.");


                        doc.save("notafiscal-"+data+".pdf")
                        setTimeout(() =>  this.setState({loading: 'loading'}), 800)
                    }
                })
                .catch(error => {
                    setTimeout(() =>  this.setState({loading: 'loading'}), 500)
                    alert("Não possível gerar o pdf verifique sua internet e tente denovo")        
                })        
            }
        })
        .catch(error => {
            setTimeout(() =>  this.setState({loading: 'loading'}), 500)
            alert("Não possível gerar o pdf verifique sua internet e tente denovo")
        })
    }
    render(){
        return(<div className={this.props.exibir}  >
                    <div className="modal">
                        <h2>Pagamentos de {this.props.nome}</h2>
                        <div className='pp'>
                            <h3>Tipo de Pagamento preferido:  </h3>
                            <h3 className='pref_p'>{this.state.preferido}</h3>
                        </div>
                        <div className='pp'>
                            <h3>Ranking de pagamento: </h3>
                            <h3 className='ranking_pagamento'>{this.state.ranking_pag} </h3>
                        </div>
                        <p className={this.state.preencha}>Preencha todos os dados</p>
                        <div className="pag-conteiner">
                            <div className="pag-titulo">
                                <h3>Procedimento</h3>
                                <h3>Data</h3>
                                <h3>Valor</h3>
                            </div>
                            <div className="pag-list">
                               {this.state.resultado}
                            </div>
                        </div>
                        <div className={this.state.novo_pag}>
                            <input className="submit" type='text' value={this.state.valor_novo_input}  onChange={(event) => this.mascara_valor(event.target.value)} placeholder="Valor"/>
                            <input className="submit-data" onChange={(event) => this.setState({data_novo_input:event.target.value})} type="date"/>
                            <select id="tipo" onChange={(event) => this.setState({tipo_novo_input:event.target.value})} className="from_pag">
                                <option value="debito">Débito</option>
                                <option value="credito">Crédito</option>
                                <option value="credito-parcelado">Crédito Parcelado</option>
                                <option value="a-vista">A Vista</option>
                                <option value="boleto">Boleto</option>
                                <option value="cheque">Cheque</option>
                            </select>
                            <input className='pro'  type="text" onChange={(event) => this.setState({procedimento_novo_input:event.target.value})}placeholder="Nome do procedimento"/>
                            <button className="" onClick={(event) => this.inserir_novoPagamento(this.props.id, this.props.nome)}>Inserir</button>
                        </div>
                        <div className="botoes">
                            <div className="botao-sim">
                                <button className="add" name="sim" value="Sim" onClick={this.modal_novo_pagamento}>Novo pagamento</button>
                            </div>
                            <div className="botao-nao">
                                <button className="nao" name="nao" value="Não" onClick={(event) =>this.fecharmodal()}>Fechar</button>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.loading}>
                        <div className="c-loader"></div>
                    </div>
                </div>)
    }
}