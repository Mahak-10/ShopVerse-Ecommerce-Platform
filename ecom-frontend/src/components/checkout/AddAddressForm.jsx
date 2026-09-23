import React, { useEffect } from 'react';
import InputField from '../shared/InputField';
import { useForm } from 'react-hook-form';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import Spinners from '../shared/Spinners';
import toast from 'react-hot-toast';
import { addUpdateUserAddress } from '../../store/actions';
import { locationData } from '../../utils/locationData';

const AddAddressForm = ({ address, setOpenAddressModal }) => {
    const dispatch = useDispatch();
    const { btnLoader } = useSelector((state) => state.errors);
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onTouched",
        defaultValues: {
            country: "India",
            state: "",
            city: "",
        }
    });

    const selectedCountry = watch("country") || "India";
    const selectedState = watch("state") || "";

    const availableCountries = Object.keys(locationData);
    const availableStates = selectedCountry && locationData[selectedCountry] 
        ? Object.keys(locationData[selectedCountry]) 
        : [];
    const availableCities = selectedCountry && selectedState && locationData[selectedCountry]?.[selectedState] 
        ? locationData[selectedCountry][selectedState] 
        : [];

    const onSaveAddressHandler = async (data) => {
        dispatch(addUpdateUserAddress(
            data,
            toast,
            address?.addressId,
            setOpenAddressModal
        ));
    };

    useEffect(() => {
        if (address?.addressId) {
            setValue("buildingName", address?.buildingName || "");
            setValue("country", address?.country || "India");
            setValue("state", address?.state || "");
            setValue("city", address?.city || "");
            setValue("street", address?.street || "");
            setValue("pincode", address?.pincode || "");
        }
    }, [address, setValue]);

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit(onSaveAddressHandler)}>
                <div className="flex justify-center items-center mb-4 font-extrabold text-2xl text-slate-900 py-2 px-4 gap-2">
                    <FaAddressCard className="text-2xl text-indigo-600"/>
                    <span>{!address?.addressId ? "Add Shipping Address" : "Update Shipping Address"}</span>
                </div>

                <div className="flex flex-col gap-4">
                    <InputField
                        label="Building / Flat Name"
                        required
                        id="buildingName"
                        type="text"
                        message="*Building Name is required"
                        placeholder="Enter Building Name"
                        register={register}
                        errors={errors}
                    />

                    <InputField
                        label="Street / Landmark"
                        required
                        id="street"
                        type="text"
                        message="*Street is required"
                        placeholder="Enter Street / Area"
                        register={register}
                        errors={errors}
                    />

                    {/* Country Dropdown */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="country" className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="country"
                            {...register("country", { required: "*Country is required" })}
                            onChange={(e) => {
                                setValue("country", e.target.value);
                                setValue("state", "");
                                setValue("city", "");
                            }}
                            className="px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white text-slate-700 text-sm font-medium"
                        >
                            <option value="">Select Country</option>
                            {availableCountries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        {errors.country && (
                            <span className="text-xs text-red-500">{errors.country.message}</span>
                        )}
                    </div>

                    {/* State Dropdown */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="state" className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                            State / Province <span className="text-red-500">*</span>
                        </label>
                        {availableStates.length > 0 ? (
                            <select
                                id="state"
                                {...register("state", { required: "*State is required" })}
                                onChange={(e) => {
                                    setValue("state", e.target.value);
                                    setValue("city", "");
                                }}
                                className="px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white text-slate-700 text-sm font-medium"
                            >
                                <option value="">Select State</option>
                                {availableStates.map((st) => (
                                    <option key={st} value={st}>{st}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id="state"
                                type="text"
                                placeholder="Enter State"
                                {...register("state", { required: "*State is required" })}
                                className="px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-slate-700 text-sm font-medium"
                            />
                        )}
                        {errors.state && (
                            <span className="text-xs text-red-500">{errors.state.message}</span>
                        )}
                    </div>

                    {/* City Dropdown */}
                    <div className="flex flex-col gap-1">
                        <label htmlFor="city" className="font-bold text-slate-700 text-xs uppercase tracking-wider">
                            City <span className="text-red-500">*</span>
                        </label>
                        {availableCities.length > 0 ? (
                            <select
                                id="city"
                                {...register("city", { required: "*City is required" })}
                                className="px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 bg-white text-slate-700 text-sm font-medium"
                            >
                                <option value="">Select City</option>
                                {availableCities.map((ct) => (
                                    <option key={ct} value={ct}>{ct}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id="city"
                                type="text"
                                placeholder="Enter City"
                                {...register("city", { required: "*City is required" })}
                                className="px-3.5 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-slate-700 text-sm font-medium"
                            />
                        )}
                        {errors.city && (
                            <span className="text-xs text-red-500">{errors.city.message}</span>
                        )}
                    </div>

                    <InputField
                        label="Pincode / Postal Code"
                        required
                        id="pincode"
                        type="text"
                        message="*Pincode is required"
                        placeholder="Enter Pincode"
                        register={register}
                        errors={errors}
                    />
                </div>

                <button
                    disabled={btnLoader}
                    className="w-full text-white bg-indigo-600 font-extrabold px-6 py-3.5 rounded-xl mt-6 hover:bg-indigo-700 transition-all duration-200 flex justify-center items-center gap-2 shadow-md shadow-indigo-600/20 cursor-pointer"
                    type="submit">
                    {btnLoader ? (
                        <>
                            <Spinners /> Saving Address...
                        </>
                    ) : (
                        <>Save Address</>
                    )}
                </button>
            </form>
        </div>
    );
};

export default AddAddressForm;