import React, { useState } from 'react';
import Modal from 'react-modal';
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEvent } from '../../providers/EventProvider';
import { styles, customModalStyles } from './HomeStyles';
import { FaCalendarAlt, FaPlus, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

Modal.setAppElement('#root');

const Home: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const { events, addEvent, deleteEvent, updateEvent } = useEvent(); // Usando updateEvent para atualizar eventos
    const [newEventName, setNewEventName] = useState('');
    const [newEventStartDate, setNewEventStartDate] = useState('');
    const [newEventEndDate, setNewEventEndDate] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [error, setError] = useState('');
    const [eventBeingEdited, setEventBeingEdited] = useState<number | null>(null); // Novo estado para identificar o evento em edição

    const handleAddEvent = () => {
        if (!newEventName || !newEventStartDate || !newEventEndDate) {
            setError('Todos os campos devem ser preenchidos.');
            return;
        }

        if (eventBeingEdited !== null) {
            const updatedEvent = {
                id: eventBeingEdited,
                name: newEventName,
                startDate: newEventStartDate,
                endDate: newEventEndDate,
                items: events.find(event => event.id === eventBeingEdited)?.items || [],
            };
        
            updateEvent(updatedEvent); 
        } else {
            const newEvent = {
                id: events.length + 1,
                name: newEventName,
                startDate: newEventStartDate,
                endDate: newEventEndDate,
                items: [],
            };
            addEvent(newEvent);
        }
        

        // Resetar o estado
        setNewEventName('');
        setNewEventStartDate('');
        setNewEventEndDate('');
        setModalIsOpen(false);
        setError('');
        setEventBeingEdited(null);
    };

    const handleDeleteEvent = (eventId: number) => {
        deleteEvent(eventId);
    };

    const handleAddProducts = (eventId: number) => {
        navigate(`/eventos/${eventId}/produtos`);
    };

    const handleViewDetails = (eventId: number) => {
        navigate(`/eventos/${eventId}`);
    };

    const handleEditEvent = (eventId: number) => {
        const event = events.find(event => event.id === eventId);
        if (event) {
            setNewEventName(event.name);
            setNewEventStartDate(event.startDate);
            setNewEventEndDate(event.endDate);
            setEventBeingEdited(eventId);
            setModalIsOpen(true);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Bem-vindo, {auth.user}</h1>
            <button style={styles.logoutButton} onClick={auth.logout}>Sair</button>

            <h2 style={styles.subtitle}>Eventos</h2>
            <div style={styles.eventCard}>
                <table style={styles.eventTable}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Nome do Evento</th>
                            <th style={styles.tableHeader}>Data de Início</th>
                            <th style={styles.tableHeader}>Data de Fim</th>
                            <th style={styles.tableHeader}>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map(event => (
                            <tr key={event.id} style={styles.tableRow}>
                                <td style={styles.tableCell}>
                                    <div style={styles.eventDetails}>
                                        <FaCalendarAlt style={styles.icon} />
                                        <span>{event.name}</span>
                                    </div>
                                </td>
                                <td style={styles.tableCell}>
                                    <span>{event.startDate}</span>
                                </td>
                                <td style={styles.tableCell}>
                                    <span>{event.endDate}</span>
                                </td>
                                <td style={styles.tableCell}>
                                    <button
                                        style={styles.actionButton}
                                        onClick={() => handleAddProducts(event.id)}
                                    >
                                        <FaPlus /> Adicionar Produtos
                                    </button>
                                    <button
                                        style={styles.actionButton}
                                        onClick={() => handleViewDetails(event.id)}
                                    >
                                        <FaEye /> Visualizar
                                    </button>
                                    <button
                                        style={styles.actionButton}
                                        onClick={() => handleEditEvent(event.id)}
                                    >
                                        <FaEdit /> Editar
                                    </button>
                                    <button
                                        style={styles.deleteButton}
                                        onClick={() => handleDeleteEvent(event.id)}
                                    >
                                        <FaTrash /> Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button style={styles.addButton} onClick={() => setModalIsOpen(true)}>Criar Evento</button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => {
                    setModalIsOpen(false);
                    setEventBeingEdited(null); // Reseta o estado ao fechar a modal
                }}
                contentLabel={eventBeingEdited !== null ? "Editar Evento" : "Criar Novo Evento"}
                style={customModalStyles}
            >
                <h3 style={styles.formTitle}>{eventBeingEdited !== null ? "Editar Evento" : "Cadastrar Novo Evento"}</h3>
                {error && <p style={styles.error}>{error}</p>}
                <input
                    type="text"
                    placeholder="Nome do Evento"
                    value={newEventName}
                    onChange={(e) => setNewEventName(e.target.value)}
                    style={styles.input}
                />
                <div style={styles.dateContainer}>
                    <div style={styles.dateInputWrapper}>
                        <label htmlFor="startDate" style={styles.label}>Data Início</label>
                        <input
                            type="date"
                            id="startDate"
                            value={newEventStartDate}
                            onChange={(e) => setNewEventStartDate(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.dateInputWrapper}>
                        <label htmlFor="endDate" style={styles.label}>Data Fim</label>
                        <input
                            type="date"
                            id="endDate"
                            value={newEventEndDate}
                            onChange={(e) => setNewEventEndDate(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                </div>
                <button onClick={handleAddEvent} style={styles.addButton}>
                    {eventBeingEdited !== null ? "Salvar Alterações" : "Adicionar Evento"}
                </button>
            </Modal>
        </div>
    );
};

export default Home;
