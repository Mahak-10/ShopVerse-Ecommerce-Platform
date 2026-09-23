import { FaExclamationTriangle, FaBoxOpen } from "react-icons/fa";
import ProductCard from "../shared/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../store/actions";
import Filter from "./Filter";
import useProductFilter from "../../hooks/useProductFilter";
import Loader from "../shared/Loader";
import Paginations from "../shared/Paginations";

const Products = () => {
    const { isLoading, errorMessage } = useSelector(
        (state) => state.errors
    );
    const { products, categories, pagination } = useSelector(
        (state) => state.products
    );
    const dispatch = useDispatch();
    useProductFilter();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto lg:px-8 sm:px-6 px-4 py-8 space-y-8 min-h-[calc(100vh-140px)]">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-1">
                        <FaBoxOpen />
                        <span>Product Catalog</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Browse Our <span className="text-indigo-600">Collection</span>
                    </h1>
                </div>
                <p className="text-slate-600 text-sm max-w-md">
                    Showing top quality products with instant delivery options and official warranty.
                </p>
            </div>

            {/* Filter Bar Component */}
            <Filter categories={categories ? categories : []}/>

            {/* Product Grid & Loader */}
            {isLoading ? (
                <Loader />
            ) : errorMessage ? (
                <div className="bg-white border border-slate-200 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-3 shadow-xs">
                    <FaExclamationTriangle className="text-amber-500 text-4xl" />
                    <span className="text-slate-700 text-base font-medium">{errorMessage}</span>
                </div>
            ) : (
                <div className="space-y-10">
                    {products && products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                            {products.map((item, i) => (
                                <ProductCard key={item.productId || i} {...item} />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-4 shadow-xs">
                            <FaBoxOpen className="text-slate-400 text-5xl mx-auto" />
                            <h3 className="text-xl font-bold text-slate-900">No Products Found</h3>
                            <p className="text-slate-600 text-sm max-w-sm mx-auto">
                                We couldn't find any products matching your selected search or filter criteria. Try clearing filters.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination?.totalPages > 1 && (
                        <div className="flex justify-center pt-6">
                            <Paginations 
                                numberOfPage={pagination?.totalPages}
                                totalProducts={pagination?.totalElements}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Products;