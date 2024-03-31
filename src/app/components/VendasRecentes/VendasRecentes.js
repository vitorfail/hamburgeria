import React, {Component, useEffect, useState} from "react";
import Axios from "../../Axios.js";
import './VendasRecentes.css';
import Link from "next/link.js";
export default function VendasRecentes(){

        const [lista, setlista] = useState({})
    function atualiza_vendas(){
        Axios.post('api/ultimas_vendas'
        ).then(res =>{
            setlista(res.data.result.ultimas_vendas)
        })
    }
    useEffect(()=>{
        atualiza_vendas()
    },[])
    return(
        <div  className="dados-recentes">
            <div className="clientes-recentes">
                <h2>Vendas recentes</h2>
                <Link href='/pesquisa/todos' className="ver_todos">Ver todos</Link>
            </div>
            <div className="titulos_tabela">
                <h3>Nomes</h3>
                <h3>Telefones</h3>
                <h3>Sexo</h3>
            </div>
            <div className="cadastros_recentes">
                {lista.map((item,key) => (
                    <div key={key} className="cad">
                    <h3 className="n">{item.produto}</h3> 
                    <h3 className="t">{item.valor}</h3> 
                    <h3 className="s">{item.data}</h3>
                </div>
                ))}
            </div>
        </div>
    )
} 