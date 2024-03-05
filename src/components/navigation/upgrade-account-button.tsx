import { MAX_FREE_FORMS } from "@/lib/constants";
import { getUserForms } from "@/lib/queries/getForm"
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/queries/getUser";
import { Progress } from "../ui/progress";
import SubscribeButton from "../subscribe-button";

  const UpgradeAccountButton = async () => {

    const session = await auth();

    if (!session || !session?.user?.id) {
      return null;
    }

    const user = await getUser(session.user.id);

    if (user?.subscribed) {
      return null;
    }

    const response = await getUserForms();

    if (!response.success || !response.data) {
      return null;
    }

    const formCount = response.data?.length;
    const percent = Math.min((formCount / MAX_FREE_FORMS) * 100, 100);

    return (
      <div>
        <Progress
          value={percent}
        />
        <p>
          {formCount} out of {MAX_FREE_FORMS} forms generated.
        </p>
        <p>
          <SubscribeButton
            userId={session?.user?.id}
            price="price_1Oqmv7BIhcdImkbfG1BD9ctW"
          /> for unlimited forms.
        </p>
      </div>
    )
  }

  export default UpgradeAccountButton