import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import { useGetShirtQuery, useEditShirtMutation, useUploadImageMutation } from "../../services/tshirtManagementService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";

export default function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const [editShirt] = useEditShirtMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data, refetch, isLoading } = useGetShirtQuery({id});
  const [isImageLoading, setImageLoading] = useState(false);

  const [values, setValues] = useState({
    name: "",
    design: "",
    size: "",
    color: "",
    quantityInStock: 0,
    unitPrice: 0,
    category: null,
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setValues({...values, [e.target.id]: e.target.value});
  }

  const handleAutocompleteChange = (e, value) => {
    setValues({...values, category: value});
  }

  const handleSubmit = () => {
    const category = values.category;
    if(category == null) return;

    const model = {...values};
    delete model.category;
    model.categoryId = category.id;

    dispatch(setBarLoading(true));
    editShirt({id, model}).then(async (resp) => {
      
      //Upload Image
      const formData = new FormData();
      const renamedFile = new File([file], id, {
        type: file.type,
      });
      
      formData.append("image", renamedFile);
      
      await uploadImage(formData);

      navigate("/main");
      dispatch(setBarLoading(false));
    })
    .catch((err) => {
      console.error(err);
      dispatch(setBarLoading(false));
    });
  };

  const handleCancel = () => {
    navigate("/main");
  };

  const urlToFile = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const filename = url.substring(url.lastIndexOf('/') + 1);
  
      const file = new File([blob], filename, { type: blob.type });
  
      return file;
    } catch (error) {
      console.error('Error converting URL to File:', error);
      return null;
    }
  }

  const handleImageChange = (file) => {
    setFile(file);
  }

  useEffect(() => {
    refetch();
  }, [id]);

  useEffect(() => {
    if(!data) return;

    setImageLoading(true);
    urlToFile(data.productImageUrl)
    .then(file => {
      if (file) {
        setFile(file);
      } else {
        console.log('Failed to create file from URL.');
      }
      setImageLoading(false);
    });

    setValues(data);

  }, [data]);

  return (
    <ProductForm
      title="Edit product"
      submitLabel="Update"
      values={values}
      imageFile={file}
      onChange={handleChange}
      onImageChange={handleImageChange}
      onAutoCompleteChange={handleAutocompleteChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      isImageLoading={isImageLoading}
      isDataLoading={isLoading}
    />
  );
}
