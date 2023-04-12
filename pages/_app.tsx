import { getSession, SessionProvider } from "next-auth/react"
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
console.log("APP IS RUN")
const checkLoggedIn = async() => {
  getSession().then(async (response) => {
    console.log(response)
    if(response) {
      try {
        const query = new Parse.Query('users');
        // use the equalTo filter to look for user which the name is John. this filter can be used in any data type
        query.equalTo('alias', response.user?.name);
        // run the query
        const exist = await query.first();

        console.log(exist)
        if(!exist) {
          const Person = new Parse.Object('users');
          // define the attributes you want for your Object
          Person.set('alias', response.user?.name);
          Person.set('email', response.user?.email);
          // save it on Back4App Data Store
          await Person.save();
          alert('Person saved!');
        }
       
      } catch (error) {
        console.log('Error saving new person: ', error);
      }
    }
  });
}
checkLoggedIn();

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
