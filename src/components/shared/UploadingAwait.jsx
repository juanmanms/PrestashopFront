import { useEffect, useState } from 'react';
import appFirebase from '../../../credenciales';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'

const storage = getStorage(appFirebase)

const UploadingAwait = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const storageRef = ref(storage, process.env.REACT_APP_DirectorioImagenes);
      const result = await listAll(storageRef);
      const urlPromises = result.items.map((imageRef) => getDownloadURL(imageRef));
      const urls = await Promise.all(urlPromises);
      setImageUrls(urls);
    };

    fetchImages();
  }, []);
  return (
    <>
      {imageUrls.length > 0 && <h3>Pendientes de subir</h3>}
      <div style={{ display: 'flex', flexDirection: 'row', overflowX: 'scroll' }}>
        {imageUrls.map((url, index) => (
          <div key={index} style={{ marginRight: '10px', textAlign: 'center' }}>
            <img src={url} alt={`Firebase Image ${index}`} style={{ height: '50px' }} />
            <p style={{ fontSize: '12px' }}>{url.match(/2F(\d+)\./)?.[1] || 'No number found'}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default UploadingAwait