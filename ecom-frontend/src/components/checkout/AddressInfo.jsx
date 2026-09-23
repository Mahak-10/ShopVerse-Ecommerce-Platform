import React, { useEffect, useState } from 'react';
import Skeleton from '../shared/Skeleton';
import { FaAddressBook, FaPlus } from 'react-icons/fa';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { DeleteModal } from './DeleteModal';
import toast from 'react-hot-toast';
import { deleteUserAddress, selectUserCheckoutAddress } from '../../store/actions';

const AddressInfo = ({ address }) => {
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState("");
    
    const addNewAddressHandler = () => {
        setSelectedAddress("");
        setOpenAddressModal(true);
    };

    const dispatch = useDispatch();
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    useEffect(() => {
        if (address && address.length > 0 && (!selectedUserCheckoutAddress || !selectedUserCheckoutAddress.addressId)) {
            dispatch(selectUserCheckoutAddress(address[0]));
        }
    }, [address, selectedUserCheckoutAddress, dispatch]);

    const deleteAddressHandler = () => {
        dispatch(deleteUserAddress(
            toast,
            selectedAddress?.addressId,
            setOpenDeleteModal
        ));
    };

    const noAddressExist = !address || address.length === 0;
    const { isLoading, btnLoader } = useSelector((state) => state.errors);

    return (
        <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col justify-between h-full space-y-6">
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900">Select Shipping Address</h2>
                        <p className="text-slate-500 text-xs mt-1 font-medium">Choose where you want your order delivered.</p>
                    </div>
                    {!noAddressExist && (
                        <button
                            onClick={addNewAddressHandler}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer shrink-0"
                        >
                            <FaPlus className="text-[10px]" />
                            <span>Add New Address</span>
                        </button>
                    )}
                </div>

                {noAddressExist ? (
                    <div className="py-12 px-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">
                            <FaAddressBook />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">No Shipping Address Saved</h3>
                            <p className="text-slate-500 text-xs mt-1 font-medium">Please add a shipping address to complete your order checkout.</p>
                        </div>
                        <button
                            onClick={addNewAddressHandler}
                            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                        >
                            <FaPlus className="text-[10px]" />
                            <span>Add First Address</span>
                        </button>
                    </div>
                ) : isLoading ? (
                    <div className="py-6">
                        <Skeleton />
                    </div>
                ) : (
                    <AddressList 
                        addresses={address}
                        setSelectedAddress={setSelectedAddress}
                        setOpenAddressModal={setOpenAddressModal}
                        setOpenDeleteModal={setOpenDeleteModal}
                    />
                )}
            </div>

            <AddressInfoModal
                open={openAddressModal}
                setOpen={setOpenAddressModal}
            >
                <AddAddressForm 
                    address={selectedAddress}
                    setOpenAddressModal={setOpenAddressModal}
                />
            </AddressInfoModal>

            <DeleteModal 
                open={openDeleteModal}
                loader={btnLoader}
                setOpen={setOpenDeleteModal}
                title="Delete Address"
                onDeleteHandler={deleteAddressHandler}
            />
        </div>
    );
};

export default AddressInfo;