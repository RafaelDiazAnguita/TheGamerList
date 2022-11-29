import Layout from "../../components/Layout";
import { select } from "../../lib/db";
import style from "../../styles/Game.module.css";

export default function GameScreen({ gameInfo }) {
  const game = gameInfo.game;
  const images = gameInfo.images;

  return (
    <div>
      <Layout pageTitle="Game">
        <div className="text-center">
          <img src={game.image_url} className="mb-5" />
        </div>
        <div className={`container p-3 mb-5 ${style.info_block}`}>
          <h1 className="mb-3">{game.title}</h1>

          <p className="mb-5">{game.description}</p>

          <h4 className="d-inline">Genre: </h4>
          <h4 className={`d-inline ms-4 ${style.feature}`}>{game.genre}</h4>

          <br></br>
          <br></br>

          <h4 className="d-inline">Players: </h4>
          <h4 className={`d-inline ms-4 ${style.feature}`}>{game.players}</h4>

          <br></br>
          <br></br>

          <h4 className="d-inline">Publisher: </h4>
          <h4 className={`d-inline ms-4 ${style.feature}`}>{game.publisher}</h4>

          <br></br>
          <br></br>

          <h4 className="d-inline">Cooperative: </h4>
          <h4 className={`d-inline ms-4 ${style.feature}`}>{game.co_op}</h4>
        </div>

        <div className="container">
          <div className="row row-cols-3">
            {images.map((x) => (
              <div className="col">
                <img className={style.image_extra} src={x.image_url} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const id = params.id;

  let game = [];
  let images = [];

  try {
    game = await select(["*"], ["game"], ["id = " + id], [], []);
    images = await select(["*"], ["game_image"], ["game_id = " + id], [], []);
  } catch (e) {
    throw e;
  }

  const gameInfo = {
    game: game[0],
    images: images,
  };

  return {
    props: {
      gameInfo,
    },
  };
}
