import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

import { Constants } from '../helpers/Constants';
import AddBookForm from "../forms/AddBookForm.js";
import EditBookForm from "../forms/EditBookForm";
import { AuthService } from '../services/AuthService';

import '../css/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookContent = () => {
  let authService = new AuthService();

  const initialFormState = { Id: null, Category: '', Name: '', Price: '', Author: '' }
  const [books, setBooks] = useState([] as any);
  const [currentBook, setCurrentBook] = useState(initialFormState);
  const [editing, setEditing] = useState(false);
  
  useEffect(() => {
    readData().then(function() {
      displayAdmin();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayAdmin = async () => {
    await authService.getUser().then(function(user) {
      if(user != null) {
        var booksTable = document.getElementById('books');
        
        if(booksTable != null) {
          booksTable.style.display = "block";
        }

        authService.getGroup(user).then(function(group) {
          [].forEach.call(document.querySelectorAll('.admin-only'), function (el: HTMLElement) {
            if(group === "Corporate") {
              el.style.display = "inline";
            }
          });
        });
      }
    })
  }

  const createData = function (book:any) {
    book.Price = Number(book.Price);

    setBooks([...books, book]);
    displayAdmin();

    axios.post(`${Constants.apiRoot}Book`, book);
  }

  const readData = async () => {
     await axios.get(`${Constants.apiRoot}Book`).then(function(res) {
      setBooks(res.data);  
    });
  }

  const updateData = (id: any, updatedBook: any) => {
    setEditing(false);

    axios.put(`${Constants.apiRoot}Book/${id}`, updatedBook).then(function(test) {
      setBooks(books.map((book: { Id: any; Category: string; Name: string; Price: string; Author: string; }) => (book.Id === id ? updatedBook : book)))
    });
  }

  const deleteData = (id: string) => {
    if (window.confirm('Are you sure that you want to delete this book?')) {
      axios.delete(`${Constants.apiRoot}Book/${id}`)
        .then(res => {
          const del = books.filter(function (book:any) {
              return id !== book.Id;
            });
          
            setBooks(del);
        });
    }
  }

  const editRow = (book: { Id: any; Category: any; Name: any; Price: any; Author: any; }) => {
    setEditing(true);

    setCurrentBook({ Id: book.Id, Category: book.Category, Name: book.Name, Price: book.Price, Author: book.Author });
  }

  const renderHeader = () => {
    let headerElement = ['category', 'name', 'price', 'author', 'actions']

    return headerElement.map((key, index) => {
      return <th scope="col" key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return (
      books.length > 0 ? (
        books.map(function (book:any) {
            return (
              <tr key={book.Id}>
                <td>{book.Category}</td>
                <td>{book.Name}</td>
                <td>{book.Price}</td>
                <td>{book.Author}</td>
                <td className='operation'>
                  <button className='btn btn-primary admin-only' onClick={() => editRow(book)} style={{display: 'none'}}>Edit</button>&nbsp;
                  <button className='btn btn-danger admin-only' onClick={() => deleteData(book.Id)} style={{display: 'none'}}>Delete</button>
                </td>
              </tr>
            );
          }
        )) : (
        <tr>
          <td colSpan={5}>No books found.</td>
        </tr>
      )
    )
  }
  
  return (
    
    <>
      <div className="container">
        <div className="flex-row">
          <div className="flex-auto admin-only" style={{display: 'none'}}>
            {editing ? (
              <Fragment>
                <h2>Edit book</h2>
                <EditBookForm
                  editing={editing}
                  setEditing={setEditing}
                  currentBook={currentBook}
                  updateBook={updateData}
                />
              </Fragment>
            ) : (
              <Fragment>
                <h2>Add book</h2>
                <AddBookForm addBook={createData} />
              </Fragment>
            )}
          </div>
          <div id='books' className="flex-large" style={{display:'none'}}>
            <h2>Books</h2>
            <table id='books' className="table">
              <thead>
                <tr>{renderHeader()}</tr>
              </thead>
              <tbody>
                {renderBody()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookContent;