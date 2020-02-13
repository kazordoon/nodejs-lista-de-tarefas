
# nodejs-lista-de-tarefas
Aplicação feita com Node.js em que cada usuário cadastrado no banco de dados do sistema, possa criar sua própria lista de tarefas.

## Pré-requisitos
- Node.js
- MongoDB
- NPM / Yarn

## Instalação
- Clone o repositório: `git clone https://github.com/kazordoon/nodejs-lista-de-tarefas.git`
- Entre no diretório do projeto: `cd nodejs-lista-de-tarefas`
- Instale as dependências:
	- NPM: `npm i` | OBS: Se optar por instalar com o NPM, remova o arquivo `yarn.lock` antes da instalação das dependências.
	- Yarn: `yarn`

## Configurando ambiente
Antes de iniciar a aplicação, é necessário criar as variáveis de ambiente. Primeiramente, renomeie o arquivo `.env.example` para `.env`. Em seguida, você deve alterar o valor das variáveis de ambiente contidas dentro do arquivo `.env` de acordo com o seu uso.

Após ter feito o procedimento acima, ligue o servidor:
- Com o NPM: `npm run dev`
- Com o Yarn: `yarn dev`

## Construído com
- [Node.js](https://nodejs.org/) - Ambiente de execução Javascript server-side
- [MongoDB](https://www.mongodb.com/) - Banco de Dados NoSQL
- [express](https://expressjs.com/) - Web Framework minimalista
- [mongoose](https://mongoosejs.com/) - ODM (Object Data Modeling - Modelagem de Dados de Objeto) | Facilita a integração do MongoDB com o Node.js
- [@hapi/joi](https://hapi.dev/family/joi/) - Validador de dados para JavaScript
- [consign](https://github.com/jarradseers/consign/) - Faz o carregamento automático de scripts
- [cookie-parser](https://github.com/expressjs/cookie-parser/) - Analisa cookies
- [ejs](https://github.com/mde/ejs/) - Renderiza páginas html no back-end
- [dotenv](https://github.com/motdotla/dotenv/) - Carrega variáveis de ambiente no arquivo .env
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - Biblioteca que ajuda a criptografar senhas
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken/) - Implementação do Json Web Token
- [morgan](https://github.com/expressjs/morgan/) - Middleware para registrar as solicitações HTTP

## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](https://github.com/kazordoon/nodejs-lista-de-tarefas/blob/master/LICENSE) para mais detalhes.
