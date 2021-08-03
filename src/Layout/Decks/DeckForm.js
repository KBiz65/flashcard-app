import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { updateDeck, createDeck } from "../../utils/api";

function DeckForm({
  name = "Deck Name",
  description = "Brief description of the deck",
}) {
  const {
    url,
    params: { deckId = null },
  } = useRouteMatch();

  const history = useHistory();

  const [deckInfo, setDeckInfo] = useState({
    id: deckId,
    name: name,
    description: description,
  });

  function handleSubmit(event) {
    event.preventDefault();
    const abortCtrl = new AbortController();

    if (url === "/decks/new") {
      createDeck(deckInfo, abortCtrl.signal).then((response) => {
        history.push(`/decks/${response.id}`);
      });
    }

    if (url === `/decks/${deckId}/edit`) {
      updateDeck(deckInfo, abortCtrl.signal);
      history.go(0);
    }
  }

  function changeHandler(event) {
    event.preventDefault();
    setDeckInfo({
      ...deckInfo,
      [event.target.name]: event.target.value,
    });
  }

  function handleButtonClick(event) {
    event.preventDefault();
    if (event.target.name === "cancel") {
      if (url === "/decks/new") {
        history.push("/");
      } else {
        history.push(`/decks/${deckId}`);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="form-name">Name</label>
        <input
          type="text"
          className="form-control"
          id="form-name"
          name="name"
          onChange={changeHandler}
          placeholder={deckInfo.name}
          value={deckInfo.name}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          onChange={changeHandler}
          placeholder={deckInfo.description}
          rows="4"
          value={deckInfo.description}
        ></textarea>
      </div>
      <div className="form-group">
        <button
          className="btn btn-secondary"
          name="cancel"
          onClick={handleButtonClick}
        >
          Cancel
        </button>
        <button className="btn btn-info ml-2" name="submit" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default DeckForm;
