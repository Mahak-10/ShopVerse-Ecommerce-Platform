import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import OrderTable from './OrderTable';
import { useSelector } from 'react-redux';
import useOrderFilter from '../../../hooks/useOrderFilter';

const Orders = () => {
    const { adminOrder, pagination } = useSelector((state) => state.order);

    useOrderFilter();

    const emptyOrder = !adminOrder || adminOrder?.length === 0;

    return (
        <div className='max-w-7xl mx-auto space-y-6 font-sans pb-12'>
            {emptyOrder ? (
                <div className='bg-white rounded-3xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center text-center py-16 text-slate-500'>
                    <div className="w-20 h-20 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-4">
                        <FaShoppingCart size={36} />
                    </div>
                    <h2 className='text-2xl font-extrabold text-slate-900'>No Orders Placed Yet</h2>
                    <p className="text-slate-500 text-sm mt-1 max-w-sm">
                        As soon as customers start placing orders, they will appear right here in real-time.
                    </p>
                </div>
            ) : (
                <OrderTable adminOrder={adminOrder} pagination={pagination}/>
            )}
        </div>
    );
};

export default Orders;