# Frontend
___

### Build Imagem

```
docker build -t criminix-web .
```

### Rodar Imagem

```
docker run -d --name criminix-web -p 80:80 --network criminix criminix-web
```