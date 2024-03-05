import { auth } from "@/lib/auth";
import { getUser } from "@/lib/queries/getUser";
import { updateUserStripeCustomerId } from "@/lib/queries/mutateUser";
import { createStripeCustomer, stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401 },
    );
  }

  const userId = session.user.id;

  const user = await getUser(userId);

  if (!user) {
    return new Response(
      JSON.stringify({ error: 'User not found' }),
      { status: 404 },
    );
  }

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

  const url = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL!}/settings`,
  });

  return new Response(
    JSON.stringify({ url }),
    { status: 200 }
  )
}