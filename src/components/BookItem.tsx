import React from 'react';
import Book from "../models/Book";

type BookItemProps = {
  book: Book
}

const BookItem = (props: BookItemProps) => {
  return (
    <div className="row justify-content-center">
      <div className="col col-8">
        <div className="card mb-4 rounded-3 shadow-sm">
          <div className="card-header py-3">
            <h4 className="my-0 fw-normal">{props.book.title}</h4>
          </div>
          <div className="card-body container">
            <div className="row">
              <img src={props.book.coverUrl} alt={props.book.title} className="img-fluid col-4"/>
              <p className="col-8">{props.book.caption}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;