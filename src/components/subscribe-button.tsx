"use client";

import { useRouter } from "next/navigation";

import { getStripe } from "@/lib/stripe-client";

interface SubscribeButtonProps {
  userId?: string;
  price: string;
}

const SubscribeButton = ({
  userId,
  price,
}: SubscribeButtonProps) => {

  const router = useRouter();

  const handleCheckout = async (price: string) => {
    if (!userId) {
      router.push('/login');
    }

    try {
      const { sessionId } = await fetch('/api/stripe/checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price })
      }).then((res) => res.json());

      console.log('##### sessionId', sessionId);

      const stripe = await getStripe();
      stripe?.redirectToCheckout({ sessionId });

    } catch (error) {
      console.error('##### SubscribeButton handleCheckout error', error);
    }
  }


  return (
    <button
      className="underline"
      onClick={() => handleCheckout(price)}
    >
      Upgrade your plan
    </button>
  )
}

export default SubscribeButton