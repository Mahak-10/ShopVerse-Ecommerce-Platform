import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
  createCategoryDashboardAction,
  updateCategoryDashboardAction,
} from "../../../store/actions";
import InputField from "../../shared/InputField";
import Spinners from "../../shared/Spinners";

const AddCategoryForm = ({ setOpen, open, category, update = false }) => {
  const dispatch = useDispatch();

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
    if (update && category) {
      setValue("categoryName", category?.categoryName || "");
    }
  }, [update, category, setValue]);

  const addNewCategoryHandler = (data) => {
    if (!update) {
      dispatch(createCategoryDashboardAction(data, setOpen, reset, toast));
    } else {
      dispatch(
        updateCategoryDashboardAction(data, setOpen, category.id, reset, toast)
      );
    }
  };

  return (
    <div className="py-2 font-sans space-y-6">
      {update && category && (
        <div className="bg-indigo-50/80 border border-indigo-100 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-sm uppercase">
            {category.categoryName ? category.categoryName.charAt(0) : "C"}
          </div>
          <div>
            <span className="text-xs font-extrabold text-indigo-600 tracking-wider block uppercase">
              EDITING CATEGORY #{category.id}
            </span>
            <h3 className="text-sm font-extrabold text-slate-900">{category.categoryName}</h3>
          </div>
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit(addNewCategoryHandler)}>
        <div className="flex flex-col gap-4 w-full">
          <InputField
            label="Category Name"
            required
            id="categoryName"
            type="text"
            message="Category name is required*"
            placeholder="e.g. Electronics, Fashion, Home & Kitchen"
            register={register}
            errors={errors}
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100 mt-6">
          <button
            disabled={open}
            onClick={() => setOpen(false)}
            type="button"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={open}
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold shadow-md shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {open ? (
              <>
                <Spinners />
                <span>Saving...</span>
              </>
            ) : (
              <span>{update ? "Save Category Changes" : "Create Category"}</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;