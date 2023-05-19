import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
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
  /* const { data: session, status } = useSession()
  const loading = status === "loading" */

  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
    <div className={styles.kudosButtonsContainer}>
     <p>My activites</p>
      <button
        className={styles.giveKudosButton}
        onClick={() => onOpenModal()} >
        Give Kudos
      </button>
    </div>

    <div className={styles.myKudosContainer}>
    {props.kudos.map((kudo, index) => {
      return (
        <div key={index} className={styles.kudoCard}>
          <p>To: {kudo.to}</p>
          <p>My message: {kudo.message}</p>
        </div>
      )
    })}
     </div>
     <Modal open={open} onClose={onCloseModal} center>
        <ModalContent />
     </Modal>
    </>
  )
}

export default sentKudos;
