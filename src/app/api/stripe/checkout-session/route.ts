import { createStripeCustomer, stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/queries/getUser";
import { updateUserStripeCustomerId } from "@/lib/queries/mutateUser";

export async function POST(req: Request) {
  const { price, quantity = 1 } = await req.json();

  const userSession = await auth();

  if (!userSession?.user?.id) {
    return new Response(
      JSON.stringify({
        error: 'Unauthorized',
      }),
      {
        status: 401
      }
    )
  }

  const {
    id: userId,
    email: userEmail,
  } = userSession.user;


  const user = await getUser(userId);

  let customer;

  if (user?.stripeCustomerId) {
    customer = { id: user.stripeCustomerId };
  } else {

    const response = await createStripeCustomer(userId);

    customer = { id: response.id }

    await updateUserStripeCustomerId(
      userId,
      customer.id,
    );
  }


  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: `${baseUrl}/payment/success`,
    customer: customer.id,
    payment_method_types: ['card'],
    line_items: [
      {
        price,
        quantity,
      },
    ],
    mode: 'subscription',
  });

  if (checkoutSession) {
    return new Response(
      JSON.stringify({
        sessionId: checkoutSession.id,
      }),
      {
        status: 200
      }
    )
  } else {
    return new Response(
      JSON.stringify({
        error: 'Failed to create checkout session',
      }),
      {
        status: 500
      }
    )
  }
}