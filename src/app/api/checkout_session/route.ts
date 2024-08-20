import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

const formatAmountForStripe = (amount: number): number => {
  return Math.round(amount * 100);
};

export async function POST(req: NextRequest) {
  // Get the origin from the request headers
  const origin = req.headers.get('origin') || req.headers.get('host');
  
  if (!origin) {
    return NextResponse.json({ error: 'Origin not found' }, { status: 400 });
  }

  const params: Stripe.Checkout.SessionCreateParams = {
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Pro Subscription",
          },
          unit_amount: formatAmountForStripe(10),
          recurring: {
            interval: "month",
            interval_count: 1
          }
        },
        quantity: 1
      },
    ],
    mode: 'subscription',
    success_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/result?session_id={CHECKOUT_SESSION_ID}`,
  };

  try {
    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);
    return NextResponse.json(checkoutSession, { status: 200 });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}
