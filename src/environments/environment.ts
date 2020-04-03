export const environment = {
  production: false,

  //Caminhos API
  api: 'https://localhost:44366/',

  //Controller Operações Bancárias
  Saldo: 'api/OperacoesBancarias/Saldo',
  Sacar: 'api/OperacoesBancarias/Sacar',
  Depositar: 'api/OperacoesBancarias/Depositar',

  //Controller Caixa Eletronico
  Login: 'api/CaixaEletronico/Login',
  ListarUsuario: 'api/CaixaEletronico/ListarUsuario',
};
