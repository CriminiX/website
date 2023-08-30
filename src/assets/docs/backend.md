# Backend
___

### Build Imagem

```
docker build . -f Dockerfile.api -t criminix-api
```

### Rodar Imagem

```
docker run --name criminix-api -p 8080:80 --network criminix criminix-api
```