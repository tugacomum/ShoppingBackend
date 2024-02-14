const express = require("express");
const router = express.Router();
const Ticket = require("../models/ticket");

router.post("/createticket", async (req, res) => {
  const ticket = req.body;
  try {
    const newticket = new Ticket({
        ...ticket
    });
    await newticket.save();
    res.send("Ticket Created Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get('/getalltickets', async (req, res) => {
    try {
        const tickets = await Ticket.find({});
        res.send(tickets);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post('/hasticket', async (req, res) => {
    try {
        const params = req.body;
        const ticket = await Ticket.findOne({ userId: params.userId, productId: params.productId, cartId: params.cartId });
        res.json({ exists: !!ticket });
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.get('/getusertickets', async (req, res) => {
    try {
        const userId = req.body.userId;
        const tickets = await Ticket.find({ userId });
        res.send(tickets);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post('/getuserticket', async (req, res) => {
    try {
        const params = req.body;
        const ticket = await Ticket.findOne({ cartId: params.cartId, userId: params.userId, productId: params.productId });
        res.send(ticket);
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.patch('/responseticket', async (req, res) => {
    try {
        const params = req.body;
        const ticket = await Ticket.findOne({ _id: params.ticketId });
        if (!ticket) {
            return res.status(400).json({ error: "Ticket not found" });
        }
        ticket.response = params.response;
        ticket.isActive = false;
        await ticket.save();
        res.send("Ticket Updated Successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.patch('/updateticket', async (req, res) => {
    try {
        const params = req.body;
        const ticket = await Ticket.findOne({ _id: params.ticketId });
        if (!ticket) {
            return res.status(400).json({ error: "Ticket not found" });
        }
        ticket.description = params.description;
        await ticket.save();
        res.send("Ticket Updated Successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

module.exports = router;