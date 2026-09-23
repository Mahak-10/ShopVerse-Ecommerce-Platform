import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { FaFolderOpen, FaFolderPlus } from "react-icons/fa";
import toast from "react-hot-toast";

import Modal from "../../shared/Modal";
import AddCategoryForm from "./AddCategoryForm";
import Loader from "../../shared/Loader";
import { DeleteModal } from "../../../components/shared/DeleteModal";
import useCategoryFilter from "../../../hooks/useCategoryFilter";
import ErrorPage from "../../shared/ErrorPage";
import { deleteCategoryDashboardAction } from "../../../store/actions";
import { categoryTableColumns } from "../../helper/tableColumn";

const Category = () => {
  const [searchParams] = useSearchParams();
  const pathname = useLocation().pathname;
  const params = new URLSearchParams(searchParams);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { categoryLoader, errorMessage } = useSelector((state) => state.errors);
  const { categories, pagination } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1
  );

  // Custom hook for category fetching and pagination
  useCategoryFilter();

  const tableRecords = categories?.map((item) => ({
    id: item.categoryId,
    categoryName: item.categoryName,
    version: item.version,
  }));

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setOpenUpdateModal(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setOpenDeleteModal(true);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteCategoryDashboardAction(setOpenDeleteModal, selectedCategory?.id, toast)
    );
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);

    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  const emptyCategories = !categories || categories?.length === 0;

  if (errorMessage) return <ErrorPage message={errorMessage} />;

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Categories Directory
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Organize catalog items, manage store categories, and streamline product navigation
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-2xl flex items-center gap-2 w-fit">
            <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">
              Total Categories:
            </span>
            <span className="text-base font-extrabold text-indigo-800">
              {pagination?.totalElements || categories?.length || 0}
            </span>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold py-2.5 px-5 rounded-2xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <FaFolderPlus className="text-base" />
            <span>Add Category</span>
          </button>
        </div>
      </div>

      {categoryLoader ? (
        <Loader />
      ) : (
        <>
          {emptyCategories ? (
            <div className="bg-white rounded-3xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center text-center py-16 text-slate-500">
              <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
                <FaFolderOpen size={36} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                No Categories Created Yet
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-sm">
                Get started by creating categories to organize products across your store.
              </p>
              <button
                onClick={() => setOpenModal(true)}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold py-2.5 px-6 rounded-2xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all duration-200 cursor-pointer"
              >
                <FaFolderPlus className="text-base" />
                <span>Add First Category</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 overflow-hidden">
              <DataGrid
                sx={{
                  border: "none",
                  color: "#0f172a",
                  fontFamily: "inherit",
                  "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: "#f8fafc",
                    color: "#334155",
                    fontSize: "0.8125rem",
                    fontWeight: 800,
                    borderBottom: "1px solid #e2e8f0",
                    borderRadius: "1rem",
                  },
                  "& .MuiDataGrid-cell": {
                    borderBottom: "1px solid #f1f5f9",
                    display: "flex",
                    alignItems: "center",
                  },
                  "& .MuiDataGrid-row:hover": {
                    backgroundColor: "#f8fafc",
                  },
                  "& .MuiTablePagination-root": {
                    color: "#64748b",
                    fontWeight: 600,
                  },
                  "& .MuiIconButton-root": {
                    color: "#64748b",
                  },
                }}
                rows={tableRecords || []}
                columns={categoryTableColumns(handleEdit, handleDelete)}
                paginationMode="server"
                rowCount={pagination?.totalElements || 0}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: pagination?.pageSize || 10,
                      page: currentPage - 1,
                    },
                  },
                }}
                onPaginationModelChange={handlePaginationChange}
                disableRowSelectionOnClick
                disableColumnResize
                pagination
                autoHeight
              />
            </div>
          )}
        </>
      )}

      {/* Add / Edit Category Modal */}
      <Modal
        open={openUpdateModal || openModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenModal}
        title={openUpdateModal ? "Update Category Details" : "Create New Category"}
      >
        <AddCategoryForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenModal}
          open={categoryLoader}
          category={selectedCategory}
          update={openUpdateModal}
        />
      </Modal>

      {/* Delete Category Modal */}
      <DeleteModal
        open={openDeleteModal}
        loader={categoryLoader}
        setOpen={setOpenDeleteModal}
        title="Are you sure you want to delete this category?"
        onDeleteHandler={onDeleteHandler}
      />
    </div>
  );
};

export default Category;