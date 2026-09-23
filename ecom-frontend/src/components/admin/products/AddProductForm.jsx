import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputField from '../../shared/InputField';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductFromDashboard, fetchCategories, updateProductFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../../shared/Spinners';
import SelectTextField from '../../shared/SelectTextField';
import Skeleton from '../../shared/Skeleton';
import ErrorPage from '../../shared/ErrorPage';

const AddProductForm = ({ setOpen, product, update=false}) => {
const [loader, setLoader] = useState(false);
const [selectedCategory, setSelectedCategory] = useState();
const { categories } = useSelector((state) => state.products);
const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
const { user } = useSelector((state) => state.auth);
const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors }
    } = useForm({
        mode: "onTouched"
    });

    const saveProductHandler = (data) => {
        if(!update) {
            // create new product logic
            const sendData = {
                ...data,
                categoryId: selectedCategory.categoryId,
            };
            dispatch(addNewProductFromDashboard(
                sendData, toast, reset, setLoader, setOpen, isAdmin
            ));
        } else {
            const sendData = {
                ...data,
                id: product.id,
            };
            dispatch(updateProductFromDashboard(sendData, toast, reset, setLoader, setOpen, isAdmin));
        }
    };


    useEffect(() => {
        if (update && product) {
            setValue("productName", product?.productName);
            setValue("price", product?.price);
            setValue("quantity", product?.quantity);
            setValue("discount", product?.discount);
            setValue("specialPrice", product?.specialPrice);
            setValue("description", product?.description);
        }
    }, [update, product]);


    useEffect(() => {
        if (!update) {
            dispatch(fetchCategories());
        }
    }, [dispatch, update]);

    useEffect(() => {
        if (!categoryLoader && categories) {
            setSelectedCategory(categories[0]);
        }
    }, [categories, categoryLoader]);

    if (categoryLoader) return <Skeleton />
    if (errorMessage) return <ErrorPage message={errorMessage} />

  return (
    <div className='py-2 font-sans space-y-6'>
        
        {/* Product Preview Card (When Updating) */}
        {update && product && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
              {product.image && product.image.startsWith("http") ? (
                <img src={product.image} alt={product.productName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-slate-400 font-extrabold text-xs">NO IMG</span>
              )}
            </div>
            <div>
              <span className="text-xs font-extrabold text-indigo-600 tracking-wider block">EDITING PRODUCT #{product.id}</span>
              <h3 className="text-sm font-extrabold text-slate-900 truncate max-w-xs">{product.productName}</h3>
            </div>
          </div>
        )}

        <form className='space-y-5' onSubmit={handleSubmit(saveProductHandler)}>
            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Product Name"
                    required
                    id="productName"
                    type="text"
                    message="Product Name is required*"
                    register={register}
                    placeholder="e.g. iPhone 16 Pro Max"
                    errors={errors}
                    />

                {!update && (
                    <SelectTextField
                        label="Select Category"
                        select={selectedCategory}
                        setSelect={setSelectedCategory}
                        lists={categories}
                    />
                )}
            </div>

            <div className='flex md:flex-row flex-col gap-4 w-full'>
                <InputField 
                    label="Regular Price ($)"
                    required
                    id="price"
                    type="number"
                    message="Price is required*"
                    placeholder="0.00"
                    register={register}
                    errors={errors}
                    />

                <InputField 
                    label="Stock Quantity"
                    required
                    id="quantity"
                    type="number"
                    message="Quantity is required*"
                    register={register}
                    placeholder="0"
                    errors={errors}
                    />
            </div>

            <div className="flex md:flex-row flex-col gap-4 w-full">
              <InputField
                label="Discount (%)"
                id="discount"
                type="number"
                message="Discount percentage"
                placeholder="0"
                register={register}
                errors={errors}
              />
              <InputField
                label="Special Price ($)"
                id="specialPrice"
                type="number"
                message="Sale price"
                placeholder="0.00"
                register={register}
                errors={errors}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label htmlFor='desc' className='text-xs font-extrabold text-slate-700 uppercase tracking-wider block'>
                    Product Description
                </label>

                <textarea
                    rows={4}
                    placeholder="Describe key features, specifications, and details of this product..."
                    className={`px-4 py-3 w-full border text-sm font-medium bg-white text-slate-900 rounded-2xl outline-none transition-colors ${
                        errors["description"]?.message 
                          ? "border-rose-500 focus:border-rose-600" 
                          : "border-slate-300 focus:border-indigo-600" 
                    }`}
                    maxLength={255}
                    {...register("description", {
                        required: {value: true, message:"Product description is required"},
                    })}
                    />

                    {errors["description"]?.message && (
                        <p className="text-xs font-bold text-rose-600 mt-1">
                            {errors["description"]?.message}
                        </p>
                    )}
            </div>

            {/* Form Footer Action Buttons */}
            <div className='flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-8'>
                <button
                    disabled={loader}
                    type="button"
                    onClick={() => setOpen(false)}
                    className='px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer'
                >
                    Cancel
                </button>

                <button
                    disabled={loader}
                    type='submit'
                    className='px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer'
                >
                    {loader ? (
                        <>
                            <Spinners />
                            <span>Saving Product...</span>
                        </>
                    ) : (
                        <span>{update ? "Save Changes" : "Create Product"}</span>
                    )}
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddProductForm