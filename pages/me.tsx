import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import Parse from "parse"

export default function MePage() {
  const { data } = useSession()
  async function fetchPerson() {
    console.log('Running')
    // create your Parse Query using the Person Class you've created
    const query = new Parse.Query('kudos');
    // run the query
    const kudo = await query.first();
    console.log('person name: ', kudo.get('from'));
    // access the Parse Object attributes
  }

  fetchPerson();

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}
