# Backend
___

### Build Imagem

```
docker build . -f Dockerfile.api -t api
```

### Rodar Imagem

```
docker run --name api -p 8080:80 api
```