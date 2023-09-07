/* Опис та функції index.ts
    Цей файл - конфігурація проекту, в якому зберігаються дані для підключення до бази даних
    Конфігурація підключення до бази даних має такі поля:
        username - ім'я користувача
        password - пароль користувача
        database - назва бази даних
        host - хост бази даних
        dialect - діалект бази даних
        logging - логування запитів до бази даних
        client - клієнт бази даних
*/

module.exports = {
    development: {
        postgres: {
            options :{
            username: 'postgres',
            password: '123321',
            database: 'online-shop',
            host: 'localhost',
            dialect: 'postgres',
            logging: false
            },
            client : null
        }
    },
}