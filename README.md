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
```

> [!NOTE]
> Em seguida digitar a letra "a" para executar todos os testes unitários.
> Para sair do ambiente de execução de testes digitar "q".

## Breaking Down

##### server.js

No código abaixo simulei o event do AWS Lambda para me aproximar ao máximo da realidade.

```
const event: Event = {request: request, response: response};
const context: any = null;
handler(event, context);
```

##### aws.lambda.mock.idea.ts

```
export default function handler (event: Event, context: any) {
	const entrypoint: ApiGateway = new ApiGateway(event.request, event.response);
	entrypoint.http().run();
}
```

##### ApiGateway.ts

Usei o Strategy Pattern para escalar a implementação e dar a ela a habilidade de receber novos EntryPoints de forma dinâmica.

```
export default abstract class EntryPoint {
    public abstract route(): Router;
}
```

```
export default class ApiGateway {
    private readonly entryPoints: EntryPoint[] = [];

    constructor(private readonly request: IncomingMessage, private readonly response: ServerResponse) {
        this.entryPoints.push(new ClientRouterEntryPoint(this.request, this.response));
    }

    public http(): Router {
        return this.entryPoints[0].route();
    }
}
```