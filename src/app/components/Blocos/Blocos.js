import React, {Component, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Axios from '../../Axios.js';
import '../Blocos/Blocos.css';
import Exit from "../../Exit.js";
export default function Blocos({props}){
    var valor_dia = props.valor_dia
    var despesas_dia = props.despesas_dia
    var valor_mes = props.valor_mes
    var despesas_mes = props.despesas_mes
    const [data,setdata] = useState("Dia, mes, ano")
    const [hora,sethora] = useState("00:00")

    useEffect(() => {
        data();
        hora();
    },[])
    function data(){
        var data = new Date();
        var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
        var dia_atual = data.getDate() +", "+ meses[data.getMonth()] + ', '+data.getFullYear();
        return setdata(dia_atual);
    }
    function hora(){
        var data = new Date();
        var hora = String(data.getHours());
        var minutos = String(data.getMinutes()); 
        if (hora.length === 1){
            hora = '0'+ hora;
        }
        if (minutos.length === 1){
            minutos = '0'+ minutos;
        }
        var hora_atual = hora+ ':'+ minutos;
        return sethora(hora_atual);
    }
    return(
        <div className="cards">
            <div className="card" >
                <Link className='link' to='/pesquisa/todos'></Link>
                <div className="box" >
                    <h1 id='numero-clientes'>{valor_dia}</h1>
                    <h3>Receita do dia</h3>
                </div>
                <div className="icone clientes">
                </div>
            </div>
            <div className="card">
                <Link className='link' to='/aniversariantes'></Link>
                <div className="box">
                    <h1 id="aniver">{valor_mes}</h1>
                    <h3>Receita do mês</h3>
                </div>
                <div className="icone aniver">
                </div>
            </div>
            <div className="card"  >
                <Link className='link' to='/pagamentos'></Link>
                <div className="box">
                    <h1 className='valormes'>{despesas_dia}</h1>
                    <h3>Despesas do dia</h3>
                </div>
                <div className="icone pagamentos">
                </div>
            </div>
            <div className="card-hora">
                <div className="box">
                    <h1 className='hora'>{hora}</h1>
                    <h3 className='dia'>{data}</h3>
                </div>
            </div>
        </div>
    )
}