import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import UpLoadImage from "./UpLoadImage";
import { Image } from 'antd';

const apiUrl = process.env.REACT_APP_URL_HOME;

const ImageProduct = ({ text, record, setFileLists }) => {
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (fileList.length > 0) {
            setFileLists(prevFileLists => {
                const filteredFileLists = prevFileLists.filter(
                    prevFile => !fileList.some(file => file.uid === prevFile.uid)
                );
                return [...filteredFileLists, ...fileList];
            });
        }
    }, [fileList, setFileLists]);

    return (
        <div>
            {text ? (
                <Image
                    src={`${apiUrl}${text}`}
                    alt={record.product_name}
                    width={100}
                    height={100}
                />
            ) : (
                // <UpLoadImage id_product={record.id_product} fileList={fileList} setFileList={setFileList} />
                <Image
                    src={`https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png`}
                    alt={record.product_name}
                    width={100}
                    height={100}
                />
            )}
        </div>
    );
};

ImageProduct.propTypes = {
    text: PropTypes.string,
    record: PropTypes.object.isRequired,
    setFileLists: PropTypes.func.isRequired,
};

export default ImageProduct;
