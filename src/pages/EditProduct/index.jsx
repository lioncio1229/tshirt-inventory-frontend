import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import { useGetShirtQuery, useEditShirtMutation } from "../../services/tshirtManagementService";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [editShirt] = useEditShirtMutation();
  const { data, refetch } = useGetShirtQuery({id});

  const [values, setValues] = useState({
    name: "",
    design: "",
    size: "",
    color: "",
    quantityInStock: 0,
    unitPrice: 0,
    category: null,
  });

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

    editShirt({id, model}).then((resp) => {
      navigate("/main");
    })
    .catch((err) => {
      console.error(err);
    });
  };

  const handleCancel = () => {
    navigate("/main");
  };

  useEffect(() => {
    refetch();
  }, [id]);

  useEffect(() => {
    if(!data) return;

    setValues(data);

  }, [data]);

  return (
    <ProductForm
      title="Edit product"
      submitLabel="Update"
      values={values}
      onChange={handleChange}
      onAutoCompleteChange={handleAutocompleteChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
    />
  );
}
