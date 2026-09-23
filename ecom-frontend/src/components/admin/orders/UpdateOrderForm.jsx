import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useState } from 'react';
import { FaCheckCircle, FaHashtag, FaTruck, FaClock, FaTimesCircle } from 'react-icons/fa';
import { MdOutlineEmail, MdPayment } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrderStatusFromDashboard } from '../../../store/actions';
import toast from 'react-hot-toast';
import Spinners from '../../shared/Spinners';
import { formatPrice } from '../../../utils/formatPrice';

const ORDER_STATUSES = [
    { label: "Pending", icon: FaClock, color: "text-amber-600 bg-amber-50" },
    { label: "Processing", icon: FaClock, color: "text-blue-600 bg-blue-50" },
    { label: "Shipped", icon: FaTruck, color: "text-indigo-600 bg-indigo-50" },
    { label: "Delivered", icon: FaCheckCircle, color: "text-emerald-600 bg-emerald-50" },
    { label: "Accepted", icon: FaCheckCircle, color: "text-emerald-600 bg-emerald-50" },
    { label: "Cancelled", icon: FaTimesCircle, color: "text-rose-600 bg-rose-50" },
];

const UpdateOrderForm = ({ setOpen, selectedId, selectedItem, loader, setLoader}) => {
    const [orderStatus, setOrderStatus] = useState(selectedItem?.status || 'Accepted');
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");

    const updateOrderStatus = (e) => {
        e.preventDefault();
        if (!orderStatus) {
            setError("Order status is required");
            return;
        }
        dispatch(updateOrderStatusFromDashboard(
            selectedId,
            orderStatus,
            toast,
            setLoader,
            isAdmin
        ));
    };

    return (
        <div className='py-2 font-sans space-y-6'>
            
            {/* Order Summary Metadata Card */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-2">
                        <FaHashtag className="text-indigo-600 text-sm" />
                        <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Order ID</span>
                        <span className="text-sm font-extrabold text-indigo-600">#{selectedId}</span>
                    </div>
                    {selectedItem?.totalAmount && (
                        <div className="flex items-center gap-1.5 text-slate-900 font-extrabold text-base">
                            <MdPayment className="text-emerald-600" />
                            <span>{formatPrice(selectedItem.totalAmount)}</span>
                        </div>
                    )}
                </div>

                {selectedItem?.email && (
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <MdOutlineEmail className="text-slate-400 text-base" />
                        <span>{selectedItem.email}</span>
                    </div>
                )}
            </div>

            {/* Form Control Dropdown */}
            <form onSubmit={updateOrderStatus} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                        Select New Status
                    </label>
                    
                    <FormControl fullWidth variant='outlined' error={!!error}>
                        <InputLabel id="order-status-label" sx={{ fontWeight: 600 }}>Order Status</InputLabel>
                        <Select
                            labelId='order-status-label'
                            label='Order Status'
                            value={orderStatus}
                            onChange={(e) => {
                                setOrderStatus(e.target.value);
                                setError("");
                            }}
                            sx={{
                                borderRadius: '0.875rem',
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#cbd5e1',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#6366f1',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#4f46e5',
                                },
                            }}
                        >
                            {ORDER_STATUSES.map((statusObj) => (
                                <MenuItem key={statusObj.label} value={statusObj.label} className="py-2.5">
                                    <div className="flex items-center gap-2.5">
                                        <statusObj.icon className={`text-base ${statusObj.color.split(' ')[0]}`} />
                                        <span className="font-bold text-sm text-slate-800">{statusObj.label}</span>
                                    </div>
                                </MenuItem>
                            ))}
                        </Select>

                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                </div>

                {/* Form Action Buttons */}
                <div className='flex items-center justify-end gap-3 pt-4 border-t border-slate-100'>
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
                                <span>Updating...</span>
                            </>
                        ) : (
                            <span>Save Status</span>
                        )}
                    </button>
                </div>
            </form>

        </div>
    );
};

export default UpdateOrderForm;