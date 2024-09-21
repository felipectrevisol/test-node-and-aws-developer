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
```

##### Monitoramento da Aplicação com Docker

```
docker stats
```