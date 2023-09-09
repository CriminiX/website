# Backend
___

### Build Imagem

```
docker build . -f Dockerfile.api -t criminix-api
```

### Rodar Imagem

```
docker run --name criminix-api -p 8080:80 -e "DB_USER=user" -e "DB_PASS=password" --network criminix criminix-api
```