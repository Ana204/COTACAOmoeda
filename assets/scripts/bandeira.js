const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}


function setarBandeira() {

    alert("deu certo")

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

            }

            
}