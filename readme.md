# API LocaleTravel

API REST para cadastro e gerenciamento de clientes e administradores da plataforma LocaleTravel.

## Sumário

- [Sobre](#sobre)
- [Tecnologias](#tecnologias)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Execução](#execução)
- [Endpoints](#endpoints)
- [Autenticação](#autenticação)
- [Documentação Swagger](#documentação-swagger)
- [Estrutura do Projeto](#estrutura-do-projeto)

## Sobre

Esta API permite criar, consultar, atualizar e remover usuários e administradores, além de autenticação via JWT e proteção de rotas.

## Tecnologias

- Node.js
- TypeScript
- Express
- TypeORM
- PostgreSQL (ou outro banco relacional)
- JWT
- Swagger

## Instalação

```sh
git clone https://github.com/Leonardobern10/api_cadastro_locale_travel.git
cd api_cadastro_locale_travel
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias, por exemplo:

```
PORT=3000
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=sua_chave_secreta
PATH_DOC=/api-docs
```

Configure o banco de dados em `src/configs/data-source.ts`.

## Execução

```sh
npm run build
npm start
```

Acesse: [http://localhost:3000](http://localhost:3000)

## Endpoints

### Usuários

- `POST /api/v1/users` — Cria um novo usuário
- `GET /api/v1/users` — Lista todos os usuários
- `GET /api/v1/users/:id` — Busca usuário por ID (protegido)
- `PUT /api/v1/users/:id` — Atualiza usuário por ID
- `DELETE /api/v1/users/:id` — Remove usuário por ID
- `POST /api/v1/users/login` — Login do usuário
- `POST /api/v1/users/logout` — Logout do usuário (protegido)

### Administradores

- `POST /api/v1/admin` — Cria um novo admin
- `GET /api/v1/admin` — Lista todos os admins
- `GET /api/v1/admin/:id` — Busca admin por ID
- `PUT /api/v1/admin/:id` — Atualiza admin por ID
- `DELETE /api/v1/admin/:id` — Remove admin por ID

## Autenticação

- Login retorna um JWT salvo em cookie HTTP Only.
- Rotas protegidas usam o middleware [`authMiddleware`](src/application/middlewares/authMiddleware.ts).

## Documentação Swagger

Acesse a documentação interativa em:  
`/api-docs`  
Exemplo: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Estrutura do Projeto

Veja a estrutura completa [src/](src):

```
src/
  index.ts
  application/
    App.ts
    dto/
    mappers/
    middlewares/
    validators/
  configs/
  controllers/
  docs/
  domain/
    entities/
    interfaces/
    type/
  infra/
    cripto/
    database/
  routes/
  server/
  services/
  utils/
```

## Licença
