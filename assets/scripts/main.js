const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}


    renderizarInfoDasMoedas('nome_moeda_1', 'porcentagem_moeda_1', 'preco_moeda_1','USD',"Dólar Comercial")
    renderizarInfoDasMoedas('nome_moeda_2', 'porcentagem_moeda_2', 'preco_moeda_2','BTC',"Bitcoin")
    renderizarInfoDasMoedas('nome_moeda_3', 'porcentagem_moeda_3', 'preco_moeda_3','EUR',"Euro")
    renderizarInfoDasMoedas('nome_moeda_4', 'porcentagem_moeda_4', 'preco_moeda_4','GBP',"Libra Esterlina")
    renderizarInfoDasMoedas('nome_moeda_5', 'porcentagem_moeda_5', 'preco_moeda_5','ARS',"Peso Argentino")
    renderizarInfoDasMoedas('nome_moeda_6', 'porcentagem_moeda_6', 'preco_moeda_6','ETH',"Ethereum")
    
    
    // renderizarInfoDasMoedas('GBP');
    // renderizarInfoDasMoedas('EUR');

    //chamando a função para renderizar os graficos das moedas.
    rederizarGraficosMoedas('dolar','USD')
    rederizarGraficosMoedas('bitcoin','BTC')
    rederizarGraficosMoedas('euro','EUR')
    rederizarGraficosMoedas('libra','GBP')
    rederizarGraficosMoedas('peso','ARS')
    rederizarGraficosMoedas('ethe','ETH')
    

    adicionandoMoedasNaDropDanw();

        function adicionandoMoedasNaDropDanw() {

            fetch('https://economia.awesomeapi.com.br/all', options)
            .then(response => {
                if(!response.ok) throw new Error('Erro ao executar requisição')
                console.log(response.ok)
                return response.json();
            })
            .then(data => {
                escrever(data)

            })
            .catch(function (error) {
                console.log(error);
            })

            function escrever(data){

                let select = document.getElementById("moeda_de_conversao_1")
                let select2 = document.getElementById("moeda_de_conversao_2")

                dadosAPI = []
                nomesDasMoedas = []
                codigoDaMoeda = []
                

                //Convertendo o objeto em array
                dadosAPI = Object.values(data)

                //adicionando as opitions na tag section
                dadosAPI.forEach(element => {

                    let nome_da_moeda = element.code + "("+element.name+")"

                    let moeda = document.createElement('option')
                    moeda.setAttribute("value", element.code)
                    let text = document.createTextNode(nome_da_moeda)
                    moeda.appendChild(text) 

                    console.log(nome_da_moeda)

                    select.appendChild(moeda)

                });

                
                dadosAPI.forEach(element => {

                        let nome_da_moeda = element.code + "("+element.name+")"

                        let moeda = document.createElement('option')
                        moeda.setAttribute("value", element.code)
                        let text = document.createTextNode(nome_da_moeda)
                        moeda.appendChild(text) 

                        console.log(nome_da_moeda)

                        select2.appendChild(moeda)


                });

                //Adicionando a Moeda BRL, porque não tem na API 

                // let moeda_BRL = document.createElement('option')
                // moeda_BRL.setAttribute("value", "BRL")
                // let text2 = document.createTextNode("BRL(Real Brasil)")
                // moeda_BRL.appendChild(text2)

                // select.appendChild(moeda_BRL)

                // let moeda_BRL2 = document.createElement('option')
                // moeda_BRL2.setAttribute("value", "BRL")
                // let text22 = document.createTextNode("BRL(Real Brasil)")
                // moeda_BRL2.appendChild(text22)

                // select2.appendChild(moeda_BRL2)
                

            }

        }

        function calcular_convercao() {
            var valor = document.getElementById("valor_a_ser_convertido").value


            fetch('https://economia.awesomeapi.com.br/all', options)
            .then(response => {
                if(!response.ok) throw new Error('Erro ao executar requisição')
                console.log(response.ok)
                return response.json();
            })
            .then(data => {
                escrever(data)

            })
            .catch(function (error) {
                console.log(error);
            })

            function escrever(data) {
                dadosAPI = []

                

                //Convertendo o objeto em array
                dadosAPI = Object.values(data)

                let valor_moeda1 = document.getElementById("moeda_de_conversao_1").value
                let valor_moeda2 = document.getElementById("moeda_de_conversao_2").value    
                let dados_da_moeda1 = []
                let dados_da_moeda2  = []

                dadosAPI.forEach(element => {
                    if(element.code == valor_moeda1){
                        dados_da_moeda1 = element

                    }
                    if (element.code == valor_moeda2) {
                        dados_da_moeda2 = element

                         
                    }
                });
                
                let cambio = dados_da_moeda1.bid/dados_da_moeda2.bid

                let result = cambio * valor

                valor_menor = document.getElementById("numero_pequeno")
                valor_maior = document.getElementById("numero_grande")

                alert(valor_maior.innerHTML)

                result_valor_menor = dados_da_moeda1.code + " " + valor + " ="
                result_valor_maior = dados_da_moeda2.code + " " + result.toFixed(2)

                valor_menor.innerHTML = result_valor_menor
                valor_maior.innerHTML = result_valor_maior

                result = ""
                result_valor_maior = ""
            }
            
            
        }




        function renderizarInfoDasMoedas(nome, porcentagem, preco, moeda,tipoDaMoeda){
            var dadosAPI = []

            //Conectando com a AIP  e fazendo função para acesssar o dados DAS MOEDAS
            fetch('https://economia.awesomeapi.com.br/all', options)
                .then(response => {
                    if(!response.ok) throw new Error('Erro ao executar requisição')
                    console.log(response.ok)
                    return response.json();
                })
                .then(data => {
                    escrever(data)

                })
                .catch(function (error) {
                    console.log(error);
                })


                function escrever (dados){

                    dadosAPI = []
                    nomesDasMoedas = []
                    

                    //Convertendo o objeto em array
                    dadosAPI = Object.values(dados)

                    dadosAPI.forEach(element => {
                        if(element.code == moeda){
                            nomesDasMoedas.push(element)
                        }

                    });

                    //Caso exista duas moedas com código igual, o códigop ira pegar o tipo que a função
                    //passará, e usara como padrão
                    if(nomesDasMoedas.length > 1){
                       
                        nomesDasMoedas.forEach(element => {
                            if(element.name == tipoDaMoeda){
                                nomesDasMoedas = element
                                
                            }
                        });
                            
                    }else{
                        nomesDasMoedas = nomesDasMoedas[0]
                    }

                    console.log(nomesDasMoedas)

                    //pegando elemento na HTML para setar conforme a moeda

                    let area_nome = document.getElementById(nome)
                    let area_porcentagem = document.getElementById(porcentagem)
                    let area_preco = document.getElementById(preco)

                    let result_color_and_sinal

                    setCorAndSinal()
                    
                    //função para determinar a cor (vermelho ou verde) e o sinal (+ ou -), 
                    //dependendo da variação da moeda 
                    function setCorAndSinal() {
                        let nume_em_porcent = parseFloat(nomesDasMoedas.pctChange)
                        
                        console.log("porcentagem" + nume_em_porcent + nomesDasMoedas.pctChange)
                        if(nume_em_porcent < 0){
                            let sinal = "-"
                            area_porcentagem.setAttribute("style","background-color:red")
                            result_color_and_sinal = nomesDasMoedas.pctChange + "%"
                        }else{
                            let sinal = "+"
                            area_porcentagem.setAttribute("style","background-color:green")
                            result_color_and_sinal = sinal + nomesDasMoedas.pctChange + "%"
                        }

                    }

                    //escrevendo os resultados no HTML
                    area_nome.innerHTML = nomesDasMoedas.code + " - " + tipoDaMoeda
                    area_porcentagem.innerHTML = result_color_and_sinal
                    area_preco.innerHTML = "R$ " + nomesDasMoedas.bid

                    //"+" + nomesDasMoedas.pctChange + "%"
                    meusDaodosParaUso(dadosAPI)

                    nomesDasMoedas = ""

                    

                    

                    //para usar os dados da API  devemos usar uma function com o nome 
                    //meusDadosParaUso

                    // e usar assim :

                    // function meusDaodosParaUso(dados){
                    //     console.log(dados)
                    // }
                }

        }
    

            //função que consume a API das moedas pegando a variação e o fechamento em 10 dias, e montando o gráfico no 
            //html
          function rederizarGraficosMoedas(nome, id ){

                let url ='https://economia.awesomeapi.com.br/json/daily/'+ id + '/10'
                fetch(url, options)
                    .then(response => {
                        if(!response.ok) throw new Error("não consegui se comunicar com a API") 
                        return response.json()
                    })
                    .then(data => {
                        functionDadosGraficoMoeda(data);
                    })
                    .catch(erro => {console.log(erro)})

                    function functionDadosGraficoMoeda(dadosDaApi){
                        //gerar o géafico no html
                        let bidDosDias = []


                        console.log(dadosDaApi)



                        dadosDaApi.forEach(element => {
                            if (element.bid){
                                bidDosDias.push(element.bid)
                            }
                            

                        });
                        
                        var ctx = document.getElementsByClassName(nome)[0];
  
                        //Type, Data e Options
                        var chartGraph = new Chart(ctx, {
                            type: 'line',
                            data: {
                            labels: ["-9","-8","-7","-6","-5","-4","-3","-2","-1","Ontem","+1","+2","+3"],
                            datasets: [
                            {
                    
                                label: "",
                                data: bidDosDias,
                                borderWidth: 3,
                                borderColor: '#460670',
                                backgroundColor: '#65107063',
                            },
                            ]
                            },
                            options: {
                            title: {
                                display: true,
                                fontSize: 20,
                                text: ""
                            },
                            labels: {
                                fontStyle: "bold",
                            }
                            }
                        });
                        
                    }
            
          }


    //-------------------------------------------------------------------------------------

    //-------------------------------------------------------------------------------------


    //Conectando com a API DO INDICE BOOVESP

    fetch('https://v2-api.sheety.co/2ac728626639f7e8772ca31394a909ae/%C3%ADndiceBovespa/bovespa', options)
        .then(response => {
            if(!response.ok) throw new Error("o cominicação com a API falhou")
            return response.json();
        })
        .then(data => {
            
            escreverBOOVESP(data)
        })
        .catch(erro => {
            console.log(erro)
        })

        function escreverBOOVESP(date) {
            BOVESP = []
            datasBOVESP = []
            dadosBOVESP = []
            BOVESP = Object.values(date)

            BOVESP[0].forEach(element => {
                datasBOVESP.push(element.data)
                dadosBOVESP.push(element.fechamento)
            });


            renderizarGrágicoBOOVESP(dadosBOVESP, datasBOVESP)

            function renderizarGrágicoBOOVESP(dados, datas) {
                var ctx = document.getElementsByClassName("line-chart")[0];
  
                //Type, Data e Options
                var chartGraph = new Chart(ctx, {
                    type: 'line',
                    data: {
                    labels: datas,
                    datasets: [
                    {
            
                        label: "",
                        data: dados,
                        borderWidth: 3,
                        borderColor: '#000000',
                        backgroundColor: '#12021463',
                    },
                    ]
                    },
                    options: {
                    title: {
                        display: true,
                        fontSize: 20,
                        text: "Bolsa de valores"
                    },
                    labels: {
                        fontStyle: "bold",
                    }
                    }
                });
            }   
        }

 //------------------------------------------------------------------------------------

 
function setarBandeira(event) {

    
    moeda_ID = document.getElementById(event.target.id)
    moeda = moeda_ID.value

    fetch('https://economia.awesomeapi.com.br/all', options)
            .then(response => {
                if(!response.ok) throw new Error('Erro ao executar requisição')
                console.log(response.ok)
                return response.json();
            })
            .then(data => {
                escrever(data)

            })
            .catch(function (error) {
                console.log(error);
            })

            function escrever(data){
                dadosAPI = []
                

                //Convertendo o objeto em array
                dadosAPI = Object.values(data)

                dadosAPI.forEach(element => {
                    if(element.code == moeda){
                        let nome = moeda+".png"

                        let bandeira = document.getElementById("bandeira1")

                        bandeira.innerText = ""

                        let imagem_da_bandeira = document.createElement("img")
                        imagem_da_bandeira.setAttribute("src", "assets/images/"+nome)
                        imagem_da_bandeira.setAttribute("width", "60px")
                        imagem_da_bandeira.setAttribute("height", "30px")

                        bandeira.appendChild(imagem_da_bandeira)
                        
                    }
                    
                });





            }

            
}

function setarBandeira2(event) {

    
    moeda_ID = document.getElementById(event.target.id)
    moeda = moeda_ID.value

    fetch('https://economia.awesomeapi.com.br/all', options)
            .then(response => {
                if(!response.ok) throw new Error('Erro ao executar requisição')
                console.log(response.ok)
                return response.json();
            })
            .then(data => {
                escrever(data)

            })
            .catch(function (error) {
                console.log(error);
            })

            function escrever(data){
                dadosAPI = []
                

                //Convertendo o objeto em array
                dadosAPI = Object.values(data)

                dadosAPI.forEach(element => {
                    if(element.code == moeda){
                        let nome = moeda+".png"

                        let bandeira = document.getElementById("bandeira2")

                        bandeira.innerText = ""

                        let imagem_da_bandeira = document.createElement("img")
                        imagem_da_bandeira.setAttribute("src", "assets/images/"+nome)
                        imagem_da_bandeira.setAttribute("width", "60px")
                        imagem_da_bandeira.setAttribute("height", "30px")

                        bandeira.appendChild(imagem_da_bandeira)
                        
                    }
                    
                });





            }

            
}