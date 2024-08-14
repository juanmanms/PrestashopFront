import { setToken, addUser, removeUser } from '../../redux/userSlice';



export const loginSubmit = (username, password, dispatch) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    fetch(`${apiUrl}auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Login failed');
        })
        .then((data) => {
            if (data === 'Usuario o contraseña incorrectos') {
                console.log('Login failed:', data);
                return;
            }
            console.log('Login success:', data);
            localStorage.setItem('token', data);
            dispatch(setToken(data));
            getSeller(dispatch, addUser); // Asegúrate de pasar dispatch y addUser aquí
        })
        .catch((error) => {
            console.error('Login error:', error);
        });


    console.log('Login submitted:', { username, password });


};

export const getSeller = async (dispatch, addUser) => {
    try {
        const response = await fetch('https://panel.mercattorreblanca.cat/sellers', {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            console.log('Get seller success:', data[0]);
            dispatch(addUser({
                id_seller: data[0].id_seller,
                id_customer: data[0].id_customer,
                name: data[0].name,
                email: data[0].email
            }));
        } else {
            throw new Error('Get seller failed');
        }
    } catch (error) {
        console.error('Get seller error:', error);
    }
};

export const logout = (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
    dispatch(removeUser());
    window.location.href = '/';
}