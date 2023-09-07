import express, { Router } from "express";
import { OrderService } from '../services/OrderService';

/* Опис та функції index.ts
    Цей файл - роутер проекту, в якому описані маршрути для роботи з базою даних
    Роутер має такі маршрути:
        /api/add_order - додавання замовлення
        /api/get_orders - отримання всіх замовлень
        /api/delete_order/:id - видалення замовлення по id
    Шлях /api/add_order приймає такі поля:
        name - ім'я замовника
        phone - телефон замовника
        address - адреса замовника
        products - масив товарів замовлення
    Шлях /api/get_orders повертає список всіх замовлень
    Шлях /api/delete_order/:id приймає id замовлення, яке потрібно видалити
*/

const router = Router();
const cors = require("cors");
router.use(express.json());
router.use(cors());

interface Order {
    name: string,
    phone: string,
    address: string,
    products: any[]
}
module.exports = (sequelize) => {
    const orderService = new OrderService(sequelize);

    router.post("/api/add_order", async (req : any, res : any) => {
        const { name, phone, address, products } : Order = req.body;
        if (!name || !phone || !address || !products) {
            res.status(400).json({ error: "Invalid body" });
            return;
        }
        const order = await orderService.addOrder({ name, phone, address, products });
        console.log(order.id)
        res.json(order);
    });

    router.get("/api/get_orders", async (req : any, res : any)  => {
        const orders = await orderService.getOrders();
        res.json(orders);
    });
    router.delete("/api/delete_order/:id", async (req : any, res : any)  => {
        const id = req.params.id;
        const orders = await orderService.deleteOrder(id);
        res.json(orders);
    });

    return router;
}