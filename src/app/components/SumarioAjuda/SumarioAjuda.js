import React, {Component} from 'react'
import './SumarioAjuda.css'

export default class SumarioAjuda extends Component{

    render(){
        return(<div className='sumario'>
            <h3 className='titulo'>Ajuda</h3>
            <h3>Sumário</h3>
            <h3 className='primeiro'>1. Barra de Pesquisa................................</h3>
            <h3 className='segundo'>1.1 Pesquisa por nome................................</h3>
            <h3 className='segundo'>1.2 Adicionar conta..................................</h3>
            <h3 className='segundo'>1.3 Mudar nome.......................................</h3>
            <h3 className='segundo'>1.4 Mudar tema.......................................</h3>
            <h3 className='primeiro'>2. Barra lateral....................................</h3>
            <h3 className='primeiro'>3. Página - Home....................................</h3>
            <h3 className='segundo'>3.1 Painel de clientes recentes......................</h3>
            <h3 className='segundo'>3.2 Painel de contas.................................</h3>
            <h3 className='segundo'>3.3 Painel de Ranking de pagamento...................</h3>
            <h3 className='segundo'>3.4 Painel de Ranking de visitas.....................</h3>
            <h3 className='primeiro'>4. Página - Planilhas...............................</h3>
            <h3 className='primeiro'>5. Página - Cadastro................................</h3>
            <h3 className='primeiro'>6. Página - DRE.....................................</h3>
            <h3 className='primeiro'>7. Página - Pesquisa................................</h3>
            <h3 className='segundo'>7.1 Janela de pagamentos.............................</h3>
            <h3 className='segundo'>7.2 Janela de editar.................................</h3>
            <h3 className='segundo'>7.3 Janela de exclusão...............................</h3>
            <h3 className='segundo'>7.3 Falar com o cliente..............................</h3>
            <h3 className='primeiro'>8. Página - Aniversariantes.........................</h3>
            <h3 className='primeiro'>9. Página - Pagamentos do mês.......................</h3>
            <h3 className='primeiro'>10. Página - Contas.................................</h3>
            <h3 className='primeiro'>11. Página - Ranking pagamento......................</h3>
            <h3 className='primeiro'>12. Página - Ranking visitas........................</h3>
            <h3 className='primeiro'>1. Barra de Pesquisa</h3>
            <p>A barra de pesquisa é um item que contém 4 funções. <strong>Pesquisa de clientes</strong>, 
            <strong>Lançamentos de contas</strong>, <strong>troca de informações do usuário</strong> 
            e <strong>troca de temas do usuário</strong>. </p>
            <h3 className='primeiro'>1.1 Pesquisa por nome</h3>
            <p>Para pesquisa o nome de um cliente é necessário digitar o nome que procura dentro da caixa de texto e apertar em "enter" ou no símbolo da lupa. Se não escrever nada 
                dentro o sistema irá mostrar todos os clientes já cadastrados até hoje. Ao pesquisar você será encaminhado para a <strong>8. Página - Pesquisa</strong> </p>
            <h3 className='primeiro'>1.2 Adicionar conta</h3>
            <p>Ao clicar no botão aparece uma pequena janela contendo a informações necessárias para poder lançar a dívida.
                 E ao ser lançado ela passa a contar na DRE. Quando lançada, por padrão, ela fica em aberto, mas esse estado pode ser alterado 
                 facilmente na <strong>3. Página - Home</strong> na janela pequena a direita clicando no seletor em azul. É importante saber que a conta só sera lançado quando preencher 
                 o nome e um valor, além de uma data. O valor R$ 00,00 tabmém é aceito. É possivel lançar um conta futura ou até mesmo retroativa. ´
                 Para ver todas as contas mês a mês e ano a ano vá em <strong>11. Página - Contas</strong></p>
            <h3 className='primeiro'>1.3 Mudar nome</h3>
            <p>Para mudar o nome é preciso apartar na letra dentro de um cículo redondo localizada no canto superior direito da barra de pesquisa.
                 A letra dentro do círculo corresponde a primeiro letra do nome que é cadastrado. E esse nopme pode ser alterado clicando no mesmo. 
                Também é possível alterar informações como cnpj, endereço e email. <strong>Atenção</strong>: As informações que são colocadas nesses campos serão a mesmas que sairam na nota fiscal então preencha elas com cuidado. </p>
            <h3 className='primeiro'>1.4 Mudar tema</h3>
            <p>Ainda na janela onde se muda as informaçõs do usário também é possivel mudar o tema do sistema. 
                Essa função é puramente estética e não muda em nada nas funções do sistema. O progrmaa dispões de 4 temas. O azul, roxo, laranja e o padrão(vermelho) </p>
            <h3 className='primeiro'>2. Barra lateral</h3>
            <p>A barra lateral só pode ser vista quando se está o programa no computado ou um tablete de tela grande.
                 Ela se localiza no lado esquerdo e por ela você pode navegar pelas páginas do sistema. Clicando no nome Forwin no canto superior esquerdo você é direcionado para a página <strong>3. Página - Home</strong> e clicando em sair você riecionado para a tela de login. Quando se está o programa no celular a barra não aparece ela é substituida um 
                 pequeno menu que pode ser acessado clicando em três linhas no canto superior esquerdo</p>
            <h3 className='primeiro'>3. Página - Home</h3>
            <p>Essa é a primeira página que aparece quando o usuário efetua o login. Ela possui três painéis para controle. É possivel acessar 
                a Home clicando em "Forwin" no canto superior da barra lateral. A página home possuiu 4 painéis e 3 blocos superiores. O bloco clientes mostra o total de 
                clientes que estão cadastrados, clicando nele você é encaminhado para a <strong>7. Página - Pesquisa</strong>. O Bloco aniversariantes mostra a quantidadde de clientes que fazem aniversário
                 no dia atual, clicando nela você é encaminhado para <strong>8. Página - Aniversariantes</strong>. O terceiro bloco mostra os pagamento recebidos no mês, clicando nele você direcionado para <strong>8. Página - Pagamentos do mês</strong>  </p>
            <h3 className='primeiro'>3.1 Painel de clientes recentes</h3>
            <p>Esse painel não pode ser usado para alterar informações. Ele ser apenas para visualização. 
                Ele mostra os clientes cadastrados recentemente. Clicando em "Ver mais", você é direcionado para <strong>8. Página - Pesquisa</strong> onde lá poderá 
                pesquisar o histórico de pagamento do cliente e mudar as informações do mesmo. Quando se clica em "Ver mais" não é aplicado nenhum filtro por tanto são mostrados todos os clientes </p>
            <h3 className='primeiro'>3.2 Painel de contas</h3>
            <p>Nesse painel é possivel verificar os vencimentos e valores das contas do mês corrente ou de outros meses, mas apenas do ano corrente. Também é possível mudara a situação de aberta para fechada e de fechada para aberta. 
                Clicando em "Ver mais" você é direcionadao para <strong>11. Página - Contas</strong> onde poderá ver as contas não só do ano corrente mas de todos os anos e meses.</p>
            <h3 className='primeiro'>3.3 Painel de Ranking de pagamento</h3>
            <p>É um painel onde não é possível alterar nada, apenas ver as pessoas que mas pagaram a empresa em valor total. Para um Crm é importante saber 
                informações e dados da atividade do cliente dentro da empresa. Quando se pesquisa um nome na página de <strong>Pesquisa</strong> além das
                também será mostrado seus ranking de pagamento. Esse ranking é feito como o valor total que o cliente já pagou, ou seja, não de um mês ou de um ano,
                 mas desde sua primeira visita. Clicando em "Ver mais" você é direcionado para a página que contém o rankign total de todos os clientes.</p>
            <h3 className='primeiro'>3.4 Painel de Ranking de visitas</h3>
            <p>Só saber o número de pagamentos de um cliente não é o suficiente para determinar sua aciduidade, pois um cliente pode ter vindo apenas uma única vez avulsa e ter feito 
                um pagamento maior do que alguém que já veio 4. Determinar e separar o clientes pela frequência na empresa é essencial. Clicando em "Ver mais" você é direcionado para página do ranking total de visitas.</p>
            <h3 className='primeiro'>4. Página - Planilhas</h3>
            <p>Essa página contém 5 gráficos. O primeiro deles divido a faixa etária de <strong>todos</strong> os clientes cadastrados em intervalo. 
            De 0 a 12 anos, por exemplo. Por esse gráfico você consegue determinar a faixa etária que sua empresa trabalha. O segundo gráfico se refere 
            apenas aos pagamentos do ano corrente. O terceiro mostra a relação do estado civil de todos os clientes já cadastrados. O 4 gráfico é um relação do sexo todos dos clientes. 
            E o quinto e último é uma relação dos tipos de pagamentos mais usados. Não dos pagamentos de um mês ou ano específico mas sim de todos os pagamentos feitos até hoje</p>
            <h3 className='primeiro'>5. Página - Cadastro</h3>
            <p>Nessa página você faz o cadastro de novos clientes. Quando se clica em salvar tem que se certificar de que preencheu os dados, pois se o campo do nome estiver vazio ele não cadastra.</p>
            <h3 className='primeiro'>6. Página - DRE</h3>
            <p>A Dre é a demonstração de resultado do mês. Porém você pode ver as demonstrações de outros meses e de outros anos. An contas são separadas em contas operacionais, administrativas e impostos. Os número 
                dessas demonstrações são tirados das contas lançadas no sistema, portanto é importante preecher as informações de maneira correta antes de lançar.</p>
            <h3 className='primeiro'>7. Página - Pesquisa</h3>
            <p>A página de pesquisa aparece quando se clica em "Ver mais" no painel de clientes recentes ou na barra de pesquisas. Essa página mostra os clientes cadastrados do mais antigo ao mais recente dividios 
                em grupos de 50. Você pode ver grupo por grupo clicando nas setinhas embaixo. Cada cliente possuiu 3 janelas.</p>
            <h3 className='primeiro'>7.1 Janela de pagamentos</h3>
            <p> É uma janela que se abre quando se clica no botão azul. Ela mostra os pagamentos efetuados pelo cliente, do mais antigo ao mais recente.
                É possivel lançar novos pagamento dentro dessa janela. Ainda dentro dela é possivel ver qual o ranking dessa pessoa em relação as visitas e aos pagamentos.
                Clicando nos ícones em formato de folha você consegue emitir "notas ficais". Elas  <strong>não tem valor jurídicos e/ou contábil.</strong> Servem apenas para controle. 
                O usuário gera elas e repassa para a contabilidade, e lá por sua vez é emitdia a nota válida.</p>
            <h3 className='primeiro'>7.2 Janela de editar</h3>
            <p>Essa janela serve para editar as informações do cliente.</p>
            <h3 className='primeiro'>7.3 Janela de exclusão</h3>
            <p>Quando se clica no botão "Excluir" ela abre perguntado se o usuário realmente deseja isso. <strong>Cuidado: Quando se clica em "Sim" os dados desse cliente serão apagados 
                permanentemente sobrando apenas seus pagamento. Os dados não poderão ser restaurados, só se você cadastrá-lo novamente</strong> </p>
            <h3 className='primeiro'>7.3 Falar com o cliente</h3>
            <p>Quando se clica no botão falar o usuário é direcionado para um nova do whatsapp web(se estiver no computador), ja no celular ele redireciona diretamente para o aplicativo. É importante saber que 
                o contado para qual o usuário será encaminhado depende do número cadastrado, então deve estar atento no momento do cadastro. O usuário só será encaminhado caso haja um número de telefone cadastrado. </p>
            <h3 className='primeiro'>8. Página - Aniversariantes</h3>
            <p>Essa é uma derivação da <strong>7. Página - Pesquisa</strong> portanto tem as mesmas funções, porém ao invés de listar todos os clientes ela lista apenas os que fazem aniversário no dia atual. </p>
            <h3 className='primeiro'>9. Página - Pagamentos do mês</h3>
            <p>É possivel acessar essa página clicando no terceiro bloco superior. Nessa página se pode olhar os pagamentos mês a mês e ano a ano.</p>
            <h3 className='primeiro'>10. Página - Contas</h3>
            <p>Essa página é acessada clicando em "Ver mais" no painel de contas da <strong>1. Página - Home</strong>. Ela mostra as contas mês a mês e ano a ano.</p>
            <h3 className='primeiro'>11. Página - Ranking pagamento</h3>
            <p>Pode ser acessado clicando em "Ver mais" no painel de Ranking da <strong>1. Página - Home</strong></p>
            <h3 className='primeiro'>12. Página - Ranking de visitas</h3>
            <p>Pode ser acessado clicando em "Ver mais" no painel de Ranking da <strong>1. Página - Home</strong></p>
            <p className='sug'>Para dúvidas, sugestões ou problemas entre em contado com o nosso email <a href='mailto:map.marketing7@gmail.com'>map.marketing7@gmail.com</a> </p>
        </div>)
    }
}