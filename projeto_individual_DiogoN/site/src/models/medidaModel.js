var database = require("../database/config");

function buscarUltimasMedidas(idquestionario, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        CONVERT(varchar, momento, 108) as momento_grafico
                    from medida
                    where fk_aquario = ${idquestionario}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
    instrucaoSql = `select count(questao1) * 10 as total_respostas,count(questao2) * 8 as total_respostas2 ,
     momento, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico from questionario` 
        // `select 
        // dht11_temperatura as temperatura, 
        // dht11_umidade as umidade,
        //                 momento,
        //                 DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
        //             from medida
        //             where fk_aquario = ${idquestionario}
        //             order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idquestionario) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select count(questao1) as 'total_respostas' from questionario`; 
        // `select count(questao1) from questionario where questao1 like ${idquestionario}`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select count(questao1) * 5 as 'total_respostas', count(questao2) * 8 as total_respostas2, 
        momento, DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico from questionario`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
