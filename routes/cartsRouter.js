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
        res.send("Cart Created Successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get("/getusercart", async (req, res) => {
    try {
        const userId = req.body.userId;
        const cart = await Cart.findOne({ userId });
        res.send(cart);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get("/getallcarts", async (req, res) => {
    try {
        const userId = req.body.userId;
        const cart = await Cart.find({ userId });
        res.send(cart);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.patch("/addproducttocart", async (req, res) => {
    try {
        const params = req.body;
        const cart = await Cart.findOne({ cartId: params.cartId });
        if (!cart) {
            return res.status(400).json({ error: "Cart not found" });
        }
        const products = req.body.products;
        cart.products = products;
        await cart.save();
        res.send("Product(s) added to cart");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;