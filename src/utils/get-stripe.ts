import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripepromise: Promise<Stripe | null>; // Explicitly typing stripepromise

const getstripe = (): Promise<Stripe | null> => {
    if (!stripepromise) {
        stripepromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    }
    return stripepromise;
}

export default getstripe;
