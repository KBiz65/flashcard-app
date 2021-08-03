import React, { useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { updateDeck, createDeck } from "../../utils/api";

function DeckForm({
  name,
  description,
  namePlaceholder,
  descriptionPlaceholder,
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
        // gets the newly created deckId from createDeck function and
        // takes user to that deck view.
        history.push(`/decks/${response.id}`);
      });
    }

    if (url === `/decks/${deckId}/edit`) {
      updateDeck(deckInfo, abortCtrl.signal);
      // once the deck is updated the page can refresh to show the update
      history.go(0);
    }
  }

  // makes sure the input value is controlled and continuously updated
  function changeHandler(event) {
    event.preventDefault();
    setDeckInfo({
      ...deckInfo,
      [event.target.name]: event.target.value,
    });
  }

  function handleButtonClick(event) {
    event.preventDefault();

    // if user cancels when creating a new deck it will bring them
    // back to the home page. If they are editing a deck cancel will
    // just bring up that deck view again
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
          placeholder={namePlaceholder}
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
          placeholder={descriptionPlaceholder}
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
