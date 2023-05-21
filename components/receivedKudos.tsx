import styles from "./receivedKudos.module.css"
import { IKudo } from "../interface/Kudo";

interface IProps {
  kudos: IKudo[];
};

const receivedKudos = (props: IProps) => {

  return (
    <>
     <p>Kudos I've received</p>
      <div className={styles.myKudosContainer}>
        {props.kudos?.map((kudo, index) => {
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
