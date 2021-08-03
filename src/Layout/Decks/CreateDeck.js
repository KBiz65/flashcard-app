import React, { useState, useEffect } from "react";

import Breadcrumb from "../Common/Breadcrumb";
import DeckForm from "./DeckForm";

function CreateDeck() {
  return (
    <div>
      <Breadcrumb navArray={[{ name: "Create Deck" }]} />
      <h2>Create Deck</h2>
      <DeckForm />
    </div>
  );
}

export default CreateDeck;
