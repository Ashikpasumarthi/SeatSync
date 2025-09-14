import { configureStore, combineReducers } from "@reduxjs/toolkit";
import reducerMappings from "./Reducers/rootReducer";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import { encryptTransform } from 'redux-persist-transform-encrypt';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['movies'] // Make sure your slice name is here

}
const rootReducer = combineReducers(reducerMappings);
const persistedReducer = persistReducer(persistConfig, rootReducer);
const seatSyncStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

const persistor = persistStore(seatSyncStore);

export { seatSyncStore, persistor };

// export default { qtifyStore, persistor };






// This is a very common warning, not a critical error, that appears when you use Redux Toolkit with the `redux-persist` library. It's safe to ignore, but easy to fix.

// -----

// ## The Problem: Non-Serializable Actions from `redux-persist`

// Redux Toolkit's default setup includes a check to ensure all the data in your state and actions is "serializable" (meaning it can be easily converted to a string, like JSON). This helps with debugging and saving the state correctly.

// However, the `redux-persist` library, as part of its initialization process, dispatches some internal actions (like `persist/PERSIST`) that intentionally contain non-serializable values (in this case, functions named `register` and `rehydrate`).

// Redux Toolkit sees these functions and gives you a helpful warning in development mode.

// ## The Solution: Configure Your Middleware

// The official solution is to tell Redux Toolkit's serializability check to ignore the specific action types that are dispatched by `redux-persist`.

// You do this by customizing the middleware in your `store.js` file.

// Here is the corrected version of your **`store.js`**:

// ```javascript
// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import reducerMappings from "./Reducers/rootReducer";
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['movies'] // Make sure your slice name is here
// }

// const rootReducer = combineReducers(reducerMappings);
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const seatSyncStore = configureStore({
//     reducer: persistedReducer,
//     // Add this middleware configuration
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });

// const persistor = persistStore(seatSyncStore);

// export { seatSyncStore, persistor };
// ```

// By adding the `middleware` configuration, you are telling the store, "It's okay to ignore the serializability check for these specific actions from `redux-persist`," which will make the warning disappear.