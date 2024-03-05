import { Lock } from 'lucide-react';

import { auth } from '@/lib/auth'
import { getUser } from '@/lib/queries/getUser';
import { getUserForms } from '@/lib/queries/getForm';
import { MAX_FREE_FORMS } from '@/lib/constants';
import FormGenerator from '.'
import { Button } from '../ui/button';
import UpgradeAccountButton from '../navigation/upgrade-account-button';

const FormGeneratorWrapper = async () => {

  const session = await auth();

  if (!session?.user?.id) {
    return (
      <FormGenerator />
    );
  }

  const userId = session.user.id;

  const user = await getUser(userId);
  const isSubscribed = user?.subscribed;

  if (isSubscribed) {
    return (
      <FormGenerator />
    );
  }

  // Not subscribed
  const response = await getUserForms();

  if (response.data && response.data.length >= MAX_FREE_FORMS) {
    return (
      <>
        <Button
          disabled
          className='mr-2'
        >
          <Lock
            className='w-4 h-4 mr-2'
          />
          Create form
        </Button>
        <p>
          Free forms limit reached.
          <UpgradeAccountButton />
        </p>
      </>
    );
  }

  return (
    <FormGenerator />
  )
}

export default FormGeneratorWrapper