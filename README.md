# Criminix

Website platform of CriminiX project.

## Specs

The project has the following stack:

- Angular 16
- Angular Material
- Rxjs
- Apache Echarts
- ngx-markdown
- date-fns

## Build

Docker is preferred because of version compatibility with Node and Angular. 
But running locally is an option too.

### Local

Node.js and npm must be installed.

```bash
npm install
npm start
```

### Docker

#### Build Image

```bash
docker build -t criminix-web .
```

#### Run

```bash
docker run -d -p 80:80 criminix-web
```
