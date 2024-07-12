import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

function loadState() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined; // No hay estado guardado
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

// Función para guardar el estado
function saveState(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // Manejar errores aquí
    }
}

const persistedState = loadState(); // Cargar el estado al iniciar

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: persistedState, // Usar el estado cargado como estado inicial
});

store.subscribe(() => {
    saveState({
        user: store.getState().user,
    });
});