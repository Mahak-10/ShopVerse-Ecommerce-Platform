import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { addNewDashboardSeller, updateDashboardSeller } from "../../../store/actions";
import InputField from "../../shared/InputField";
import Spinners from "../../shared/Spinners";

const AddSellerForm = ({ setOpen, seller, update = false }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    if (update && seller) {
      setValue("username", seller.username || "");
      setValue("email", seller.email || "");
      setValue("password", "");
    }
  }, [update, seller, setValue]);

  const addSellerHandler = (data) => {
    const sendData = {
      username: data.username,
      email: data.email,
    };

    if (data.password && data.password.trim() !== "") {
      if (data.password.length < 6) {
        toast.error("Password must be at least 6 characters long!");
        return;
      }
      sendData.password = data.password;
    }

    if (update) {
      const sellerId = seller?.id || seller?.userId;
      dispatch(updateDashboardSeller(sellerId, sendData, toast, setOpen, setLoader));
    } else {
      if (!data.password || data.password.trim() === "") {
        toast.error("Password is required for new seller registration!");
        return;
      }
      sendData.role = ["seller"];
      dispatch(addNewDashboardSeller(sendData, toast, reset, setOpen, setLoader));
    }
  };

  return (
    <div className="py-2 font-sans space-y-6">
      {update && seller && (
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-sm uppercase">
            {seller.username ? seller.username.charAt(0) : "S"}
          </div>
          <div>
            <span className="text-xs font-extrabold text-indigo-600 tracking-wider block">EDITING SELLER #{seller.id}</span>
            <h3 className="text-sm font-extrabold text-slate-900">{seller.username}</h3>
          </div>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit(addSellerHandler)}>
        <div className="flex flex-col gap-4 w-full">
          <InputField
            label="Seller Username"
            required
            id="username"
            type="text"
            message="Username is required*"
            placeholder="e.g. seller_john"
            register={register}
            errors={errors}
          />
          <InputField
            label="Email Address"
            required
            id="email"
            type="email"
            message="Email is required*"
            placeholder="e.g. seller@store.com"
            register={register}
            errors={errors}
          />
          <InputField
            label={update ? "New Password (Optional)" : "Password"}
            required={!update}
            id="password"
            type="password"
            message="Password is required*"
            placeholder={update ? "Leave blank to keep existing password" : "Enter account password"}
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-8">
          <button
            disabled={loader}
            onClick={() => setOpen(false)}
            type="button"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={loader}
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loader ? (
              <>
                <Spinners />
                <span>Saving...</span>
              </>
            ) : (
              <span>{update ? "Save Seller Changes" : "Register Seller"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSellerForm;