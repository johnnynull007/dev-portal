import styles from "./receivedKudos.module.css"
import { IKudo } from "../interface/Kudo";

interface IProps {
  kudos: IKudo[];
};

const receivedKudos = (props: IProps) => {
  const colours = ["#7B4454", "#4E3D46", "#3C354B", "#42345F", "#805A65", "#5F5772"];
  const getBGColour = () => colours[Math.floor(Math.random() * colours.length)];

  return (
    <>
     <p>Kudos I've received</p>
      <div className={styles.myKudosContainer}>
        {props.kudos?.map((kudo, index) => {
          return (
            <div key={index} className={styles.kudoCard} style={{backgroundColor: getBGColour()}}>
              <div>
                <p>Message:</p>
                <p className={styles.message}>"{kudo.message}"</p>
              </div>
              <p>From: {kudo.from}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default receivedKudos;
