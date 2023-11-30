import React, { useEffect, useState } from "react";
import "../styles/main.css";
import NoteCard from "./mainComponents/NoteCard";
import NewNoteCard from "./mainComponents/NewNoteCard";
import FilterCategories from "./subComponents/FilterCategories";
import { useGetCategories } from "../actions";
import { handleNotesByCategory } from "./mainComponents/utils/hooks";

const Main = ({ allNotes, isArchivedPage }) => {
  const { data: categories, isLoading } = useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showNotes, setShowNotes] = useState([]);

  useEffect(() => {
    setShowNotes(allNotes);
    setSelectedCategory("All");
  }, [allNotes]);
  return (
    <main>
      <h1>¿Do you like my notes?</h1>
      <FilterCategories
        categories={categories}
        defaultValue="Filtrar por categoria"
        handleCategory={(e) =>
          handleNotesByCategory(
            e,
            setShowNotes,
            allNotes,
            setSelectedCategory,
            categories
          )
        }
        isLoadingCategories={isLoading}
        selectedCategory={selectedCategory}
      />
      <section>
        <NewNoteCard />
        {showNotes?.map((note) => {
          return (
            <NoteCard key={note.id} {...note} isArchivedPage={isArchivedPage} />
          );
        })}
      </section>
    </main>
  );
};

export default Main;
