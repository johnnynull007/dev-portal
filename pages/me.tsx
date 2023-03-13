import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import Parse from "parse"
import MyKudos from "../components/myKudos"
import MyActivities from "../components/myActivities"
import { useState } from "react"

export default function MePage() {
  const { data } = useSession()
  const username = "kani";
  const [kudos, setKudos] = useState([{
    objectId: "ABC",
    createdAt: new Date(),
    updatedAt: new Date(),
    ACL: "ACL",
    from: "johnny",
    to: "kani",
    message: "good job",
    email: "kr@kanir.se"
  }]) //Mock Data


  async function fetchKudos() {
    const query = new Parse.Query('kudos');
    const kudos = await query.first();
    const userKudos = kudos?.get('email')
    /* setKudos(userKudos); */
  };

  fetchKudos();

  return (
    <Layout>
      <>
       <p>Welcome {JSON.stringify(data?.user?.name)}</p>
        <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
        {console.log(JSON.stringify(data, null, 2))}
        <MyKudos kudos={kudos} />
        <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
        <MyActivities kudos={kudos} />
        <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
      </>
    </Layout>
  )
}
