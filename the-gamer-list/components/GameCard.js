import style from "../styles/GameCard.module.css";
import Link from "next/link";

export default function GameCard(props) {

  let image = props.game.image_url;

  return (
    <Link href={`/game/${props.game.id}`}>
      <a>
        <div className={`row ${style.card}`}>
          <div className={`col-3 p-0 ${style.image_col}`} style={{backgroundImage:`url(${image})`}}>
            
          </div>
          <div className="col-8 px-3">
            <p className={style.card_title}>{props.game.title}</p>
            <p className={style.card_info}>{props.game.date}</p>
            <p className={style.card_info}>{props.game.platform}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
