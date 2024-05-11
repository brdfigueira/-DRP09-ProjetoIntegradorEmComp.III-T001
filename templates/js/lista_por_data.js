  <script>


 var autores = [
        { nome: "Autor 1", diaNascimento: 1, mesNascimento: 5, anoNascimento: 1990, diaFalecimento: 0, mesFalecimento: 0, anoFalecimento: 0 },
        { nome: "Autor 2.1", diaNascimento: 5, mesNascimento: 5, anoNascimento: 1985, diaFalecimento: 10, mesFalecimento: 5, anoFalecimento: 2010 },
        { nome: "Autor 2.2", diaNascimento: 5, mesNascimento: 5, anoNascimento: 1995, diaFalecimento: 0, mesFalecimento: 0, anoFalecimento: 0 },
        { nome: "Autor 3", diaNascimento: 10, mesNascimento: 1, anoNascimento: 1978, diaFalecimento: 15, mesFalecimento: 1, anoFalecimento: 2015 }
        // Adicione mais autores e seus dias e meses de nascimento conforme necessário
    ];


    function get_autores(dia, mes, autores) {


//alert(dia + mes);
    if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
        return [["Data inválida"]];
    }

  

    var autoresNoDiaMes = [];

    // Percorrer todos os autores e encontrar aqueles que nasceram na data fornecida
    autores.forEach(function(autor) {
        if (autor.diaNascimento === dia && autor.mesNascimento === mes) {
            autoresNoDiaMes.push(autor);
        }
    });

    // Verificar se foram encontrados autores para a data fornecida
    if (autoresNoDiaMes.length > 0) {
        return autoresNoDiaMes.map(function(autor) {
            return [autor.nome, autor.anoNascimento];
        });
    } else {
        return [["Nenhum autor encontrado para esta data", "Não há registros"]];
    }
}


// Função que é chamada quando um botão é clicado
function diaSelecionado(diaHead, mesHead) {
    var dia = parseInt(diaHead); // Usar o dia fornecido pela classe 'head-day'
    var mes = parseInt(mesHead); // Usar o mês fornecido pela classe 'head-month'

    // Chama a função get_autores e passa os valores do dia e do mês como argumentos
    var resultados = get_autores(dia, mes, autores);

    // Exibe os resultados
    resultados.forEach(function(resultado) {
        console.log("Nome do autor:", resultado[0]);
        console.log("Ano de nascimento:", resultado[1]);
        console.log("---");
    });
}

// Seleciona a div alvo
var minhaDiv = document.querySelector('.head-info');

// Cria um novo observador de mutação
var observer = new MutationObserver(function(mutationsList, observer) {
    // Itera sobre as mutações
    for (var mutation of mutationsList) {
        // Verifica se a mutação é de tipo childList (ou seja, conteúdo interno alterado)
        if (mutation.type === 'childList') {
            // Dispara um evento personalizado 'conteudoModificado' após a mutação
            var evento = new CustomEvent('conteudoModificado');
            minhaDiv.dispatchEvent(evento);
            break; // Saímos do loop, pois apenas uma mutação é necessária
        }
    }
});

// Configura o observador de mutação para observar mudanças na lista de filhos da div e em outras propriedades, se necessário
observer.observe(minhaDiv, { childList: true, subtree: true, attributes: true, characterData: true });

// Adiciona um ouvinte de evento para detectar quando o conteúdo da div é modificado
minhaDiv.addEventListener('conteudoModificado', function(event) {
    console.log('Conteúdo da div ou de um de seus filhos foi modificado!');
    // Obtém os valores dos elementos com as classes 'head-day' e 'head-month'
    var diaHead = parseInt(document.querySelector('.head-day').textContent);
    var mesHead = parseInt(document.querySelector('.mesSelecionado').textContent);
    // Chama a função diaSelecionado com os valores do dia e do mês como argumentos
    diaSelecionado(diaHead, mesHead);
});