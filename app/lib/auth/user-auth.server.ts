import {
  LoaderFunctionArgs,
  redirect,
  Session,
  SessionData,
} from "@remix-run/node";
import { destroySession, getSession } from "./sessions.server";
import {
  checkSessionCookie,
  getFirebaseUser,
} from "../firebase/auth/auth.server";
import { getServerEnv } from "../env-variables.server";

const { SIGN_IN_PATH } = getServerEnv();

const checkAuth = async (args: LoaderFunctionArgs) => {
  // firebase auth setup
  const session = await getSession(args.request.headers.get("cookie"));
  const { uid } = await checkSessionCookie(session);
  if (!uid) {
    return {
      authenticated: false,
    };
  }
  return { authenticated: true };
};

const redirectToLogin = async (session: Session<SessionData, SessionData>) => {
  throw redirect(SIGN_IN_PATH, {
    headers: { "Set-Cookie": await destroySession(session) },
  });
};

const requireAuth = async (args: LoaderFunctionArgs) => {
  const session = await getSession(args.request.headers.get("cookie"));
  const { uid } = await checkSessionCookie(session);
  if (!uid) {
    throw redirectToLogin(session);
  }

  const user = await getFirebaseUser(uid);

  return {
    uid,
    user,
  };
};
