const API_BASE_URL = process.env.REACT_APP_URL_API + 'cp/';

const CpService = {
    // Obtener todos
    async getAll() {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Error al obtener todos');
        return await response.json();
    },

    // Obtener uno
    async getById(id) {
        const response = await fetch(`${API_BASE_URL}${id}`);
        if (!response.ok) throw new Error('Error al obtener el elemento');
        return await response.json();
    },

    // Crear
    async create(cp) {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cp }),
        });
        if (!response.ok) throw new Error('Error al crear');
        return await response.json();
    },

    // Actualizar (descomentado si lo necesitas)
    // async update(id, data) {
    //   const response = await fetch(`${API_BASE_URL}${id}`, {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data),
    //   });
    //   if (!response.ok) throw new Error('Error al actualizar');
    //   return await response.json();
    // },

    // Eliminar
    async remove(id) {
        const response = await fetch(`${API_BASE_URL}${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Error al eliminar');
        return await response.json();
    }
};

export default CpService;