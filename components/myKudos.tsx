import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./myKudos.module.css"
import { IUser } from "../interface/User";
import { IKudo } from "../interface/Kudo";

interface IProps {
  kudos: IKudo[];
};

const myKudos = (props: IProps) => {
  /* const { data: session, status } = useSession()
  const loading = status === "loading" */

  return (
    <>
    <div className={styles.myKudosContainer}>
      <p>My kudos</p>
    </div>

    {props.kudos.map(kudo => {
      return (
        <div className={styles.kudoCard}>
          <p>Message: {kudo.message}</p>
          <p>From: {kudo.from}</p>
        </div>
      )
    })}
    </>
  )
}

export default myKudos;
