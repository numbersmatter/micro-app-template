import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { handleAuth } from './data/auth.server';
import { mutations } from './data/mutations.server';

export const loader = async (args: LoaderFunctionArgs) => {
  await handleAuth(args.request);
  return json({});
};

export const action = async (args: ActionFunctionArgs) => {
  handleAuth(args.request);
  return null;
};

export default function Route() {
  return (
    <div>

    </div>
  )
}