// stripe
import Stripe from "stripe";
import { getPaymentCollection } from "../config/db.js";

const stripe = Stripe(`${process.env.PAYMENT_API}`);
export const paymentIntregationController = async (req, res) => {
  const paymentInfo = req.body;
  const cost = parseInt(paymentInfo.cost * 100);
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: paymentInfo.name,
          },
          unit_amount: cost,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    customer_email: paymentInfo.email,
    metadata: {
      name: paymentInfo.name,
      id: paymentInfo.id,
    },
    success_url: `${process.env.SITE_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.SITE_DOMAIN}/payment-cancel`,
  });
  console.log("session", session);

  res.send({ url: session.url });
};

// payment succeess controller
export const paymentSuccessController = async (req, res) => {
  const paymentCollection = getPaymentCollection();
  const session_id = req.query.session_id;

  const session = await stripe.checkout.sessions.retrieve(session_id);
  console.log("session from success-controller", session);

  if (session.payment_status === "paid") {
    const existing = await paymentCollection.findOne({
      customer_email: session.customer_email,
      id: session.metadata.id,
    });

    if (existing) {
      return res.send({ message: "Payment already recorded" });
    }

    const result = await paymentCollection.insertOne({
      customer_email: session.customer_email,
      cost: session.amount_total / 100,
      id: session.metadata.id,
      name: session.metadata.name,
    });

    console.log("session from success-controller", session, result);

    return res.send({ result });
  }
  return res.send({ message: "Error" });
};

// SSL COMMERZ
