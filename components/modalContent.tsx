import { useSession } from "next-auth/react";
import Parse from "parse"
import { useState } from "react";
import styles from "./footer.module.css"

export default function ModalContent({ userList }) {
    const { data } = useSession();
    const [reciever, setReciever] = useState("");
    const [message, setMessage] = useState("");
    const [messageIsSent, setMessageIsSent] = useState(false);
    const username:string = data?.user?.name ? data?.user.name : "";

    const sendKudosToReciever = async() => {
        const kudo = new Parse.Object('kudos');
        kudo.set('from', username);
        kudo.set('to', reciever);
        kudo.set('message', message);
        kudo.set('email', 'kr@kanir.se')
        try {
            const result = await kudo.save();
            // Access the Parse Object attributes using the .GET method
            console.log('ParseObject created', result);
            setReciever("");
            setMessage("");
            setMessageIsSent(true)
        } catch (error) {
            console.error('Error while creating ParseObject: ', error);
        }
    }

  return (
    <div style={componentStyles.container}>
        <h2 style={componentStyles.header}>Give Kudos</h2>
        <div>
            <p style={componentStyles.header}>To who</p>
            {/* <input type="text" onChange={(e) => setReciever(e.target.value)} /> */}
            <select style={{ width: 150 }} onChange={e => setReciever(e.target.value)}>
                <option>----</option>
                {userList.map(user => {
                    return <option key={user.alias}>{user.alias}</option>
                })}
            </select>
            <p style={componentStyles.header}>Message</p>
            <textarea rows={6} cols={80} onChange={(e) => setMessage(e.target.value)} />
            <button style={componentStyles.submitBtn} onClick={() => sendKudosToReciever()}>Send</button>
           {messageIsSent && <p style={componentStyles.header}>Message sent</p>}
        </div>
    </div>
  )
}

export const componentStyles = {
    submitBtn: {
        borderRadius: 25,
        display: "block",
        width: "8rem",
        backgroundColor: "#7B4454",
        color: 'white',
        fontSize: 18,
        marginTop: 20
    },
    header: {
        color: "purple"
    },
    container: {
        background: "rgb(255,255,255) linear-gradient(306deg, rgba(123,34,195,1) 0%, rgba(255,255,255,1) 75%)",
        width: "35vw",
        height: "40vh",
        overflow: "hidden",
    }
}
