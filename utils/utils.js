const { cnpj, cpf } = require('cpf-cnpj-validator');
const validator = require('validar-telefone').default;
const moment = require('moment-timezone');

module.exports = () => {

  const isDocumentValid = document => {
    let validDocument = cpf.isValid(document);

    if (!validDocument) validDocument = cnpj.isValid(document);

    return validDocument;
  };

  const refatoreDocument = document => document.replace(new RegExp('[.,-,/, ,-]', 'g'), '');

  const isPhoneValid = phone => validator(phone, { mostrarLogs: true });

  const dayOfWeek = date => {
    const dayOfDate = moment(date).day();
    let dayOfWeek = 'DOMINGO';

    switch (dayOfDate) {
      case 1:
        dayOfWeek = 'SEGUNDA_FEIRA'
        break;
      case 2:
        dayOfWeek = 'TERÇA_FEIRA'
        break;
      case 3:
        dayOfWeek = 'QUARTA_FEIRA'
        break;
      case 4:
        dayOfWeek = 'QUINTA_FEIRA'
        break;
      case 5:
        dayOfWeek = 'SEXTA_FEIRA'
        break;
      case 6:
        dayOfWeek = 'SABADO'
        break;
    }
    return dayOfWeek;
  }

  const validDayExtra = dateOutput => {
    const dateOut = moment(moment(dateOutput,['DD/MM/YYYY HH:mm','YYYY-MM-DD HH:mm']).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm'));
    const dateOutHour = moment(moment(dateOutput,['DD/MM/YYYY HH:mm','YYYY-MM-DD HH:mm']).tz('America/Sao_Paulo').format('YYYY-MM-DD')+' 16:30');
    return dateOut >= dateOutHour;
  }

  const diffDateInAndDateOut = (dateInitial, dateOutput) =>{
    const dateOut = moment(moment(dateOutput, ['DD/MM/YYYY HH:mm','YYYY-MM-DD HH:mm']).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm'));
    const dateIn = moment(dateInitial, ['DD/MM/YYYY HH:mm','YYYY-MM-DD HH:mm']).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm');
    return dateOut.diff(dateIn,'days');
  }

  const validDateInAndOutSmallDateNow = (dateInitial, dateOutput) =>{
    const dateOut = moment(dateOutput, ['DD/MM/YYYY HH:mm','YYYY-MM-DD HH:mm']).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm');
    const dateIn = moment(dateInitial, ['DD/MM/YYYY HH:mm','YYYY-MM-DD HH:mm']).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm');
    const now = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm');
    const valid = dateIn < now || dateOut < now;

    return valid;
  }

  const validDateInAndOutBiggerEquals = (dateInitial, dateOutput) =>{
    const dateOut = moment(dateOutput, ['DD/MM/YYYY HH:mm','YYYY-MM-DD HH:mm']).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm');
    const dateIn = moment(dateInitial, ['DD/MM/YYYY HH:mm','YYYY-MM-DD HH:mm']).tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm');
    const valid = dateIn >= dateOut;

    return valid;
  }

  const validFunctionsByDate = (dateInit, dateOut) => {

    if (!dateInit.includes(':')) return 'Data de entrada inválida, verifique!';
    else if (!dateOut.includes(':')) return 'Data de saída inválida, verifique!';
    else if (!validDateInAndOutSmallDateNow(dateInit, dateOut)) return 'Data de entrada ou de saída não pode ser anterior do dia atual!';
    else if (!validDateInAndOutBiggerEquals(dateInit, dateOut)) return 'Data de entrada não pode ser igual ou maior que a data de saída!';

    return;
  }

  return {
    isDocumentValid,
    refatoreDocument,
    isPhoneValid,
    dayOfWeek,
    validDayExtra,
    diffDateInAndDateOut,
    validFunctionsByDate
  };
};
