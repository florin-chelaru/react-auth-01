import React, {Component} from 'react';
import Book from "../models/Book";
import BookItem from "../components/BookItem";
import UserContext from "../store/UserContext";
import Config from "../Config";

type HomeProps = {};
type HomeState = {
  isLoading: boolean,
  loadedBooks: Book[],
  isDenied: boolean
}

export default class Home extends Component<HomeProps, HomeState> {
  static contextType = UserContext;
  context!: React.ContextType<typeof UserContext>;

  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: true,
      loadedBooks: [],
      isDenied: false
    };
  }

  private async fetchBooks(): Promise<void> {
    const response = await fetch(`${Config.API_ADDRESS}/books`,
      {
        credentials: "include",
        headers: {'Content-Type': 'application/json'},
      });
    if (response.ok) {
      const books: Book[] = await response.json();
      this.setState({isLoading: false, loadedBooks: books, isDenied: false});
    } else {
      this.setState({isLoading: false, loadedBooks: [], isDenied: true});
    }
  }

  componentDidMount() {
    if (this.context.userInfo.signedIn) {
      this.fetchBooks().then();
    }
  }

  render() {
    if (!this.context.userInfo.signedIn) {
      return <section>
        <p>User is not signed in</p>
      </section>;
    }

    if (this.state.loadedBooks)

    if (this.state.isLoading) {
      return <section>
        <p>Loading...</p>
      </section>;
    }

    if (this.state.isDenied) {
      return <section>
        <p>There was an error fetching books for user {this.context.userInfo.email}. Please sign in again.</p>
      </section>;
    }

    return (
      <section>
        <h1>Book list of {this.context.userInfo.email}</h1>
        <div className="container">
          {this.state.loadedBooks.map(book => <BookItem book={book} key={book.id}/>)}
        </div>
      </section>
    );
  }
}
