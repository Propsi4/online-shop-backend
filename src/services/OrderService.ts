const Models = require('../models/sequelize');

/* Опис та функції OrderService.ts
    Цей файл - сервіс проекту, в якому описані функції для роботи з базою даних
    Сервіс має такі функції:
        addOrder({ name, phone, address, products }) - додавання замовлення
        deleteOrder(id) - видалення замовлення по id
        getOrders() - отримання всіх замовлень
    
*/

export class OrderService {
    sequelize: any;
    models: any;
    constructor(sequelize) {
        Models(sequelize);
        this.sequelize = sequelize;
        this.models = sequelize.models;
    }

  async addOrder({ name, phone, address, products }) {
    try {
        const newOrder = await this.models.Order.create({
        name,
        phone,
        address,
        products
        });
      return newOrder;
    } catch (error) {
        console.log(error)
      return error;
    }
  }
  async deleteOrder(id) {
    try {
        const order = await this.models.Order.destroy({
            where: {
                id: id
            }
        });
      return order;
    } catch (error) {
        console.log(error)
      return error;
    }
  }

  async getOrders() {
    try {
      const orders = await this.models.Order.findAll();
      return orders;
    } catch (error) {
        console.log(error)
        return error;
    }
  }

}