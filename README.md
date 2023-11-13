# DEMO simple zeroMQ with NodeJS
simple demo for zeroMQ with NodeJS using Grand Oak & Pine Valley Hospital API

## Requirements
- JDK >= ver.11

## How to Run
1. install all dependencies
```
npm install
```

2. run mock backend
```
java -jar ./lib/DoctorInfo-JDK11.jar
```

3. run the broker
```
> node ./src/broker.js
```
4. run the client(s) on different terminal
```
> node ./src/client.js <clientID> <timeout>
```

## Contributors
| Member | NIM |
| --- | --- |
| Reinaldo Antolis | 13519015 |
| Ilham Pratama | 13520041 |
| Vieri Mansyl | 13520092 |