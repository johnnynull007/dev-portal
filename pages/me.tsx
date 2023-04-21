import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import Parse from "parse"
import RecievedKudos from "../components/receivedKudos"
<<<<<<< HEAD
<<<<<<< HEAD
import SentKudos from "../components/sentKudos"
=======
import SentKudos from "../components/receivedKudos"
>>>>>>> 28e64c4 (Change the names)
import { useState } from "react"
=======
import SentKudos from "../components/sentKudos"
import { useEffect, useState } from "react"
import  { IKudo } from "../interface/Kudo";
import sentKudos from "../components/sentKudos"

interface IProps {
  kudos: IKudo[];
};

>>>>>>> bbce3d1 (Fetching from database)

export default function MePage() {
  const { data } = useSession()
  const [recievedKudous, setRecievedKudos] = useState([]) //Mock Data
  const [sentKudos, setSentKudos] = useState([]) //Mock Data

  const username:string = data?.user?.name ? data?.user.name : "";

  async function fetchRecievedKudos() {
    let userKudos = [];
    let parseQuery = new Parse.Query('kudos');
    parseQuery.contains('from', username);
    let queryResults = await parseQuery.find();
    for (let result of queryResults) {
      console.log("FOUND", result.get("message"))
      const kudosObject = {
        objectId: result.get("objectId"),
        createdAt: result.get("createdAt"),
        updatedAt: result.get("updatedAt"),
        ACL: "ACL",
        from: result.get("from"),
        to: result.get("to"),
        message: result.get("message"),
        email: result.get("email")
      }
      userKudos.push(kudosObject);
    };
     setRecievedKudos(userKudos);
  };

  async function fetchSentKudos() {
    let userKudos = [];
    let parseQuery = new Parse.Query('kudos');
    parseQuery.contains('to', username);
    console.log(parseQuery.contains('to', username))
    let queryResults = await parseQuery.find();
    for (let result of queryResults) {
      const kudosObject = {
        objectId: result.get("objectId"),
        createdAt: result.get("createdAt"),
        updatedAt: result.get("updatedAt"),
        ACL: "ACL",
        from: result.get("from"),
        to: result.get("to"),
        message: result.get("message"),
        email: result.get("email")
      }
      userKudos.push(kudosObject);
    };
     setSentKudos(userKudos);
  };

  // fetchKudos();
  useEffect(() => {
    fetchRecievedKudos();
    fetchSentKudos();
  }, [])

  return (
      <>
       <p>Welcome {JSON.stringify(data?.user?.name)}</p>
        <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
        <RecievedKudos kudos={recievedKudous} />
        <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
        <SentKudos kudos={sentKudos} />
        <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
      </>
  )
}
