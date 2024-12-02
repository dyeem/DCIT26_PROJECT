import store from './store.js';
import { fetchUsers } from './user/userSlice.js';

store.dispatch(fetchUsers());

