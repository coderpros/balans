import React, { useState, useEffect } from 'react';

const EditBookForm = props => {
  const [ book, setBook ] = useState(props.currentBook);

  useEffect(
    () => {
      setBook(props.currentBook);
    },
    [ props ]
  )

  const handleInputChange = event => {
    const { name, value } = event.target

    setBook({ ...book, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()

        props.updateBook(book.Id, book) 
      }}
    >
      <label>Category</label>
      <input type="text" name="Category" value={book.Category} onChange={handleInputChange} />
      <label>Name</label>
      <input type="text" name="Name" value={book.Name} onChange={handleInputChange} />
      <label>Price</label>
      <input type="text" name="Price" value={book.Price} onChange={handleInputChange} />
      <label>Author</label>
      <input type="text" name="Author" value={book.Author} onChange={handleInputChange} />

      <button className="btn btn-primary">Update</button>&nbsp;
      <button className="btn btn-secondary" onClick={() => props.setEditing(false)} >
        Cancel
      </button>
    </form>
  )
}

export default EditBookForm;