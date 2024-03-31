import React, {Component, useEffect, useState} from "react";
import Axios from "../../Axios.js";
import './ContasdoMes.css';
import Link from "next/link.js";
export default function ContasdoMes(){
    const [lista_contas, setlista_contas] = useState([])

    uesEffect(() => {
        window.addEventListener('load', this.atualiza);
        var data= new Date();
        var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        window.addEventListener('load', this.mudar_mes(meses[data.getMonth()]));
    },[])
    function atualiza(){
        var seletor = document.querySelector('.meses');
        var data= new Date();
        var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        seletor.value = meses[data.getMonth()];
    }
    function checar_mes(mes){
        if(mes.length === 1){
            return "0" + mes;
        }
        else{
            return mes;
        }
    }
    function mudar_mes(mes){
        var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        var data = new Date();
        var data_hoje = data.getFullYear() + '-'+ (data.getMonth()+1) + '-' + data.getDate();
        var ano = data.getFullYear();
        Axios.post('api/contaspainel', {   
            mes_query:this.checar_mes(1+ meses.indexOf(mes)), 
            dat: data_hoje,
            ano:String(ano),
            marcador: "Várias"}
        ).then(res => {
            if(res.data.data[0].length === 0 &&  res.data.data[1].length === 0 &&
                res.data.data[2].length === 0 && res.data.data[3].length === 0 &&
                res.data.data[4].length === 0 && res.data.data[5].length === 0 &&
                res.data.data[6].length === 0){
                setlista_contas([<div className="nenhum"><h3 className="negativo">Nenhuma conta este mês</h3></div>])
            }
            else{
                var ir = [];
                this.setState({ lista_contas: ir })
                for(var n =0; n < res.data.data[0].length; n++){
                    if((res.data.data[4])[n] === 'Pago'){
                        let joined = this.state.lista_contas.concat(<div className="titulos_contas"> 
                                                                        <h3>{(res.data.data[1])[n]}</h3> 
                                                                        <h3>R$ {(res.data.data[2])[n]}</h3> 
                                                                        <h3 id={(res.data.data[0])[n]} className="pago">Pago</h3> 
                                                                        <input type="checkbox" defaultChecked='true' name="checkbox" onChange={(event) => this.atualizar_conta(event.currentTarget.id, event.target.checked)} id={(res.data.data[0])[n]} className="cm-toggle blue"/> 
                                                                    </div> );   
                        this.setState({ lista_contas: joined })
                    }
                    else{
                        if((res.data.data[6])[n] >0){
                            let joined = this.state.lista_contas.concat(<div className="titulos_contas"> 
                                                                            <h3>{(res.data.data[1])[n]}</h3> 
                                                                            <h3>R$ {(res.data.data[2])[n]}</h3> 
                                                                            <h3 id={(res.data.data[0])[n]} className="em_dia"> {(res.data.data[6])[n]} Dias</h3> 
                                                                            <input type="checkbox"  name="checkbox" onChange={(event) => this.atualizar_conta(event.currentTarget.id, event.target.checked)} id={(res.data.data[0])[n]} className="cm-toggle blue"/> 
                                                                        </div> );   
                            this.setState({ lista_contas: joined })
                        }
                        if((res.data.data[6])[n] <0){
                            let joined = this.state.lista_contas.concat(<div className="titulos_contas"> 
                                                                            <h3>{(res.data.data[1])[n]}</h3> <h3>R${(res.data.data[2])[n]}</h3> 
                                                                            <h3 id={(res.data.data[0])[n]}  className="vencido">Vencida</h3> 
                                                                            <input type="checkbox" name="checkbox" onChange={(event) => this.atualizar_conta(event.currentTarget.id, event.target.checked)} id={(res.data.data[0])[n]} className="cm-toggle blue"/>
                                                                        </div>);   
                            this.setState({ lista_contas: joined })
                        }
                        if((res.data.data[6])[n] === 0){
                            var joined = this.state.lista_contas.concat(<div className="titulos_contas"> 
                                                                            <h3>{(res.data.data[1])[n]}</h3> 
                                                                            <h3>R$ {(res.data.data[2])[n]}</h3> 
                                                                            <h3 id={(res.data.data[0])[n]} className="prazo_final">Hoje</h3> 
                                                                            <input type="checkbox" name="checkbox" onChange={(event) => this.atualizar_conta(event.currentTarget.id, event.target.checked)} id={(res.data.data[0])[n]} className="cm-toggle blue"/>
                                                                        </div>);   
                            this.setState({ lista_contas: joined })
                        }
                    }
                }
            }
        })
    }
    function atualizar_conta(e, check){
        Axios.post('api/atualizarconta', {
            id: e,
            situacao: String(check)
        }).then(res => {
            if(res.data.data === '1'){
                window.location.reload();
            }
            if(res.data.data === '2'){
                alert('Não foi possível atualizar essa conta. Verifique sua internet e tente novamente')
            }
            if(res.data.data === 'Usuário não autenticado'){
                alert('Esta usuário não está autenticado, faça login e tente novamente')
            }
        })
    }
    return(
        <div className="notific">
            <div className="contas_do_mes">
                <h2>Contas do mês</h2>
                <select className="meses"  onChange={(event) => this.mudar_mes(event.target.value)}>
                    <option value='Janeiro'>Janeiro</option>
                    <option value='Fevereiro'>Fevereiro</option>
                    <option value='Março'>Março</option>
                    <option value='Abril'>Abril</option>
                    <option value='Maio'>Maio</option>
                    <option value='Junho'>Junho</option>
                    <option value='Julho'>Julho</option>
                    <option value='Agosto'>Agosto</option>
                    <option value='Setembro'>Setembro</option>
                    <option value='Outubro'>Outubro</option>
                    <option value='Novembro'>Novembro</option>
                    <option value='Dezembro'>Dezembro</option>
                </select>
                <Link className="ver_todas" href='/contas'>Ver Todas</Link>
            </div>
            <div className="t_contas">
                                    
            </div>
            <div className="lista_contas">
                {lista_contas.map((item, key) =>{
                    if(item.hasOwnProperty("valor")){
                        return    <div className="titulos_contas"> 
                                <h3>{item.nome}</h3> 
                                <h3>R$ {item.valor}</h3> 
                                <h3  className="pago">Pago</h3> 
                            </div>
                    }
                    else{
                        return item
                    }
                })}
            </div>
        </div>
    )
} 