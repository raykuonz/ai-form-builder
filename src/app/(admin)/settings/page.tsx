import { auth, signIn } from "@/lib/auth";
import { getUser } from "@/lib/queries/getUser";
import ManageSubscription from "./_components/manage-subscription";

const SettingsPage = async () => {

  const session = await auth();

  if (!session || !session.user?.id) {
    signIn();
    return null;
  }

  const user = await getUser(session.user.id);
  const plan = user?.subscribed ? 'pro' : 'free';

  return (
    <div>
      <h2
        className="text-4xl mb-3"
      >
        Subscription details
      </h2>
      <p>
        You are currently on a {plan} plan.
      </p>
      <ManageSubscription
        userId={session.user.id}
      />
    </div>
  )
}

export default SettingsPage;