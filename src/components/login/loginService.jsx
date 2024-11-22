import { setToken, addUser, removeUser, addEmployee } from '../../redux/userSlice';
import { toast } from 'react-toastify';


const apiUrl = process.env.REACT_APP_URL_API;
const url = process.env.REACT_APP_URL_HOME;
export const loginSubmit = (username, password, dispatch) => {

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
                login2(username, password).then(data => {
                    if (data && data.token) {
                        tokeniza(data.token, dispatch);
                        setEmployee(dispatch, data, username)
                        return;
                    }
                });
                //return;
                console.log('Login failed:', data);
                toast.error(data, ', comprueba tu usuario y contraseña');
                return;
            }
            tokeniza(data, dispatch);
            getSeller(dispatch, addUser); // Asegúrate de pasar dispatch y addUser aquí



        })
        .catch((error) => {
            console.error('Login error:', error);
            toast.error('Login failed. catch error.');
        });


    console.log('Login submitted:', { username, password });


};

export const getSeller = async (dispatch, addUser) => {
    try {
        const response = await fetch(`${apiUrl}sellers`, {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            const data = await response.json();
            //console.log('Get seller success:', data[0]);
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

const setEmployee = (dispatch, data, email) => {
    dispatch(addEmployee({
        id_employee: data.id_employee,
        email: email,
        role: data.ProfileEmployed,
        name: data.name
    }))
}

const login2 = async (username, password) => {
    try {
        const response = await fetch(`${url}module/authenticationapi/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.error);
            throw new Error(errorData.error || 'Error de autenticación');
        }

        const data = await response.json();
        console.log('Response data:', data);

        if (data.token) {
            // Guardar el token y otros datos según sea necesario
            return data;
            // localStorage.setItem('token', data.token);
            // console.log('Token:', data.token);
            // console.log('Expiry Date:', data.expiry_date);
            // console.log('Profile Employed:', data['Profile employed']);
        } else {
            console.error('Error desconocido');
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
};
const tokeniza = (data, dispatch) => {
    console.log('Login success:', data);
    localStorage.setItem('token', data);
    dispatch(setToken(data));
}


export const logout = (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
    dispatch(removeUser());
    window.location.href = '/';
}