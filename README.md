# AWS Lambada Mock Ideia - 1.1.1-alpha


## Docker

#### Criação Local da Imagem

```
docker build -t lambda:1.1.1-alpha .
```

#### Pull do Docker Repository

```
https://hub.docker.com/r/felipecantotrevisol/lambda/tags
docker pull felipecantotrevisol/lambda:1.1.1-alpha
```

#### Executando Local

```
docker run -d -p 4000:8000 --cpus=0.5 --memory=10m <image-name>
```