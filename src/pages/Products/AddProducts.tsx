import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styles } from './AddProductsStyles';
import { useProduct } from '../../providers/ProductProvider';
import { useEvent } from '../../providers/EventProvider'; // Importe o useEvent

const AddProducts: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const { items, addItem, deleteItem } = useProduct(); // Usando o contexto de produtos
    const { events } = useEvent(); // Usando o contexto de eventos

    const event = events.find(e => e.id === parseInt(eventId || '0'));

    const [newItemName, setNewItemName] = useState('');
    const [newItemPrice, setNewItemPrice] = useState('');
    const [newItemQuantity, setNewItemQuantity] = useState('');

    const handleAddItem = () => {
        const newItem = {
            id: items.length + 1,
            name: newItemName,
            price: parseFloat(newItemPrice),
            quantity: parseInt(newItemQuantity, 10),
        };
        addItem(newItem);
        setNewItemName('');
        setNewItemPrice('');
        setNewItemQuantity('');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Adicionar Produtos - {event?.name}</h1>

            <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="itemName">Nome do Produto</label>
                <input
                    type="text"
                    id="itemName"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="itemPrice">Preço</label>
                <input
                    type="number"
                    id="itemPrice"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    style={styles.input}
                />
            </div>

            <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="itemQuantity">Quantidade</label>
                <input
                    type="number"
                    id="itemQuantity"
                    value={newItemQuantity}
                    onChange={(e) => setNewItemQuantity(e.target.value)}
                    style={styles.input}
                />
            </div>

            <button onClick={handleAddItem} style={styles.button}>Adicionar Produto</button>

            <h2 style={styles.subtitle}>Produtos Adicionados</h2>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Item</th>
                        <th style={styles.tableHeader}>Preço</th>
                        <th style={styles.tableHeader}>Quantidade</th>
                        <th style={styles.tableHeader}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{item.name}</td>
                            <td style={styles.tableCell}>R${item.price.toFixed(2)}</td>
                            <td style={styles.tableCell}>{item.quantity}</td>
                            <td style={styles.actionCell}>
                                <button
                                    style={styles.deleteButton}
                                    onClick={() => deleteItem(item.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                style={styles.button}
                onClick={() => navigate(`/eventos/${eventId}`)}
            >
                Voltar para Detalhes do Evento
            </button>
        </div>
    );
};

export default AddProducts;
