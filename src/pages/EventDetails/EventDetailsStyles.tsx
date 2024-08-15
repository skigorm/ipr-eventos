export const styles = {
    container: {
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        textAlign: 'center' as const,
    },
    title: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    date: {
        fontSize: '16px',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '20px',
        margin: '20px 0',
    },
    itemTable: {
        width: '100%',
        borderCollapse: 'collapse' as const,
        marginBottom: '20px',
    },
    tableHeader: {
        padding: '10px',
        backgroundColor: '#f5f5f5',
        color: '#333',
        textAlign: 'left' as const,
        fontWeight: 'bold',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    tableCell: {
        padding: '10px',
        textAlign: 'left' as const,
    },
    backButton: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
    },
};
