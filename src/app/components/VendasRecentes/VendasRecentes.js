import React, {Component, useContext, useState} from "react";
import Axios from "../../Axios.js";
import './ClientesRecentes.css';
export default function VendasRecentes(){

        const [lsita, setlsita] = useState({})
    function atualiza_vendas(){
        Axios.post('api/ultimas_vendas'
        ).then(res =>{
            setlsita(res.data.result)
        })
    }
    useContext(()=>{
        atualiza_vendas()
    },[])
    return(
        <div  className="dados-recentes">
            <div className="clientes-recentes">
                <h2>Clientes recentes</h2>
                <Link to='/pesquisa/todos' className="ver_todos">Ver todos</Link>
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