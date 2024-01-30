# express-remote-schema-stitching

Application that stitches two remote schemas.

## Install dependencies

Nodemon and ts-node is recommended to be installed.

```
npm install -g ts-node nodemon
```

Install dependencies.

```
npm i
```

## Run application

```
nodemon index.ts
```

### Login

```
curl -i -c cookies.txt -X POST -H "Content-Type: application/x-www-form-urlencoded" --data-urlencode "username=exampleUser" --data-urlencode "password=yourPassword" http://localhost:3000/login
```

### Secure query 1

```
curl -i -b cookies.txt -X POST -H "Content-Type: application/json" --data '{"query":"{ secureQuery1 }"}' http://localhost:3000/graphql
```

### Secure query 2

```
curl -i -b cookies.txt -X POST -H "Content-Type: application/json" --data '{"query":"{ secureQuery2 }"}' http://localhost:3000/graphql
```
