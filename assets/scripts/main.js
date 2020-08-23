const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}


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

          console.log(dadosAPI)

          meusDaodosParaUso(dadosAPI)

          

        //para usar os dados da API  devemos usar uma function com o nome 
        //meusDadosParaUso

        // e usar assim :

        // function meusDaodosParaUso(dados){
        //     console.log(dados)
        // }
    }

    //chamando a função para renderizar os graficos das moedas.
    rederizarGraficosMoedas('dolar','USD')
    rederizarGraficosMoedas('libra','GBP')
    rederizarGraficosMoedas('euro','EUR')
    

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
                            labels: ["10","9","8","7","5","6","7","8","9","10"],
                            datasets: [
                            {
                    
                                label: "",
                                data: bidDosDias,
                                borderWidth: 3,
                                borderColor: '#DB3E07',
                                backgroundColor: '',
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
            console.log(BOVESP[0])

            BOVESP[0].forEach(element => {
                datasBOVESP.push(element.data)
                dadosBOVESP.push(element.fechamento)
            });

            console.log(datasBOVESP)
            console.log(dadosBOVESP)

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
            
                        label: "Euro",
                        data: dados,
                        borderWidth: 3,
                        borderColor: '#3B393B',
                        backgroundColor: '',
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