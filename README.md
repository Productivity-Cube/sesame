# Sesame Backend

## Installation guide

1. 
Setup MySQL or run a docker container
```
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:latest
```

2. Create sesame database
3. `cp .env.example .env`
4. `npm i`
5. `npm run sequelize:migrate`
6. `npm run sequelize:seed`
7. `npm run start-dev`
