import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { styles } from './EventDetailsStyles';
import { useProduct } from '../../providers/ProductProvider';
import { useEvent } from '../../providers/EventProvider'; // Importe o useEvent

const EventDetails: React.FC = () => {
    const { eventId } = useParams<{ eventId: string }>();
    const navigate = useNavigate();
    const { items } = useProduct(); // Usando o contexto de produtos
    const { events } = useEvent(); // Usando o contexto de eventos

    const event = events.find(e => e.id === parseInt(eventId || '0'));

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Detalhes do Evento - {event?.name}</h1>
            <p style={styles.date}>
                <strong>Data de Início:</strong> {event?.startDate}
            </p>
            <p style={styles.date}>
                <strong>Data de Fim:</strong> {event?.endDate}
            </p>

            <h2 style={styles.subtitle}>Itens à Venda</h2>
            <table style={styles.itemTable}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Item</th>
                        <th style={styles.tableHeader}>Preço</th>
                        <th style={styles.tableHeader}>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.id} style={styles.tableRow}>
                            <td style={styles.tableCell}>{item.name}</td>
                            <td style={styles.tableCell}>R${item.price.toFixed(2)}</td>
                            <td style={styles.tableCell}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button
                style={styles.backButton}
                onClick={() => navigate('/home')}
            >
                Voltar para Home
            </button>
        </div>
    );
};

export default EventDetails;
