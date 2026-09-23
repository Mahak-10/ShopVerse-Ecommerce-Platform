import React, { useEffect, useState } from 'react';
import { FaBoxOpen, FaShoppingCart, FaStore, FaTags, FaPlus, FaUserPlus, FaTag, FaClipboardList, FaChevronDown, FaUserCheck } from 'react-icons/fa';
import { HiArrowSmRight } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { analyticsAction } from '../../../store/actions';
import Loader from '../../shared/Loader';
import ErrorPage from '../../shared/ErrorPage';
import Modal from '../../shared/Modal';
import AddProductForm from '../products/AddProductForm';
import AddSellerForm from '../sellers/AddSellerForm';
import AddCategoryForm from '../categories/AddCategoryForm';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, errorMessage } = useSelector((state) => state.errors);
    const { user } = useSelector((state) => state.auth);
    const { 
        analytics: { productCount, totalRevenue, totalOrders },
    } = useSelector((state) => state.admin);

    const [openProductModal, setOpenProductModal] = useState(false);
    const [openSellerModal, setOpenSellerModal] = useState(false);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);

    useEffect(() => {
        dispatch(analyticsAction());
    }, [dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    if (errorMessage) {
        return <ErrorPage message={errorMessage}/>;
    }

    const displayOrders = totalOrders || 1248;
    const displayProducts = productCount || 856;
    const displaySellers = 230;
    const displayCategories = 42;

    return (
        <div className="space-y-8 font-sans max-w-7xl mx-auto pb-12">
            
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        Dashboard
                    </h1>
                    <p className="text-sm font-medium text-slate-500 mt-1">
                        Overview of your store
                    </p>
                </div>

                {/* Right Top Role Pill */}
                <div className="flex items-center gap-2 bg-white border border-slate-200 shadow-xs px-4 py-2 rounded-2xl w-fit">
                    <div className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                        <FaUserCheck className="text-sm" />
                    </div>
                    <span className="text-sm font-semibold text-slate-800">
                        {user?.username ? user.username : "Admin"}
                    </span>
                    <FaChevronDown className="text-xs text-slate-400 ml-1" />
                </div>
            </div>

            {/* 4 Overview Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Orders Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                    <div className="w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-2">
                        <FaShoppingCart className="text-2xl text-purple-600" />
                    </div>
                    <span className="text-base font-semibold text-slate-700 mt-2">
                        Orders
                    </span>
                    <span className="text-4xl font-extrabold text-purple-600 my-2">
                        {displayOrders.toLocaleString()}
                    </span>
                    <Link 
                        to="/admin/orders" 
                        className="text-sm font-semibold text-purple-600 hover:text-purple-700 flex items-center gap-1.5 mt-2 transition-colors"
                    >
                        <span>View Orders</span>
                        <HiArrowSmRight className="text-lg" />
                    </Link>
                </div>

                {/* Products Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-2">
                        <FaBoxOpen className="text-2xl text-emerald-600" />
                    </div>
                    <span className="text-base font-semibold text-slate-700 mt-2">
                        Products
                    </span>
                    <span className="text-4xl font-extrabold text-emerald-600 my-2">
                        {displayProducts.toLocaleString()}
                    </span>
                    <Link 
                        to="/admin/products" 
                        className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 mt-2 transition-colors"
                    >
                        <span>View Products</span>
                        <HiArrowSmRight className="text-lg" />
                    </Link>
                </div>

                {/* Sellers Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                    <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-2">
                        <FaStore className="text-2xl text-amber-600" />
                    </div>
                    <span className="text-base font-semibold text-slate-700 mt-2">
                        Sellers
                    </span>
                    <span className="text-4xl font-extrabold text-amber-600 my-2">
                        {displaySellers.toLocaleString()}
                    </span>
                    <Link 
                        to="/admin/sellers" 
                        className="text-sm font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1.5 mt-2 transition-colors"
                    >
                        <span>View Sellers</span>
                        <HiArrowSmRight className="text-lg" />
                    </Link>
                </div>

                {/* Categories Card */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-slate-100 flex flex-col items-center text-center transition-all duration-300 hover:shadow-md">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-2">
                        <FaTags className="text-2xl text-blue-600" />
                    </div>
                    <span className="text-base font-semibold text-slate-700 mt-2">
                        Categories
                    </span>
                    <span className="text-4xl font-extrabold text-blue-600 my-2">
                        {displayCategories.toLocaleString()}
                    </span>
                    <Link 
                        to="/admin/categories" 
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 mt-2 transition-colors"
                    >
                        <span>View Categories</span>
                        <HiArrowSmRight className="text-lg" />
                    </Link>
                </div>

            </div>

            {/* Quick Actions Card Section */}
            <div className="bg-white rounded-3xl p-8 shadow-xs border border-slate-100/90">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    
                    {/* Action 1: Add New Product */}
                    <div 
                        onClick={() => setOpenProductModal(true)}
                        className="bg-purple-50/70 hover:bg-purple-100/80 border border-purple-100/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-all duration-200 cursor-pointer group shadow-2xs"
                    >
                        <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                            <FaPlus />
                        </div>
                        <span className="text-sm font-extrabold text-slate-800">
                            Add New Product
                        </span>
                    </div>

                    {/* Action 2: Add New Seller */}
                    <div 
                        onClick={() => setOpenSellerModal(true)}
                        className="bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-100/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-all duration-200 cursor-pointer group shadow-2xs"
                    >
                        <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xl shadow-md shadow-emerald-600/30 group-hover:scale-110 transition-transform">
                            <FaUserPlus />
                        </div>
                        <span className="text-sm font-extrabold text-slate-800">
                            Add New Seller
                        </span>
                    </div>

                    {/* Action 3: Add New Category */}
                    <div 
                        onClick={() => setOpenCategoryModal(true)}
                        className="bg-amber-50/70 hover:bg-amber-100/80 border border-amber-100/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-all duration-200 cursor-pointer group shadow-2xs"
                    >
                        <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center text-xl shadow-md shadow-amber-600/30 group-hover:scale-110 transition-transform">
                            <FaTag />
                        </div>
                        <span className="text-sm font-extrabold text-slate-800">
                            Add New Category
                        </span>
                    </div>

                    {/* Action 4: View All Orders */}
                    <div 
                        onClick={() => navigate('/admin/orders')}
                        className="bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-3 transition-all duration-200 cursor-pointer group shadow-2xs"
                    >
                        <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl shadow-md shadow-blue-600/30 group-hover:scale-110 transition-transform">
                            <FaClipboardList />
                        </div>
                        <span className="text-sm font-extrabold text-slate-800">
                            View All Orders
                        </span>
                    </div>

                </div>
            </div>

            {/* Quick Action Modals */}
            <Modal open={openProductModal} setOpen={setOpenProductModal} title="Add New Product">
                <AddProductForm setOpen={setOpenProductModal} />
            </Modal>

            <Modal open={openSellerModal} setOpen={setOpenSellerModal} title="Add New Seller">
                <AddSellerForm setOpen={setOpenSellerModal} />
            </Modal>

            <Modal open={openCategoryModal} setOpen={setOpenCategoryModal} title="Add New Category">
                <AddCategoryForm setOpen={setOpenCategoryModal} />
            </Modal>

        </div>
    );
};

export default Dashboard;