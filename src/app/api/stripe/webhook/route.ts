import Stripe from 'stripe';

import { stripe } from '@/lib/stripe';
import { updateUserStripeCustomerSubscription } from '@/lib/queries/mutateUser';

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
  'customer.subscription.created',
])

export async function POST(req: Request) {
  const signature = req.headers.get('stripe-signature') as string;

  if (!signature) return null;

  const body = await req.text();

  const event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!,
  );

  const data = event.data.object as Stripe.Subscription;

  if (relevantEvents.has(event.type)) {
    switch (event.type) {
      case 'customer.subscription.created':
        await updateUserStripeCustomerSubscription(
          data.customer as string,
          true,
        )
        break;

      case 'customer.subscription.deleted':
        await updateUserStripeCustomerSubscription(
          data.customer as string,
          false,
        )
        break;

      default:
        break;
    }
  }

  return new Response(
    JSON.stringify({ received: true }),
    {
      status: 200,
    }
  );
}