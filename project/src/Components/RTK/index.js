import { crochetActions } from './Crochet/crochetSlice.js';
import store from './store.js';
import { fetchUsers } from './user/userSlice.js';

// Logging the initial state (optional)
// console.log("Initial State: ", store.getState());

// Subscribing to the store (optional)
// const unsubscribe = store.subscribe(() => {});

// Dispatching an async thunk action to fetch users
store.dispatch(fetchUsers());

// Dispatching other actions (uncomment if needed)
// store.dispatch(crochetActions.ordered(3));
// store.dispatch(crochetActions.restocked(3));

// Unsubscribing from the store (optional)
// unsubscribe();
