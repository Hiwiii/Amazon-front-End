import { onRequest } from "firebase-functions/v2/https";
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import functions from 'firebase-functions';

const app = express();
const stripe = new Stripe(functions.config().stripe.key, { apiVersion: '2020-08-27' });

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    console.log('Payment intent request received for amount:', amount);
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount),
            currency: 'gbp',
        });

        console.log('Payment intent created:', paymentIntent);
        res.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error.message);
        res.status(500).send({ error: error.message });
    }
});

// Port configuration for local development
const port =  8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export const api = onRequest(app);
