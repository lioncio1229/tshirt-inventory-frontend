import { useState } from "react";
import ProductForm from "../../components/ProductForm";
import { useAddShirtMutation, useUploadImageMutation } from "../../services/tshirtManagementService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addShirt] = useAddShirtMutation();
  const [uploadImage] = useUploadImageMutation();

  const [values, setValues] = useState({
    name: "",
    design: "",
    size: "",
    color: "",
    quantityInStock: 0,
    unitPrice: 0,
    category: {id: 1, name: "Any"}
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
    if(category == null && !file) return;

    const model = {...values};
    delete model.category;
    model.categoryId = category.id;

    dispatch(setBarLoading(true));
    addShirt(model).unwrap().then(async (resp) => {

      //Upload Image
      const formData = new FormData();
      const renamedFile = new File([file], resp.id, {
        type: file.type,
      });

      formData.append("image", renamedFile);

      await uploadImage(formData);
      
      navigate("/main");
      dispatch(setBarLoading(false));
    })
    .catch((err) => {
      dispatch(setBarLoading(false));
      console.error(err);
    });
  };

  const handleImageChange = (file) => {
    setFile(file);
  }

  const handleCancel = () => {
    navigate("/main");
  };

  return (
    <ProductForm
      title="Add new product"
      submitLabel="Add"
      values={values}
      onChange={handleChange}
      imageFile={file}
      onImageChange={handleImageChange}
      onAutoCompleteChange={handleAutocompleteChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
