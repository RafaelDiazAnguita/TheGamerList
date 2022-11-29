import Layout from "../components/Layout";
import GameCard from "../components/GameCard";
import style from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import { getNumberOfPages } from "../lib/utils";
import {
  NO_SEARCH_RESULTS,
  AN_ERROR_HAS_OCURRED,
  LOADING,
} from "../lib/messages";
import Script from "next/script";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

export default function Home() {
  const [pageIndex, setPageIndex] = useState(0);
  const [gameTitle, setGameTitle] = useState("");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(
      `/api/games?page=${pageIndex}&title=${gameTitle}&from=${from}&to=${to}`
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setError(data.error);
      });
  }, [loading]);

  function refresh() {
    setLoading(loading + 1);
  }

  function handleSearch() {
    const dates = document.querySelectorAll(".date_picker input");
    const from = dates[0].value;
    const to = dates[1].value;

    if ((from != "" && to == "") || (to != "" && from == "")) {
      alert("From and To needed");
      return;
    } else if (from != "" && to != "") {
      setFrom(from);
      setTo(to);
    }

    refresh();
  }

  function handleReset() {
    setPageIndex(0);
    setGameTitle("");
    setFrom(null);
    setTo(null);
    refresh();
  }

  let showMessage = error || !data || data.count == 0;
  let message = "";

  if (error) message = AN_ERROR_HAS_OCURRED;
  if (!data) message = LOADING;
  else if (data.count == 0) message = NO_SEARCH_RESULTS;

  // Message render
  if (showMessage) {
    return (
      <div>
        <Layout pageTitle="Home">
          <div className={`text-center ${style.load_animation}`}>
            <h2 className="mb-5">{message}</h2>
            {message == NO_SEARCH_RESULTS ? (
              <button className={style.pagination_button} onClick={handleReset}>
                Go Back
              </button>
            ) : (
              <></>
            )}
            {message == LOADING ? (
              <lottie-player
                src="load_animation.json"
                background="transparent"
                speed="1"
                style={{ width: "300px", height: "300px" }}
                className={style.load_animation}
                loop
                autoplay
              ></lottie-player>
            ) : (
              <></>
            )}
          </div>
        </Layout>

        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></Script>
      </div>
    );
  }

  // Correct render

  return (
    <div>
      <Layout pageTitle="Home">
        <div className="row mb-5">
          <div className="col-4">
            <div className="input-group mb-3">
              <input
                id="search-bar"
                type="text"
                className="form-control"
                placeholder="Game title"
                aria-label="Username"
                value={gameTitle}
                onChange={(event) => setGameTitle(event.target.value)}
              />
              <button className={style.search_button} onClick={handleSearch}>
                Search
              </button>
              <button className={style.reset_button} onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
          <div className="col-4 date_picker">
            <DatePicker
              label="From"
              value={from}
              inputFormat="yyyy-MM-DD"
              className="mx-3"
              onChange={(newValue) => {
                setFrom(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="To"
              value={to}
              inputFormat="yyyy-MM-DD"
              onChange={(newValue) => {
                setTo(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className="col-4 date_picker"></div>
        </div>

        {data.games.map((x) => (
          <div key={x.id} className="py-2">
            <GameCard game={x} />
          </div>
        ))}

        <div className="row mt-3">
          <div className="col-6 text-end">
            {pageIndex > 0 ? (
              <button
                className={style.pagination_button}
                onClick={() => {
                  setPageIndex(pageIndex - 1);
                  refresh();
                }}
              >
                Previous Page {pageIndex}/{getNumberOfPages(data.count, 12)}
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="col-6">
            {pageIndex + 1 != getNumberOfPages(data?.count, 12) ? (
              <button
                className={style.pagination_button}
                onClick={() => {
                  setPageIndex(pageIndex + 1);
                  refresh();
                }}
              >
                Next Page {pageIndex + 2}/{getNumberOfPages(data?.count, 12)}
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </Layout>
    </div>
  );
}
