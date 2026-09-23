import React from 'react';
import { FaBuilding, FaCheckCircle, FaEdit, FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { MdPinDrop } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { selectUserCheckoutAddress } from '../../store/actions';

const AddressList = ({ addresses, setSelectedAddress, setOpenAddressModal, setOpenDeleteModal }) => {
    const dispatch = useDispatch();
    const { selectedUserCheckoutAddress } = useSelector((state) => state.auth);

    const onEditButtonHandler = (e, addr) => {
        e.stopPropagation();
        setSelectedAddress(addr);
        setOpenAddressModal(true);
    };

    const onDeleteButtonHandler = (e, addr) => {
        e.stopPropagation();
        setSelectedAddress(addr);
        setOpenDeleteModal(true);
    };

    const handleAddressSelection = (addr) => {
        dispatch(selectUserCheckoutAddress(addr));
    };

    return (
        <div className="space-y-4">
            {addresses.map((address) => {
                const isSelected = selectedUserCheckoutAddress?.addressId === address.addressId;
                return (
                    <div
                        key={address.addressId}
                        onClick={() => handleAddressSelection(address)}
                        className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer relative ${
                            isSelected
                                ? "border-indigo-600 bg-indigo-50/50 shadow-md ring-2 ring-indigo-600/20"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                        }`}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                                        <FaBuilding className="text-indigo-600 text-sm" />
                                        <span>{address.buildingName}</span>
                                    </span>
                                    {isSelected && (
                                        <span className="inline-flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                                            <FaCheckCircle className="text-[9px]" />
                                            <span>Deliver Here</span>
                                        </span>
                                    )}
                                </div>

                                <p className="text-slate-600 text-xs leading-relaxed flex items-center gap-1.5 font-medium">
                                    <FaMapMarkerAlt className="text-slate-400 text-xs shrink-0" />
                                    <span>{address.street}, {address.city}, {address.state}</span>
                                </p>

                                <p className="text-slate-500 text-xs font-semibold flex items-center gap-1.5">
                                    <MdPinDrop className="text-slate-400 text-sm shrink-0" />
                                    <span>Pincode: {address.pincode} • {address.country}</span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2 shrink-0">
                                <button
                                    onClick={(e) => onEditButtonHandler(e, address)}
                                    className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
                                    title="Edit Address"
                                >
                                    <FaEdit className="text-xs text-indigo-600" />
                                </button>
                                <button
                                    onClick={(e) => onDeleteButtonHandler(e, address)}
                                    className="w-8 h-8 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 flex items-center justify-center transition-colors cursor-pointer"
                                    title="Delete Address"
                                >
                                    <FaTrash className="text-xs" />
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AddressList;