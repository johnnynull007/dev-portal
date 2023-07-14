import Parse from "parse"
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
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const colours = ["#7B4454", "#4E3D46", "#3C354B", "#42345F", "#805A65", "#5F5772"];
  const getBGColour = () => colours[Math.floor(Math.random() * colours.length)];
  const query = new Parse.Query('users');
  const userlist = () => {
    query.findAll().then((results) => {
      console.log(results.map(result => result.attributes));
      return results.map(result => result.attributes);
    }).catch((error) =>  {
     console.log(error);
     return [];
    });
  };

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
        <div key={index} className={styles.kudoCard} style={{backgroundColor: getBGColour()}}>
          <p>To: {kudo.to}</p>
          <p>Message:</p>
          <p className={styles.message}>"{kudo.message}"</p>
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
