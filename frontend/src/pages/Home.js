import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { useGetNotes, usePostLogin } from "../actions/index.js";

const Home = () => {
  const { data, isLoading } = useGetNotes();
  const { logout } = usePostLogin();
  const [isArchivedPage, setIsArchivedPage] = useState(false);
  const [allNotes, setAllNotes] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    if (isArchivedPage) {
      const notesArchived = data?.filter((note) => note.archived);
      setAllNotes(notesArchived);
    } else {
      const notesHome = data?.filter((note) => !note.archived);
      setAllNotes(notesHome);
    }
  }, [data, isArchivedPage]);

  return (
    <>
      <NavBar setIsArchivedPage={setIsArchivedPage} />
      {isLoading ? (
        <div className="container-loading">
          <h5>Estamos cargando tus notas...</h5>
          <img src="./note-100x100.png" alt="icon note" />
        </div>
      ) : (
        <Main allNotes={allNotes} isArchivedPage={isArchivedPage} />
      )}
      <button className="button-logout" onClick={handleLogout}>
        Salir
      </button>
      <Footer />
    </>
  );
};
export default Home;
