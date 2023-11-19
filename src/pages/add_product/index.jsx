import { useState } from "react";
import ProductForm from "../../components/ProductForm";
import { useAddShirtMutation } from "../../services/tshirtManagementService";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const [addShirt] = useAddShirtMutation();

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
    if(category == null) return;

    const model = {...values};
    delete model.category;
    model.categoryId = category.id;

    addShirt(model).then((resp) => {
      navigate("/main");
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const handleImageChange = (file) => {
    console.log("file: ", file);
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
      onImageChange={handleImageChange}
      onAutoCompleteChange={handleAutocompleteChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
