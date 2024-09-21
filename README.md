# AWS Lambada Mock Ideia - 1.1.1-alpha


## Docker

##### Criação Local da Imagem

```
docker build -t local/lambda:1.1.1-alpha .
```

##### Pull do Docker Repository

```
docker pull felipecantotrevisol/lambda:1.1.1-alpha
```

##### Executando o Container Local

```
docker run -d -p 4000:8000 --cpus=0.5 --memory=10m <image-name>
Ex: docker run -d -p 4000:8000 --cpus=0.5 --memory=10m local/lambda:1.1.1-alpha
Ex: docker run -d -p 4000:8000 --cpus=0.5 --memory=10m felipecantotrevisol/lambda:1.1.1-alpha
```

### Testando no Postman

```
GET http://localhost:4000/client
GET http://localhost:4000/client/all
POST http://localhost:4000/client
PUT http://localhost:4000/client
DELETE http://localhost:4000/client

[GET, POST, PUT, DELETE] http://localhost:4000/non-existent/route -> rota 404.
```

##### Importação do JSON do Postman

```
Challenged.postman_collection.json
```

##### Monitoramento da Aplicação com Docker

```
docker stats
```

## Executando com o NPM

No diretório raiz do projeto executar a linha de comando abaixo:

```
npm run start
```

##### Acesso via Navegador

```
http://localhost:8000/client/all
```

## Testes

No diretório raiz do projeto executar a linha de comando abaixo:

```
npm test
em seguida digitar a letra "a" para executar todos os testes unitários.
para sair do ambiente de execução de testes digitar q.
```