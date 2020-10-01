# Small Medium (Let Challenge)

![Small Medium](https://user-images.githubusercontent.com/13741072/94860072-e949a080-040b-11eb-8c4b-d88e6f8691a6.png)
> ## :page_with_curl: Recursos

- Docker
- Docker Compose
- Node v12
- Typescript
- GraphQL
- Jest
- MongoDB
- TDD
- DDD
- S.O.L.I.D
- Vue
- Vuex
- Apollo Server / Apollo Client

> ## :books: Requisitos

- Git
- Node
- Docker
- Docker Compose

> ## :rocket: Ambiente de desenvolvimento

Para executar o ambiente de desenvolvimento clone o projeto, execute os comandos abaixo raiz do projeto:

```
./setup.sh
```

Selecione a opção *1* para build do projeto.

Após finalizado acesse http://localhost:8080 para acessar o sistema

> ## :white_check_mark: Testes

Para executar os testes, execute o comando abaixo no diretório server do projeto:

```
npm run test
```

Para gerar os relatórios de test coverage:

```
npm run test:ci
```

> ## Considerações

Tentei seguir ao máximo os princípios do SOLID e DDD no backend. 

O objetivo foi isolar os componentes e regras de negócio da API das dependências de infraestrutura, dessa forma ficaria fácil substituir qualquer fonte de dados e evitar a dependência do express.

Também utilizei packages de padronização de código e commits como o eslint, husky, git-commit-msg-linter, lint-staged e o swagger-ui-express para gerar a documentação funcional da API.

No frontend ainda estou estudando como implementar o TDD e DDD e portanto optei por mantê-lo mais simples.



> ### Dificuldades

- GraphQL + Vue
Ainda não tinha trabalhado com o GraphQL em frontend VueJS e tive algumas dúvidas estruturais na implementação.

- Testes
O backend foi feito utilizando TDD e 100% de test coverage, porém no frontend mais precisamente com o Vue ainda não tenho conhecimentos de como implementar testes corretamente.

> ## ToDo

- Para simplificar o desafio não desenvolvi o upload de imagens nos artigos e optei por adicionar imagens aleatórias de uma API pública ao carregar os artigos;
- Desenvolvi um CRUD simples de usuário e artigos, ainda podem ser adicionadas muitas features como comentários, seguidores, editor de texto, etc.
- Para evitar repetição dos schemas optei por trabalhar diretamente com o mongoDB e não utilizar um ODM como o Mongoose, mas em um projeto mais robusto deveria ser implementado.

Obs. Ao juntar o client e server para dockerizar a aplicação acabei perdendo a sequência de commits.
