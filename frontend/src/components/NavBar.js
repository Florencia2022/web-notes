import React, { useState } from "react";
import "../styles/navBar.css";
import {
  handleArchivedNotes,
  handleMyNotes,
} from "./mainComponents/utils/hooks";

const NavBar = ({ setIsArchivedPage }) => {
  const [selectedOption, setSelectedOption] = useState("misNotas");

  return (
    <nav>
      <div
        onClick={() => handleMyNotes(setSelectedOption, setIsArchivedPage)}
        className={selectedOption === "misNotas" ? "focused" : ""}
      >
        <h3>Mis Notas</h3>
      </div>
      <div
        onClick={() =>
          handleArchivedNotes(setSelectedOption, setIsArchivedPage)
        }
        className={selectedOption === "notasArchivadas" ? "focused" : ""}
      >
        <h3>Notas Archivadas</h3>
      </div>
    </nav>
  );
};

export default NavBar;
