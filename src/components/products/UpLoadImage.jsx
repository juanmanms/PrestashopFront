import PropTypes from 'prop-types'
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';


const UploadImage = ({ id_product, fileList, setFileList }) => {


    const onChange = ({ fileList: newFileList }) => {
        if (newFileList.length === 1) {
            newFileList[0].id_product = id_product;
        }
        setFileList(newFileList);
    };

    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const imgWindow = window.open(src);
        imgWindow.document.write(`<img src="${src}" />`);
    };

    return (
        <ImgCrop >
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 3 && '+ Subir imagen'}
            </Upload>
        </ImgCrop>
    );
};

UploadImage.propTypes = {
    id_product: PropTypes.number,
    fileList: PropTypes.array.isRequired,
    setFileList: PropTypes.func.isRequired,
}

export default UploadImage;