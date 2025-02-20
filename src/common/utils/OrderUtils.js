export const stateMapping = {
    3: "Preparación en curso",
    6: 'cancelado',
    10: 'Pendiente en parada',
    13: 'Pendiente de pago',
    22: 'Ticket Definitivo',
    23: 'Comanda per revisar',
    24: 'En reparto',
    26: 'Entrega en efectivo',
    27: 'Entrega, pagado en la parada',
    28: 'Pagament en efectiu',
    29: 'Pagament a parada',
    30: 'Entrega TPV'
};

export const stateMappingEntrega = {
    24: 'En reparto',
    26: 'Entrega en efectivo',
    27: 'Entrega, pagado en la parada',
    30: 'Entrega TPV'
};

export const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export const getMondayOfWeek = (date) => {
    const dayOfWeek = date.getDay(); // 0 (domingo) a 6 (sábado)
    const monday = new Date(date);
    monday.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)); // Ajusta para obtener el lunes
    return monday;
};

// Obtiene el domingo de la semana dada una fecha
export const getSundayOfWeek = (date) => {
    const sunday = new Date(getMondayOfWeek(date));
    sunday.setDate(sunday.getDate() + 6); // Suma 6 días al lunes para obtener el domingo
    return sunday;
};

// Formatea una fecha como 'YYYY-MM-DD'
export const formatDate = (date) => date.toISOString().split('T')[0];