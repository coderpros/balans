import React, { useState } from 'react'

const AddBookForm = props => {
	const initialFormState = { Id: null, Category: '', Name: '', Price: '', Author: '' }
	const [ book, setBook ] = useState(initialFormState)

	const handleInputChange = event => {
		const { name, value } = event.target

		setBook({ ...book, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault();
				if (!book.Category || !book.Name || !book.Price || !book.Author) return;

				props.addBook(book);
				setBook(initialFormState);
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
			<button>Add book</button>
		</form>
	)
}

export default AddBookForm