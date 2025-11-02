import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store/store";
import { addProduct } from "../../../store/productsSlice";
import FormInput from "../../components/InputForm/InputForm";
import { ButtonCreate } from "../../components/Buttons/ButtonCreate";
import { ButtonBack } from "../../components/Buttons/ButtonBack";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import type { Product } from "../../../api/types";
import "./CreateProduct.css";
import {
  validateAll,
  validateTitle,
  validatePrice,
  validateCategory,
  validateImage,
  type FieldErrors,
} from "../../../domain/validators";

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const validateField = (name: keyof FieldErrors, value: string) => {
    let err = "";
    if (name === "title") err = validateTitle(value);
    if (name === "price") err = validatePrice(value);
    if (name === "category") err = validateCategory(value);
    if (name === "image") err = validateImage(value);

    setErrors((prev) => {
      if (!err) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { [name]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [name]: err };
    });
  };

  const isFormValid = useMemo(() => {
    const vals = { title, price, category, image, description };
    const e = validateAll(vals);
    return Object.keys(e).length === 0;
  }, [title, price, category, image, description]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateAll({
      title,
      price,
      category,
      image,
      description,
    });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const newProduct: Product = {
        id: Date.now(),
        title,
        price: parseFloat(parseFloat(price).toFixed(2)),
        category,
        description,
        image,
        liked: false,
      };
      dispatch(addProduct(newProduct));
      navigate("/");
    }
  };
  const fieldSetters = {
    title: setTitle,
    price: setPrice,
    category: setCategory,
    image: setImage,
    description: setDescription,
  };

  const handleChange = (field: keyof typeof fieldSetters, value: string) => {
    fieldSetters[field](value);
    validateField(field, value);
  };
  const previewProduct = useMemo<Product>(
    () => ({
      id: -1,
      title: title || "Product title",
      price:
        price && !validatePrice(price)
          ? parseFloat(parseFloat(price).toFixed(2))
          : 0.0,
      description: description || "Short description preview...",
      category: category || "Category",
      image:
        image ||
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fdefault-ui-image-placeholder-wireframes-600nw-1037719192.jpg&f=1&nofb=1&ipt=521717978f7f579ded142b5120310c34ee501068b41710a9a4d00385c5033601",
      liked: false,
    }),
    [title, price, description, category, image]
  );

  return (
    <div className='create-product-page'>
      <ButtonBack />
      <h2>Create Product</h2>

      <section className='create-preview-area'>
        <h4 className='create-preview-title'>Live preview</h4>
        <ProductCard product={previewProduct} clickable={false} />
      </section>

      <form className='create-product-form' onSubmit={handleSubmit} noValidate>
        <FormInput
          id='price'
          label='Price*'
          type='number'
          step='0.01'
          value={price}
          onChange={(v) => handleChange("price", v)}
          error={errors.price}
        />
        <FormInput
          id='category'
          label='Category*'
          value={category}
          onChange={(v) => handleChange("category", v)}
          error={errors.category}
        />
        <FormInput
          id='image'
          label='Image URL*'
          type='url'
          value={image}
          onChange={(v) => handleChange("image", v)}
          error={errors.image}
        />
        <FormInput
          id='description'
          label='Description (optional)'
          value={description}
          onChange={(v) => handleChange("description", v)}
          textarea
          error={errors.description}
        />
        <div style={{ marginTop: 12 }}>
          <ButtonCreate type='submit' disabled={!isFormValid} />
        </div>
      </form>
    </div>
  );
};

export default CreateProductPage;
