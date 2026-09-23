import React, { useEffect } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaShoppingBag, FaShieldAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../../store/actions';
import AddressInfo from '../checkout/AddressInfo';
import { Link, useLocation } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, address } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserAddresses());
  }, [dispatch]);

  const activeTab = location.pathname.includes('/addresses') ? 'addresses' : 'profile';

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 min-h-[calc(100vh-120px)] space-y-8">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl text-white p-6 sm:p-8 shadow-xl border border-indigo-900/40">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-lg shadow-indigo-600/30 border-2 border-white/20">
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h1 className="text-2xl font-extrabold flex items-center justify-center sm:justify-start gap-2">
              <span>{user?.username}</span>
              {user?.roles?.includes('ROLE_ADMIN') && (
                <span className="bg-amber-500 text-slate-950 text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wider flex items-center gap-1">
                  <FaShieldAlt size={10} /> Admin
                </span>
              )}
            </h1>
            <p className="text-slate-300 text-sm flex items-center justify-center sm:justify-start gap-2 font-medium">
              <FaEnvelope size={14} className="text-indigo-400" /> 
              <span>{user?.email || user?.emailId || 'User Account'}</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-t border-slate-800/80 mt-6 pt-4 gap-4">
          <Link
            to="/profile"
            className={`flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <FaUser /> <span>Profile & Addresses</span>
          </Link>
          <Link
            to="/profile/orders"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-extrabold rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all"
          >
            <FaShoppingBag /> <span>My Orders</span>
          </Link>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-white border border-slate-200/90 rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <FaMapMarkerAlt className="text-indigo-600" /> 
            <span>Saved Delivery Addresses</span>
          </h2>
          <p className="text-slate-500 text-xs mt-1 font-medium">Manage your personal shipping addresses for quick checkout.</p>
        </div>

        {/* Address Info Component */}
        <AddressInfo address={address || []} />
      </div>
    </div>
  );
};

export default UserProfile;
