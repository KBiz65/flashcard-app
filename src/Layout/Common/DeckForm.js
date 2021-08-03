import React, { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { updateDeck, createDeck } from "../../utils/api";

function DeckForm({
  name = "Deck Name",
  description = "A brief description of the deck",
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
  const [toEdit, setToEdit] = useState(false);

  useEffect(() => {
    if (url === "/decks/new") {
      setToEdit(false);
    }
    if (url === `/decks/${deckId}/edit`) {
      setToEdit(true);
    }
  }, [toEdit, url, deckId]);

  function handleSubmit(event) {
    event.preventDefault();
    const abortCtrl = new AbortController();

    if (!toEdit) {
      createDeck(deckInfo, abortCtrl.signal).then((response) => {
        // gets the newly created deckId from createDeck function and
        // takes user to that deck view.
        history.push(`/decks/${response.id}`);
      });
    }

    if (toEdit) {
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
      if (!toEdit) {
        history.push("/");
      } else {
        history.push(`/decks/${deckId}`);
      }
    }
  }

  if (toEdit && deckInfo.id) {
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
            defaultValue={deckInfo.name}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={changeHandler}
            rows="4"
            defaultValue={deckInfo.description}
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
  } else {
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
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            onChange={changeHandler}
            rows="4"
            placeholder={deckInfo.description}
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
}

export default DeckForm;
