import appFirebase from "../../../credenciales"
import PropTypes from "prop-types"

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import ImgCrop from "antd-img-crop"

const storage = getStorage(appFirebase)

// eslint-disable-next-line react/prop-types
const UpFireBase = ({ id, onClose }) => {

    let urlImDesc;

    const handleFileChange = async (e) => {
        e.preventDefault()
        console.log("subiendo", id)
        //detectar el archivo
        const archivoI = e.target.files[0];
        //cargar al storage
        const fileType = archivoI.type.split('/')[1];
        const refArchivo = ref(storage, `${process.env.REACT_APP_DirectorioImagenes}/${id}.${fileType}`);
        try {
            await uploadBytes(refArchivo, archivoI)
            urlImDesc = await getDownloadURL(refArchivo)
            console.log(urlImDesc)
            //openNotificationWithIcon('success', 'Success', 'Combination deleted successfully');
            onClose()
        } catch (error) {
            console.log(error)
        }



    }
    return (
        <div className="max-w-md mx-auto bg-white p-5 rounded-md shadow-md">
            <h3 className="text-xl font-bold mb-4">Agregar Imagen</h3>
            <form onSubmit={handleFileChange}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">
                        Imagen
                    </label>
                    <ImgCrop >
                        <input
                            type="file"
                            id="imagen"
                            name="imagen"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            onChange={handleFileChange}
                        />
                    </ImgCrop>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Subir
                </button>
            </form>
        </div>
    )
}

UpFireBase.propType = {
    id: PropTypes.number.isRequired,
    onClose: PropTypes.func.isRequired
}

export default UpFireBase