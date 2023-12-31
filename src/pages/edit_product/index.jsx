import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import {
  useGetShirtQuery,
  useEditShirtMutation,
  useUploadImageMutation,
} from "../../services/tshirtManagementService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setBarLoading } from "../../globalSlice";

import { enqueueSnackbar } from "notistack";

export default function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [editShirt] = useEditShirtMutation();
  const [uploadImage] = useUploadImageMutation();
  const { data, refetch, isLoading } = useGetShirtQuery({ id });
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
    setValues({ ...values, [e.target.id]: e.target.value });
  };

  const handleAutocompleteChange = (e, value) => {
    setValues({ ...values, category: value });
  };

  const modelValid = () => {
    const { name, quantityInStock, unitPrice, category } = values;
    let error = "";

    if (name.trim() === "") {
      error = "Require product name";
    } else if (quantityInStock < 0) {
      error = "Quantity in stock should not be negative";
    } else if (unitPrice < 0) {
      error = "Price should not be negative";
    } else if (!category) {
      error = "Please select a category";
    }

    if (error === "") return true;

    enqueueSnackbar(error);
    return false;
  };

  const handleSubmit = () => {
    if (!modelValid()) return;
    const categoryId = values.category.id;

    const model = { ...values };
    delete model.category;
    model.categoryId = categoryId;

    dispatch(setBarLoading(true));
    editShirt({ id, model })
      .then(async (resp) => {
        if (file) {
          //Upload Image
          const formData = new FormData();
          const renamedFile = new File([file], id, {
            type: file.type,
          });

          formData.append("image", renamedFile);

          await uploadImage(formData);
        }

        navigate("/main");
        dispatch(setBarLoading(false));
        enqueueSnackbar("Product updated", { variant: "success" });
      })
      .catch((err) => {
        console.error(err);
        dispatch(setBarLoading(false));
        enqueueSnackbar("Can't update product", { variant: "error" });
      });
  };

  const handleCancel = () => {
    navigate("/main");
  };

  const urlToFile = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const filename = url.substring(url.lastIndexOf("/") + 1);

      const file = new File([blob], filename, { type: blob.type });

      return file;
    } catch (error) {
      console.error("Error converting URL to File:", error);
      return null;
    }
  };

  const handleImageChange = (file) => {
    setFile(file);
  };

  useEffect(() => {
    refetch();
  }, [id]);

  useEffect(() => {
    if (!data) return;

    setImageLoading(true);
    urlToFile(data.productImageUrl).then((file) => {
      if (file) {
        setFile(file);
      } else {
        console.log("Failed to create file from URL.");
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
