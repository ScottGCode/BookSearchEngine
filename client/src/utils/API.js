import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_ME } from './queries';
import { ADD_USER, LOGIN_USER, SAVE_BOOK, REMOVE_BOOK } from './mutations';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

export const getMe = (token) => {
  return client.query({
    query: GET_ME,
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

export const createUser = (userData) => {
  return client.mutate({
    mutation: ADD_USER,
    variables: { ...userData },
  });
};

export const loginUser = (userData) => {
  return client.mutate({
    mutation: LOGIN_USER,
    variables: { ...userData },
  });
};

export const saveBook = (bookData, token) => {
  return client.mutate({
    mutation: SAVE_BOOK,
    variables: { ...bookData },
      headers: {
        authorization: `Bearer ${token}`,
      },
  });
};

export const deleteBook = (bookId, token) => {
  return client.mutate({
    mutation: REMOVE_BOOK,
    variables: { bookId },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  });
};

export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};

