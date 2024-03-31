
import React, {Component, useEffect, useState} from 'react';
import Barralateral from '../components/Barralateral/Barralateral';
import BarradePesquisa from '../components/BarradePesquisa/BarradePesquisa';
import Blocos from '../components/Blocos/Blocos';
import ContasdoMes from '../components/ContasdoMes/ContasdoMes';
import VendasRecentes from '../components/VendasRecentes/VendasRecentes';
import RankingPagamentos from '../components/RankingPagamentos/RankingPagamentos';
import RankingVisitas from '../components/RankingVisitas/RankingVisitas';
import Loading from '../components/Loading/Loading';
import Axios from '../Axios';
import './page.css'


export default function Home(){
    const [valor_dia, setvalor_dia] =useState(0)
    const [despesas_dia, setdespesas_dia] =useState(0)
    const [valor_mes, setvalor_mes] =useState(0)
    const [despesas_mes, setdespesas_mes] =useState(0)
    const [isLoading, setisLoading] =useState(true)
    useEffect(() =>{
        Axios.post('api/home')
        .then( res => {
            setvalor_dia(res.data.result.valor_dia)
            setdespesas_dia(res.data.result.despesas_dia)
            setvalor_mes(res.data.result.valor_mes)
            setdespesas_mes(res.data.result.despesas_mes)

        })
        .catch(error => {
            alert('Não foi possível inserir essa conta. Cheque sua conexão com a internet e tent novamente')
        })
        setisLoading(false)
    },[])
        return(isLoading ? <Loading></Loading>: <div>
                <Barralateral></Barralateral>
                <div className="barra">
                    <BarradePesquisa></BarradePesquisa>
                    <div className="conteudo">
                        <Blocos valor_dia={valor_dia} despesas_dia={despesas_dia} valor_mes={valor_mes}  despesas_mes={despesas_mes}></Blocos>
                        <div className="conteudo-2">
                            <VendasRecentes></VendasRecentes>
                            <ContasdoMes></ContasdoMes>
                            <RankingPagamentos></RankingPagamentos>
                            <RankingVisitas></RankingVisitas>
                        </div>
                    </div>
                </div>
            </div>
        )
}