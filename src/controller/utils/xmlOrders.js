const builder = require('xmlbuilder');
const qs = require('qs');
const axios = require ('axios');


const { integrations } = require('../../config/config');


//funçao para transformar um json no xml necessario para enviar o pedido para o Bling

function jsonToXML(jsonPayload) {
  let payloadToBlingXML = builder.create('root');
  payloadToBlingXML
    .ele('pedido')
    .ele('cliente')
    .ele('nome')
    .txt(jsonPayload.customer.name)
    .up()
    .up()
    .ele('itens')
    .ele('item')
    .ele('descricao')
    .txt(jsonPayload.item.description)
    .up()
    .ele('vlr_unit')
    .txt(jsonPayload.item.unit_value)
    .up()
    .ele('codigo')
    .txt(jsonPayload.item.code);
  return payloadToBlingXML.toString();
}
async function uploadDealToBling(jsonPayload) {
  const data = { xml: jsonToXML(jsonPayload), apikey: integrations.bling.key };
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: integrations.bling.url,
  };

  resFromBling = await axios(options);
  if (resFromBling.data.retorno.erros) {
    throw resFromBling;
  }


  
  return resFromBling.data.retorno.pedidos[0].pedido;
}
module.exports = { uploadDealToBling };