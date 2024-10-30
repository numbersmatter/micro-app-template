import { redirect } from '@remix-run/node';
import { db } from '~/lib/db/db.server';

const getPageData = async ({ userId }: { userId: string }) => {
  const userProfileDoc = await db.users().read({ id: userId });

  if (!userProfileDoc) {
    throw redirect('/language');
  }


  const language = userProfileDoc.language;

  return {  language };
};

export { getPageData };