export function formatarMoeda(valor){
    if(!Number.isFinite(valor)){
        throw new TypeError('Valor monetário deve ser um número finito');
    }

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',//Estilo de moeda
        currency: 'BRL' // Nome da nossa moeda lá fora
    }).format(valor);

}
