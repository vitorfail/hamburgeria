import React, { useState, useEffect } from 'react';
import Barralateral from '../components/Barralateral/Barralateral';
import BarradePesquisa from '../components/BarradePesquisa/BarradePesquisa';
import ResultadoAniver from '../components/ResultadoAniver/ResultadoAniver';
import Blocos from '../components/Blocos/Blocos';
import Loading from '../components/Loading/Loading';
import Coockie from '../components/Coockie/Coockie';
import Axios from '../Axios';

function Aniversariantes(){ 
    const [poli, setpoliticas] = useState(true);
    const [isLoading, setisLoading] = useState(true);
    const [numero_clientes, setnumero_clientes] = useState('Sem clientes')
    const [aniversariantes, setaniversariantes] = useState('0')
    const [valor_do_mes, setvalor_do_mes] = useState('R$ 0,00')
    useEffect(() => {
        pesquisar_politicas();
    }, [])
    function pesquisar_politicas(){
        Axios.post('api/politicasprivacidade')
        .then(res => {
            if(res.data.data === '2'){
                
            }
            else{
                if(res.data.data === true){
                    setpoliticas(true)
                }
                if(res.data.data === false){
                    setpoliticas(false)
                }
                setisLoading(false)
            }
        })
    }
    return(isLoading ? <Loading></Loading>: <div>
            <Barralateral ></Barralateral>
            <div className="barra">
                <BarradePesquisa></BarradePesquisa>
                <div className="conteudo">
                    <Blocos numero_clientes={numero_clientes} aniversariantes={aniversariantes} valor_do_mes={valor_do_mes}></Blocos>
                    <div className="conteudo-2">
                        <ResultadoAniver></ResultadoAniver>
                    </div>
                </div>
            </div>
            <Coockie politicas={poli}></Coockie>
        </div>
    )
}
export default Aniversariantes;