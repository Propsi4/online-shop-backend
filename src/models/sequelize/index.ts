import { DataTypes } from "sequelize"
// Sequelize initialization

/* Опис та функції index.ts
    Цей файл описує модель бази даних
    Модель бази даних має такі поля:
        id - ідентифікатор замовлення
        name - ім'я замовника
        phone - телефон замовника
        address - адреса замовника
        products - масив товарів замовлення
    Функція isProductsArray(value) - функція, яка перевіряє чи є поле products масивом з відповідними обов'язковими полями
    timestamps - включення часових міток
    createdAt - виключення поля createdAt
    updatedAt - перейменування поля updatedAt на updated_at
    sequelize.sync() - синхронізація моделі з базою даних
*/

module.exports = (sequelize) => {

    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        products: {
            type: DataTypes.ARRAY(DataTypes.JSON),
            allowNull: false,
            validate: {
                isProductsArray(value) {
                  if (!Array.isArray(value)) {
                    throw new Error('Products must be an array');
                  }
          
                  for (const product of value) {
                    if (!product.name || typeof product.name !== 'string') {
                      throw new Error('Each product must have a name as a string');
                    }
                    if (!product.image || typeof product.image !== 'string') {
                      throw new Error('Each product must have an image as a string');
                    }
                    if (!product.price || typeof product.price !== 'number') {
                      throw new Error('Each product must have a price as a number');
                    }
                  }
                },
              }
        }
    },
    {
        timestamps: true,
        createdAt: false,
        updatedAt: 'updated_at'
        })
    sequelize.sync({ alter: true })
}