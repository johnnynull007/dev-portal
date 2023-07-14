import { getSession } from "next-auth/react"
import { GetServerSideProps, NextPage } from "next"
import { useEffect, useState } from 'react';
import Image from 'next/image'
import Head from "next/head"
import Layout from "../components/layout"
import Parse from "parse"
import RecievedKudos from "../components/receivedKudos"
import SentKudos from "../components/sentKudos"
import { IKudo } from "../interface/Kudo";
import { IUser } from "../interface/User";


const me: NextPage<Props> = ( { user } ) => {
 
  //console.log(usersList)
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

  const [usersList, setUsersList] = useState([]);

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

  useEffect(()=>{
    const query = new Parse.Query('users');
    query.findAll().then((results) => {
      console.log(results.map(result => result.attributes));
      setUsersList(results.map(result => result.attributes));
    }).catch((error) =>  {
     console.log(error);
     return [];
    });
  },[])

  return (
    <Layout>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap" rel="stylesheet"></link>
      </Head>
      {user &&
        <>
          <div style={{width: "100%", display: "flex", alignItems: "center"}}>
            <div style={{width: "50%"}}>
              <Image src="/PLUM.png" alt="me" width="80" height="20" />
            </div>
            <div style={{width: "50%", textAlign: "right"}}>
              <p>Welcome {user?.name}</p>
            </div>
          </div>
          <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
          <RecievedKudos kudos={recievedKudos} />
          <div style={{width: "100%", height: "0.5px", background: "#EBEBEB", margin: "20px 0 10px 0"}}></div>
          <SentKudos kudos={sentKudos} usersList={usersList}/>
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
