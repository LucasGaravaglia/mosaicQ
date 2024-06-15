# mosaicQ

## Configuração

- Necessário a instalação :
  - Docker compose
  - Nodejs V:18.17.1

Para subir o Banco de dados, no diretório do projeto em um terminal:

```bash
docker-compose up
```

Para ligar o Backend, no diretório do Backend com o docker up:

```bash
yarn start
```

Para ligar o Frontend, no diretório do frontend:

```bash
yarn dev
```

## Descrição

Decidi fazer um prototipo de um kanban/todo-list, seguindo o que foi pedido, onde a listagem deveria ter 3 status.
Como não tenho uma criatividade muito grande referente e UX a interface não ficou muito criativa, porém ficou funcional.
Para usar um kanban é necessario entrar com algum login e senha. Ele será cadastrado de forma automatica.

Foi utilizado o Prisma como ORM para conexão e criação do banco de dados para facilitar e agilizar o desenvolvimento.

O SQL que é usado esta em backend/prisma/migrations/20240615165817_mosaicq/migration.sql
