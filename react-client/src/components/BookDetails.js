import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { getBookQuery } from "../queries/queries";

function BookDetails({ bookId }) {
  const [book, setBook] = useState();
  const { data, loading, error } = useQuery(getBookQuery, {
    variables: {
      id: bookId,
    },
  });

  const displayBookDetails = () => {
    if (loading || !bookId) {
      return (
        <div id="book-details">
          <p>Output book details here</p>
        </div>
      );
    } else {
      const { book } = data;

      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by the author</p>
          <ul className="other-books">
            {book.author.books.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  return <>{displayBookDetails()}</>;
}

export default BookDetails;
