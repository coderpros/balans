import React, { useState, useEffect } from "react";

// import logo from './logo.svg';
import './App.css';


const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books", {headers: new Headers({"Accept": "application/json"})})
      .then(response => response.json())
      .then(data => {
        setBooks(data);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr key="header">
          <th>Id</th>
          <th>Category</th>
          <th>Name</th>
          <th>Price</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>         
      <>
        {books.map(book => (
        <BookRow
          id={book.Id}
          category={book.Category}
          name={book.Name}
          price={book.Price}
          author={book.Author}
        />
      ))}
      </>
      </tbody>
      </table>
  );
}

const BookRow  = props => {
  return (
  <>
  <tr key={props.id.toString()}>
    <td>{props.id}</td>
    <td>{props.category}</td>
    <td>{props.name}</td>
    <td>{props.price}</td>
    <td>{props.author}</td>
  </tr>
  </>
  );
};

export default App;