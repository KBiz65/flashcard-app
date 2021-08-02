import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { updateDeck } from "../../utils/api";

function DeckForm({
  name = "Deck Name",
  description = "Brief description of the deck",
}) {
  const {
    params: { deckId },
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
    updateDeck(deckInfo, abortCtrl.signal);
    history.go(0);
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
      history.push(`/decks/${deckId}`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group mt-3">
        <label htmlFor="form-name">Name</label>
        <input
          type="text"
          class="form-control"
          id="form-name"
          name="name"
          onChange={changeHandler}
          placeholder={deckInfo.name}
          value={deckInfo.name}
        ></input>
        <label htmlFor="form-description" className="mt-3">
          Description
        </label>
        <textarea
          type="text"
          class="form-control"
          id="form-description"
          name="description"
          onChange={changeHandler}
          placeholder={deckInfo.description}
          rows="4"
          value={deckInfo.description}
        ></textarea>
      </div>
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
    </form>
  );
}

export default DeckForm;
