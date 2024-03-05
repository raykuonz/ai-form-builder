import Stripe from 'stripe';

export const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!,
  {
    apiVersion: '2023-10-16',
    typescript: true,
  }
);

export const createStripeCustomer = async (
  userId: string,
) => {
  const customerData: {
    metadata: {
      dbId: string,
    },
  } = {
    metadata: {
      dbId: userId,
    },
  }

  const response = await stripe.customers.create(customerData);

  return response;
}