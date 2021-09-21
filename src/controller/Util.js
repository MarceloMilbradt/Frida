var formataData = (data) => {
    //Formata a data para o formato 'dd/mm/yyyy hh mm'
    var options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(data).toLocaleDateString("pt-BR", options)
}

export {
    formataData
}