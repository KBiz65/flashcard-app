import React from "react";

import Breadcrumb from "../Common/Breadcrumb";
import DeckForm from "../Common/DeckForm";

function CreateDeck() {
  return (
    <div>
      <Breadcrumb navArray={[{ name: "Create Deck" }]} />
      <h2>Create Deck</h2>
      <DeckForm
        namePlaceholder="Deck Name"
        descriptionPlaceholder="A brief description of the deck."
      />
    </div>
  );
}

export default CreateDeck;
