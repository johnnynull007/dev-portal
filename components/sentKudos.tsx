import Parse from "parse"
import { getSession, signIn, signOut, useSession } from "next-auth/react"
import styles from "./sentKudos.module.css"
import { IUser } from "../interface/User";
import { IKudo } from "../interface/Kudo";
import { Modal } from 'react-responsive-modal';
import { useState } from "react";
import 'react-responsive-modal/styles.css';
import ModalContent from "./modalContent";

interface IProps {
  kudos: IKudo[];
};

const sentKudos = (props: IProps) => {
  const [open, setOpen] = useState(false);
  console.log(props);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const colours = ["#7B4454", "#4E3D46", "#3C354B", "#42345F", "#805A65", "#5F5772"];
  const getBGColour = () => colours[Math.floor(Math.random() * colours.length)];

  return (
    <>
    <div className={styles.kudosButtonsContainer}>
      <p>All sent Kudos</p>
      <button
        className={styles.giveKudosButton}
        onClick={() => onOpenModal()} >
        Give Kudos
      </button>
    </div>

    <div className={styles.myKudosContainer}>
    {props.kudos.map((kudo, index) => {
      return (
        <>
        <div key={index} className={styles.kudoCard}>
          <div className={styles.kudoTop} style={{backgroundColor: getBGColour()}}>
            <p className={styles.name}>To: {kudo.to}</p>
            <div className={styles.kudo}>
              <p className={styles.message}>"{kudo.message}"</p>
            </div>
           </div>
        </div>
        </>
      )
    })}
     </div>
     <Modal open={open} onClose={onCloseModal} center showCloseIcon={false}>
        <ModalContent userList={props.usersList}/>
     </Modal>
    </>
  )
}

export default sentKudos;
