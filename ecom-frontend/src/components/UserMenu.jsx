import { Avatar, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { BiUser } from 'react-icons/bi';
import { FaShoppingCart, FaUserShield, FaMapMarkerAlt } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logOutUser } from '../store/actions';

const UserMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isAdmin = user && user?.roles?.includes("ROLE_ADMIN");
    const isSeller = user && user?.roles?.includes("ROLE_SELLER");

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const logOutHandler = () => {
        dispatch(logOutUser(navigate));
        handleClose();
    };

  return (
    <div className='relative font-sans'>
        <div className="flex items-center gap-2 cursor-pointer group p-1 rounded-xl hover:bg-slate-100/80 transition-colors"
             onClick={handleClick}>
                <Avatar 
                    alt={user?.username} 
                    src="/static/images/avatar/1.jpg" 
                    sx={{ width: 36, height: 36, bgcolor: '#4f46e5', fontWeight: 'bold' }}
                >
                    {user?.username?.charAt(0).toUpperCase()}
                </Avatar>
                <span className='font-extrabold text-slate-900 text-sm uppercase group-hover:text-indigo-600 transition-colors'>
                    {user?.username}
                </span>
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            sx: { width: 200, p: 1 },
          }}
          PaperProps={{
            sx: {
                borderRadius: '1rem',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
            }
          }}
        >
          { (isAdmin || isSeller) && (
            <Link to={isAdmin ? "/admin" : "/admin/orders"}>
              <MenuItem className="flex gap-2.5 rounded-xl py-2 px-3 hover:bg-indigo-50 mb-1" onClick={handleClose}>
                <FaUserShield className='text-lg text-indigo-600'/>
                <span className='font-extrabold text-sm text-indigo-600'>
                  {isAdmin ? "Admin Console" : "Seller Portal"}
                </span>
              </MenuItem>
            </Link>
          )}

          <Link to="/profile">
            <MenuItem className="flex gap-2.5 rounded-xl py-2 px-3 hover:bg-slate-50" onClick={handleClose}>
              <BiUser className='text-lg text-slate-700'/>
              <span className='font-bold text-sm text-slate-800'>
                Profile Info
              </span>
            </MenuItem>
          </Link>

          <Link to="/profile/addresses">
            <MenuItem className="flex gap-2.5 rounded-xl py-2 px-3 hover:bg-slate-50" onClick={handleClose}>
              <FaMapMarkerAlt className='text-base text-slate-700'/>
              <span className='font-semibold text-sm text-slate-700'>
                Addresses
              </span>
            </MenuItem>
          </Link>

          <Link to="/profile/orders">
            <MenuItem className="flex gap-2.5 rounded-xl py-2 px-3 hover:bg-slate-50" onClick={handleClose}>
              <FaShoppingCart className='text-base text-slate-700'/>
              <span className='font-semibold text-sm text-slate-700'>
                My Orders
              </span>
            </MenuItem>
          </Link>

          <hr className="my-1 border-slate-100" />

          <MenuItem className="p-0 rounded-xl overflow-hidden" onClick={logOutHandler}>
            <div className='font-extrabold w-full flex gap-2 items-center justify-center bg-rose-600 hover:bg-rose-700 px-4 py-2 text-white rounded-xl text-xs transition-colors cursor-pointer'>
              <IoExitOutline className='text-lg'/>
              <span>Logout</span>
            </div>
          </MenuItem>
        </Menu>
    </div>
  );
};

export default UserMenu;