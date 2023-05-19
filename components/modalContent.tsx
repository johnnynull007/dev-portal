import { useSession } from "next-auth/react";
import Parse from "parse"
import styles from "./footer.module.css"

export default function ModalContent() {
    const { data } = useSession();
    const username:string = data?.user?.name ? data?.user.name : "";

    const sendKudosToReciever = async() => {
        console.log('here');
        const kudo = new Parse.Object('kudos');
        kudo.set('from', username);
        kudo.set('to', 'kanir-l');
        kudo.set('message', 'Can you see this?');
        kudo.set('email', 'kr@kanir.se')
        console.log(kudo);
        try {
            const result = await kudo.save();
            // Access the Parse Object attributes using the .GET method
            console.log('ParseObject created', result);
        } catch (error) {
            console.error('Error while creating ParseObject: ', error);
        }
    }

  return (
    <div style={{width: '40vw', height: '40vh'}}>
        <h2>Give Kudos</h2>
        <div>
            <p>To who</p>
            <input type="text" />
            <p>Message</p>
            <textarea/>
            <button onClick={() => sendKudosToReciever()}>Send</button>
        </div>
    </div>
  )
}
