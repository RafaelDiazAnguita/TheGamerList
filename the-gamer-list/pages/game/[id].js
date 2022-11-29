import Layout from "../../components/Layout";
import { select } from "../../lib/db";
import Image from "next/image";

export default function GameScreen({ gameInfo }) {

  return (
    <div>
      <Layout pageTitle="Game">
        <div className="text-center">
          <img src={gameInfo.image_url} className="mb-5"/>
          <h2>{gameInfo.title}</h2>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  let game = [];

  try {
    game = await select(["*"], ["game"], ["id = " + id], [], []);
  } catch (e) {
    throw e;
  }

  return {
    props: {
      gameInfo: game[0],
    },
  };
}
