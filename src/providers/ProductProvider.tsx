import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface ProductContextType {
    items: Item[];
    addItem: (item: Item) => void;
    deleteItem: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<Item[]>([]);

    const addItem = (item: Item) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    const deleteItem = (id: number) => {
        setItems((prevItems) => prevItems.filter(item => item.id !== id));
    };

    return (
        <ProductContext.Provider value={{ items, addItem, deleteItem }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = (): ProductContextType => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductProvider');
    }
    return context;
};
