"use client";

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ManageSubscriptionProps {
  userId: string;
}

const ManageSubscription = ({
  userId,
}: ManageSubscriptionProps) => {

  const router = useRouter();

  const handleClick = async () => {
    try {
      const { url } = await fetch('/api/stripe/create-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

      }).then((res) => res.json());

      router.push(url.url);
    } catch (error) {
      console.error('##### redirect to portal error', error);

    }
  }

  return (
    <Button
      onClick={handleClick}
    >
      Change your subscription
    </Button>
  )
}

export default ManageSubscription