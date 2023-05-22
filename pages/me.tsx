import { useSession, getSession } from "next-auth/react"
import { GetServerSideProps, NextPage } from "next"
import { useEffect, useState } from 'react';
import Layout from "../components/layout"
import Parse from "parse"
import { encodeParseQuery } from "@parse/react-ssr";
import RecievedKudos from "../components/receivedKudos"
import SentKudos from "../components/sentKudos"
import { IKudo } from "../interface/Kudo";
import { IUser } from "../interface/User";

interface Props {
  user: IUser,
}

const me: NextPage<Props> = ( { user } ) => {
  const [recievedKudos, setRecievedKudos] = useState([{
    createdAt: {},
    email: "",
    from: "",
    message: "",
    to: "",
    updatedAt: {},
  }]);

  const [sentKudos, setSentKudos] = useState([{
    createdAt: {},
    email: "",
    from: "",
    message: "",
    to: "",
    updatedAt: {},
  }]);

  useEffect(()=>{
    const kudos =  new Parse.Query('kudos');
    if (user) {
      kudos.contains('to', user?.name).find().then(data => setRecievedKudos(data.map(a => a.attributes)));
    };
  }, [])

  useEffect(()=>{
    const kudos =  new Parse.Query('kudos');
    if (user) {
       kudos.contains('from', user?.name).find().then(data => setSentKudos(data.map(a => a.attributes)));
    }
  }, [])

  return (
    <Layout>
      {user &&
        <>
          <p>Welcome {user?.name}</p>
          <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
          <RecievedKudos kudos={recievedKudos} />
          <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
          <SentKudos kudos={sentKudos} />
          <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
        </>
      }
      <div></div>
    </Layout>
  )
}

export default me;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context)

  return {
    props: {
        user: session?.user,
    }
  };
};
