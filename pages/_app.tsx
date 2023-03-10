import { SessionProvider } from "next-auth/react"
import "./styles.css"

import type { AppProps } from "next/app"
import type { Session } from "next-auth"
// Import Parse minified version
import Parse from "parse"

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = 'g4CUc7NmgEMdYHzV3ZVRb8hjwxI4fKXmyyg5PMPr';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'bU0tRiCpluJfrAUd7xssaQrGyLZtXGPg9tIDOnYU';
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
