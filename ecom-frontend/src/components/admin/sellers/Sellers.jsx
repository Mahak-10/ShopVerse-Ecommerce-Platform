import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdPersonAdd } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";

import SellerTable from "./SellerTable";
import ErrorPage from "../../shared/ErrorPage";
import Loader from "../../shared/Loader";
import Modal from "../../shared/Modal";
import AddSellerForm from "./AddSellerForm";
import useSellerFilter from "./useSellerFilter";

const Sellers = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const { sellers, pagination } = useSelector((state) => state.seller);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  // Calling the `useSellerFilter` custom hook to fetch sellers and pagination based on current URL parameters.
  useSellerFilter();

  const handleEdit = (seller) => {
    setSelectedSeller(seller);
    setOpenEditModal(true);
  };

  const emptySellers = !sellers || sellers?.length === 0;

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Sellers Directory
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage seller accounts, store access, and seller permissions
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-purple-50 border border-purple-100 px-4 py-2 rounded-2xl flex items-center gap-2 w-fit">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
              Total Sellers:
            </span>
            <span className="text-base font-extrabold text-purple-800">
              {pagination?.totalElements || sellers?.length || 0}
            </span>
          </div>

          <button
            onClick={() => setOpenAddModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold py-2.5 px-5 rounded-2xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95"
          >
            <MdPersonAdd className="text-lg" />
            <span>Add Seller</span>
          </button>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptySellers ? (
            <div className="bg-white rounded-3xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center text-center py-16 text-slate-500">
              <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                <FaUserTie size={36} />
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                No Sellers Registered Yet
              </h2>
              <p className="text-slate-500 text-sm mt-1 max-w-sm">
                Get started by creating seller accounts to grant vendor access to your platform.
              </p>
              <button
                onClick={() => setOpenAddModal(true)}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-extrabold py-2.5 px-6 rounded-2xl shadow-md shadow-indigo-600/20 flex items-center gap-2 transition-all duration-200 cursor-pointer"
              >
                <MdPersonAdd className="text-lg" />
                <span>Add First Seller</span>
              </button>
            </div>
          ) : (
            <SellerTable
              sellers={sellers}
              pagination={pagination}
              handleEdit={handleEdit}
            />
          )}
        </>
      )}

      {/* Add Seller Modal */}
      <Modal open={openAddModal} setOpen={setOpenAddModal} title="Register New Seller">
        <AddSellerForm setOpen={setOpenAddModal} />
      </Modal>

      {/* Edit Seller Modal */}
      <Modal open={openEditModal} setOpen={setOpenEditModal} title="Update Seller Details">
        <AddSellerForm
          setOpen={setOpenEditModal}
          seller={selectedSeller}
          update={true}
        />
      </Modal>
    </div>
  );
};

export default Sellers;