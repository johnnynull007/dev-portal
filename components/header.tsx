import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"

// The approach used in this component shows how to build a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>

      {/* <div className={styles.signedInStatus}>
        <p>PLUM</p>
        <span
          className={`nojs-show ${!session && loading ? styles.loading : styles.loaded}`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                } }
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              <div>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar} />
              )}
                <strong>{session.user.email ?? session.user.name}</strong>
              </div>
              <div>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                } }
              >
                Sign out
              </a>
              </div>
            </>
          )}
        </span>
      </div> */}
      <nav>
        <ul className={styles.navItems}>
          {/* <li className={styles.navItem}>
      <Link href="/">Home</Link>
    </li> */}
          {/* <li className={styles.navItem}>
      <Link href="/client">Client</Link>
    </li>
    <li className={styles.navItem}>
      <Link href="/server">Server</Link>
    </li> */}
          {/*  <li className={styles.navItem}>
       <Link href="/api-example">API</Link>
     </li>
     <li className={styles.navItem}>
       <Link href="/admin">Admin</Link>
     </li> */}
          {/*  <li className={styles.navItem}>
       <Link href="/me">Me</Link>
     </li> */}
        </ul>
      </nav>
    </header>
  )
}
