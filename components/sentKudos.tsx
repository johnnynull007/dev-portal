import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./sentKudos.module.css"
import { IUser } from "../interface/User";
import { IKudo } from "../interface/Kudo";

interface IProps {
  kudos: IKudo[];
};

const sentKudos = (props: IProps) => {
  /* const { data: session, status } = useSession()
  const loading = status === "loading" */

  return (
    <>
    <div className={styles.myKudosContainer}>
      <p>My activites</p>
      <button
        className={styles.giveKudosButton}
        onClick={(e) => {e.preventDefault()}} >
        Give Kudos
      </button>
    </div>

    {props.kudos.map(kudo => {
      return (
        <div className={styles.kudoCard}>
          <p>To: {kudo.to}</p>
          <p>My message: {kudo.message}</p>
        </div>
      )
    })}
    </>
  )
}

export default sentKudos;
