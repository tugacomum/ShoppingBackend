const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

router.post("/createcart", async (req, res) => {
    try {
        const cart = req.body;
        const newcart = new Cart({
            ...cart
        });
        await newcart.save();
        res.send(newcart);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/getusercart", async (req, res) => {
    try {
        const cartId = req.body.cartId;
        const cart = await Cart.findOne({ _id: cartId });
        res.send(cart);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get("/getallcarts/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const cart = await Cart.find({ userId });
        res.send(cart);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.patch("/addproducttocart", async (req, res) => {
    try {
        const params = req.body;
        const cart = await Cart.findOne({ _id: params.cartId });
        if (!cart) {
            return res.status(400).json({ error: "Cart not found" });
        }
        const products = req.body.products;
        cart.products = products;
        await cart.save();
        res.send(cart);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/finishbuy", async (req, res) => {
    try {
        const params = req.body;
        const cart = await Cart.findOne({ _id: params.cartId });
        if (!cart) {
            return res.status(400).json({ error: "Cart not found" });
        }
        cart.isPaid = true;
        cart.isActive = false;
        await cart.save();
        res.send(cart);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;