import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./receivedKudos.module.css"
import { IUser } from "../interface/User";
import { IKudo } from "../interface/Kudo";

interface IProps {
  kudos: IKudo[];
};

const receivedKudos = (props: IProps) => {
  /* const { data: session, status } = useSession()
  const loading = status === "loading" */

  return (
    <>
    <div className={styles.myKudosContainer}>

    {props.kudos.map((kudo, index) => {
      return (
        <div key={index} className={styles.kudoCard}>
          <p>Message: {kudo.message}</p>
          <p>From: {kudo.from}</p>
        </div>
      )
    })}
    </div>
    </>
  )
}

export default receivedKudos;
