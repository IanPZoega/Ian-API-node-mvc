# API Node com MySQL — Arquitetura MVC

Aluno: Ian
Turma: 3º DSN

Atividade prática 02 de Programação Web III (PW3). Evolução da API REST da atividade anterior (monolítica, tudo no `index.js`) para a arquitetura **MVC**, usando Node.js, Express e MySQL (`mysql2`, sem ORM). CRUD de usuários.

## Como rodar

1. Clone o repositório e entre na pasta

```
git clone https://github.com/SEU-USUARIO/ian-API-node-mvc.git
cd ian-API-node-mvc
```

2. Instale as dependências

```
npm install
```

3. Crie o banco rodando o `schema.sql` no MySQL (Workbench ou terminal)

```
mysql -u root -p < schema.sql
```

4. Copie o `.env.example` para `.env` e preencha usuário e senha do MySQL

```
cp .env.example .env
```

5. Inicie o servidor

```
npm start        # execução normal
npm run dev      # com Nodemon (reinicia ao salvar)
```

Vai rodar em http://localhost:3000

## Arquitetura em camadas (MVC)

```
src/
├── config/        db.js                 -> pool de conexão MySQL + variáveis de ambiente (dotenv)
├── models/        usuarioModel.js       -> único lugar com SQL (queries parametrizadas)
├── controllers/   usuarioController.js  -> valida req, chama a Model, responde com status HTTP
├── routes/        usuarioRoutes.js      -> endpoints (express.Router) ligados ao Controller
└── app.js                               -> middlewares, registro das rotas e start do servidor
```

- **Model**: executa `SELECT`, `INSERT`, `UPDATE` e `DELETE`. Não conhece `req` nem `res`.
- **View**: como é uma API, a "view" é a resposta JSON enviada pelo Express.
- **Controller**: recebe a requisição, valida os dados de entrada, aciona a Model e devolve o JSON com o status adequado (200, 201, 400, 404, 500).
- **Routes**: só mapeia verbo HTTP + caminho para a função do Controller.
- **config**: centraliza a conexão com o banco, assim nenhuma outra camada precisa conhecer credenciais.

Fluxo de uma requisição: `Route -> Controller -> Model -> MySQL`, e a resposta volta pelo caminho inverso.

## Rotas

| Verbo  | Rota            | Descrição                              |
|--------|-----------------|----------------------------------------|
| GET    | /usuarios       | lista todos                            |
| GET    | /usuarios/:id   | busca um usuário                       |
| POST   | /usuarios       | cadastra (body: nome e email)          |
| PUT    | /usuarios/:id   | atualiza (body: nome e email)          |
| DELETE | /usuarios/:id   | remove                                 |

## Exemplo

```
POST /usuarios
{
  "nome": "Maria",
  "email": "maria@email.com"
}
```
