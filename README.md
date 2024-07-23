## Запуск сервера:

1. Перейти в папку back

2. Открыть консоль

### Docker:

3. Запустить Docker

4. `docker compose build`

5. `docker compose up -d`

или

### Локально:

3. Запустить postgres

4. В файле .development.env поменять поле POSTGRES_HOST с `postgres` на `localhost` и поменять остальные параметры для входа в postgres

5. `npm i` или `yarn`

6. `npm run start:dev` или `yarn start:dev`

## Запуск веб приложения:

1. Перейти в папку front

2. Открыть консоль

3. `npm i` или `yarn`

4. `npm run start` или `yarn start`
