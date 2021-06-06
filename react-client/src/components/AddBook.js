import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const { data, loading, error } = useQuery(getAuthorsQuery);
  const [mutate, mutationData] = useMutation(addBookMutation);

  const [authorId, setAuthorId] = useState("");
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");

  const displayData = () => {
    if (loading) {
      return <option disabled>loading authors</option>;
    } else {
      return data.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const variables = { name, genre, authorId: authorId };

    mutate({
      variables: variables,
      refetchQueries: [{ query: getBooksQuery }],
    });

    console.log("Mutation data:", mutationData);
  };

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input
          type="text"
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
      </div>

      <div className="field">
        <label>Author:</label>
        <select
          value={authorId}
          onChange={(e) => {
            setAuthorId(e.target.value);
          }}
        >
          {displayData()}
        </select>
      </div>

      <button>+</button>
    </form>
  );
}

export default AddBook;
