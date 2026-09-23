import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const Filter = ({ categories }) => {
    const [searchParams] = useSearchParams();
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    
    const [category, setCategory] = useState(searchParams.get("category") || "all");
    const [sortOrder, setSortOrder] = useState(searchParams.get("sortby") || "asc");
    const [searchTerm, setSearchTerm] = useState(searchParams.get("keyword") || "");

    useEffect(() => {
        setCategory(searchParams.get("category") || "all");
        setSortOrder(searchParams.get("sortby") || "asc");
        setSearchTerm(searchParams.get("keyword") || "");
    }, [searchParams]);

    useEffect(() => { 
        const handler = setTimeout(() => {
            const currentKeyword = searchParams.get("keyword") || "";
            if (searchTerm !== currentKeyword) {
                const params = new URLSearchParams(searchParams);
                if (searchTerm) {
                    params.set("keyword", searchTerm);
                } else {
                    params.delete("keyword");
                }
                params.delete("page");
                navigate(`${pathname}?${params.toString()}`);
            }
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, searchParams, navigate, pathname]);

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;
        const params = new URLSearchParams(searchParams);

        if (selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        params.delete("page");
        navigate(`${pathname}?${params.toString()}`);
        setCategory(selectedCategory);
    };

    const toggleSortOrder = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        const params = new URLSearchParams(searchParams);
        params.set("sortby", newOrder);
        navigate(`${pathname}?${params.toString()}`);
        setSortOrder(newOrder);
    };

    const handleClearFilters = () => {
        navigate(pathname);
    };

    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* SEARCH BAR */}
            <div className="relative flex items-center w-full lg:max-w-md">
                <FiSearch className="absolute left-4 text-slate-400 text-lg pointer-events-none" />
                <input 
                    type="text"
                    placeholder="Search by title, specs, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 text-sm font-medium focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10 transition-all placeholder:text-slate-400"
                />
            </div>

            {/* CATEGORY & SORT CONTROLS */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-end">
                
                {/* CATEGORY SELECT */}
                <FormControl
                    size="small"
                    sx={{
                        minWidth: 160,
                        '& .MuiInputLabel-root': { color: '#64748b', fontSize: '0.875rem' },
                        '& .MuiInputLabel-root.Mui-focused': { color: '#4f46e5' },
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#ffffff',
                            borderRadius: '0.75rem',
                            color: '#0f172a',
                            '& fieldset': { borderColor: '#cbd5e1' },
                            '&:hover fieldset': { borderColor: '#94a3b8' },
                            '&.Mui-focused fieldset': { borderColor: '#4f46e5' },
                        },
                        '& .MuiSelect-icon': { color: '#64748b' }
                    }}
                >
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                    >
                        <MenuItem value="all">All Categories</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT TOGGLE BUTTON */}
                <Tooltip title={`Sort price ${sortOrder === "asc" ? "Low to High" : "High to Low"}`}>
                    <Button 
                        onClick={toggleSortOrder}
                        sx={{
                            backgroundColor: '#f1f5f9',
                            color: '#1e293b',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.75rem',
                            padding: '0.6rem 1.2rem',
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            '&:hover': {
                                backgroundColor: '#e2e8f0',
                                borderColor: '#94a3b8'
                            }
                        }}
                        className="flex items-center gap-2"
                    >
                        <span>Sort Price: {sortOrder.toUpperCase()}</span>
                        {sortOrder === "asc" ? <FiArrowUp className="text-base text-indigo-600" /> : <FiArrowDown className="text-base text-indigo-600" />}
                    </Button>
                </Tooltip>

                {/* CLEAR FILTER BUTTON */}
                <button 
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-sm font-semibold transition-all group shrink-0"
                >
                    <FiRefreshCw className="group-hover:rotate-180 transition-transform duration-500 text-xs" />
                    <span>Reset</span>
                </button>
            </div>
        </div>
    );
};

export default Filter;