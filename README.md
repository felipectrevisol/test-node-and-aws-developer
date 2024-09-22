# AWS Lambada Mock Ideia - 1.2.2-alpha

> [!NOTE]
> Esta implementação é leve o suficiente para rodar com 0.5 de CPU e 6 Mb de RAM.

## Docker

##### Criação Local da Imagem

```
docker build -t local/lambda:1.2.2-alpha .
```

##### Pull do Docker Repository

```
docker pull felipecantotrevisol/lambda:1.2.2-alpha
```

##### Executando o Container Local

```
docker run -d -p 4000:8000 --cpus=0.5 --memory=6m <image-name>
Ex: docker run -d -p 4000:8000 --cpus=0.5 --memory=6m local/lambda:1.2.2-alpha
Ex: docker run -d -p 4000:8000 --cpus=0.5 --memory=6m felipecantotrevisol/lambda:1.2.2-alpha
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

##### Importação do JSON no Postman

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

##### Exemplo de EntryPoint | ClientRouterEntryPoint.ts

```
export default class ClientRouterEntryPoint extends EntryPoint {

    private readonly routers: GetClientRouter[] = [];

    constructor(private request: IncomingMessage, private response: ServerResponse) {
        super();
        {
            this.routers.push(new GetClientRouter(this.request, this.response, /client+[/]all+/gi));
            this.routers.push(new GetClientRouter(this.request, this.response, /client/gi));
            this.routers.push(new PutClientRouter(this.request, this.response, /client/gi));
            this.routers.push(new PostClientRouter(this.request, this.response, /client/gi));
            this.routers.push(new DeleteClienteRouter(this.request, this.response, /client/gi));
        }
    }

    public route(): Router {
        const router: Router | undefined = this.routers.find((route: Router) => route.isThisTheRightOne());
        return router === undefined ? new NotFound404Router(this.request, this.response) : router;
    }
}
```

##### Router.ts

Usei o Strategy Pattern para escalar a implementação das rotas e também Chain of Responsibility Pattern para o Router delegar a requisição à implementação correta de forma dinâmica.

```
export default abstract class Router {

    protected readonly routers: Router[] = [];

    protected constructor(
        public readonly path: RegExp,
        public readonly httpMethod: HttpMethod,
        protected readonly request: IncomingMessage,
        protected readonly response: ServerResponse
    ){}

    public isThisTheRightOne(): boolean {
        return this.path.test(this.request.url!.toString()) &&
        this.httpMethod.toString().includes(this.request.method!.toString());
    }

    public run(): void {}
}
```

##### Ex. de Implementação de Rotas:

```
export default class GetClientRouter extends Router {

    constructor(request: IncomingMessage, response: ServerResponse, path: RegExp) {
        super(path, HttpMethod.GET, request, response);
    }

    public run(): void {
        this.response.writeHead(HttpStatusCode.OK, {"Content-Type": "application/json"});
        this.response.end(JSON.stringify({path: `${this.path}`, method: `${this.httpMethod}`}));
    }
}
```

##### Segregação de Interfaces | Adder | Finder | Remover | Updater

```
export default interface Adder {
    add(client: Client): void;
}
```

```
export default interface Finder {
    bring(client: Client): Client | undefined;
}
```

```
export default interface Remover {
    delete(client: Client): void;
}
```

```
export default interface Updater {
    alter(client: Client): Updater;
    toThisNewOne(client: Client): boolean;
}
```

##### Repository.ts

```
export default class Repository implements Adder, Finder, Updater, Remover {

    private repository: Client[] = [];

    constructor() {
    }
```

#### Um pouco do Potencial da Segregação de Interface

> [!NOTE]
> A segregação de interface além de centralizar as responsabilidade únicas ao contexto em si, também isolou o suficiente para que somasse a interface Updater o Pattern Builder com segurança no uso: porque ao instanciar um Repository quando invocado o método alter, a própria IDE lista "apenas" o método toThisNewOne: esta é uma das muitas formas de implementar o padrão Builder para a criação da alteração do objeto Client.
> Ex: new Repository().alter(antigoEstadoDoCliente).toThisNewOne(novoEstado); a segurança da que me referi é que depois de chamar o método alter não é possível chamar o método add por exemplo: e nisto é possível unir tanto a segregação quanto um design pattern.

#### Updater.ts

```
export default interface Updater {
    alter(client: Client): Updater;
    toThisNewOne(client: Client): boolean;
}
```

#### Repository.ts

```
public alter(client: Client): Updater {
    this.delete(client);
    return this;
}

public toThisNewOne(client: Client): boolean {
    this.add(client);
    return true;
}
```
