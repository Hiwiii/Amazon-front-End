import { createContext, useContext, useReducer, useEffect } from 'react';

const BasketContext = createContext();

const basketReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET': {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (existingItemIndex >= 0) {
                // Update quantity of existing item
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity,
                };
                return { ...state, count: state.count + action.payload.quantity, items: updatedItems };
            } else {
                // Add new item to basket
                return { ...state, count: state.count + action.payload.quantity, items: [...state.items, action.payload] };
            }
        }
        case 'UPDATE_QUANTITY': {
            const updatedItems = state.items.map(item =>
                item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
            );
            const newCount = updatedItems.reduce((count, item) => count + item.quantity, 0);
            return { ...state, count: newCount, items: updatedItems };
        }
        case 'REMOVE_FROM_BASKET': {
            const filteredItems = state.items.filter(item => item.id !== action.payload.id);
            const updatedCount = filteredItems.reduce((count, item) => count + item.quantity, 0);
            return { ...state, count: updatedCount, items: filteredItems };
        }
        case 'CLEAR_BASKET':
            return { count: 0, items: [] };
        case 'INITIALIZE_BASKET':
            return action.payload;
        default:
            return state;
    }
};

const loadBasketFromLocalStorage = () => {
    const storedBasket = localStorage.getItem('basket');
    return storedBasket ? JSON.parse(storedBasket) : { count: 0, items: [] };
};

export const BasketProvider = ({ children }) => {
    const [state, dispatch] = useReducer(basketReducer, { count: 0, items: [] }, loadBasketFromLocalStorage);

    useEffect(() => {
        console.log('Saving basket to localStorage:', state);
        localStorage.setItem('basket', JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        const storedBasket = loadBasketFromLocalStorage();
        if (storedBasket) {
            dispatch({ type: 'INITIALIZE_BASKET', payload: storedBasket });
        }
    }, []);

    return (
        <BasketContext.Provider value={{ state, dispatch }}>
            {children}
        </BasketContext.Provider>
    );
};

export const useBasket = () => {
    const context = useContext(BasketContext);
    if (context === undefined) {
        throw new Error('useBasket must be used within a BasketProvider');
    }
    return context;
};
