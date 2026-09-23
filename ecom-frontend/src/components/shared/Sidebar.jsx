import React from 'react';
import { FaStore, FaCog } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { adminNavigation, sellerNavigation } from '../../utils';
import classNames from 'classnames';
import { logOutUser } from '../../store/actions';

const Sidebar = () => {
    const pathName = useLocation().pathname;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const sideBarLayout = isAdmin ? adminNavigation : sellerNavigation;

    const handleLogout = () => {
        dispatch(logOutUser(navigate));
    };

    return (
        <div className='flex grow flex-col justify-between overflow-y-auto bg-[#0f172a] px-5 py-6 min-h-screen text-slate-300 font-sans border-r border-slate-800/80 shadow-2xl'>
            
            <div>
                {/* Header Branding */}
                <div className='flex items-center gap-3.5 px-2 pb-8 pt-1'>
                    <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30 shrink-0">
                        <FaStore className="text-2xl" />
                    </div>
                    <div className="flex flex-col">
                        <h1 className='text-xl font-extrabold text-white tracking-tight leading-tight'>
                            ShopVerse
                        </h1>
                        <span className="text-xs font-semibold text-slate-400">
                            {isAdmin ? "Admin Console" : "Seller Console"}
                        </span>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className='flex flex-1 flex-col'>
                    <ul role='list' className='flex flex-1 flex-col gap-y-2'>
                        {sideBarLayout.map((item) => {
                            const isActive = pathName === item.href;
                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.href}
                                        className={classNames(
                                            isActive
                                                ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/25"
                                                : "text-slate-400 hover:bg-slate-800/70 hover:text-white font-medium",
                                            "group flex items-center gap-x-3.5 rounded-xl px-4 py-3 text-sm transition-all duration-200"
                                        )}
                                    >
                                        <item.icon className={classNames(isActive ? "text-white" : "text-slate-400 group-hover:text-white", 'text-lg transition-colors')} />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Bottom Actions Section */}
            <div className='pt-6 border-t border-slate-800/90 flex flex-col gap-y-1'>
                <Link
                    to="/profile"
                    className="flex items-center gap-x-3.5 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-slate-800/70 hover:text-white transition-all duration-200"
                >
                    <FaCog className="text-lg text-slate-400 group-hover:text-white" />
                    <span>Settings</span>
                </Link>

                <button
                    onClick={handleLogout}
                    type="button"
                    className='w-full flex items-center gap-x-3.5 rounded-xl px-4 py-3 text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-all duration-200 cursor-pointer text-left'
                >
                    <IoExitOutline className='text-xl text-slate-400 group-hover:text-rose-400'/>
                    <span>Logout</span>
                </button>
            </div>

        </div>
    );
};

export default Sidebar;