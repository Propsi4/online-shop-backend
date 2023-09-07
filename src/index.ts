import express from 'express'
import { Sequelize } from 'sequelize'

/* Опис та функції index.ts
    index.ts - головний файл проекту, в якому відбувається підключення до бази даних та запуск сервера
    connectDB() - функція, яка виконує підключення до бази даних
    app.listen() - функція, яка запускає сервер на порті 5000
*/

const PORT = process.env.PORT || 5000
const app = express()
const config = require('./config')[process.env.NODE_ENV || 'development']
const sequelize = new Sequelize(config.postgres.options)
const router = require('./routes')(sequelize)

const connectDB = () => {
    sequelize.authenticate()
    .then(() => console.log('Connection to DB has been established successfully.'))
    .catch((error : any) => {console.error('Unable to connect to the database:', error); process.exit(1)})
}
connectDB()



app.use(router)

app.listen(PORT, () => {
    console.log('App listening at '+ PORT)
  });