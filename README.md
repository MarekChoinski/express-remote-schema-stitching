# express-remote-schema-stitching

Application that stitches two remote schemas.

## Install dependencies

Nodemon and ts-node is recommended to be installed (not necessary globally).

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

On `localhost:3000/graphql` playground is available.

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

### Access log

```
curl -i -b cookies.txt -X POST -H "Content-Type: application/json" --data '{"query":"{ accessLog }"}' http://localhost:3000/graphql
```

### Public query

For example

```
{
    COUNTRY_country(code: "BR") {
        name
        native
        emoji
        currency
        languages {
            code
            name
        }
    }
}
```

Curl:

```
curl -i -b cookies.txt -X POST -H "Content-Type: application/json" --data '{"query":"{ COUNTRY_country(code: \"BR\") { name native emoji currency languages { code name } } }"}' http://localhost:3000/graphql
```
