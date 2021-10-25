import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { MdSpaceDashboard } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { withUser } from '../../Store/user';
import { get } from 'lodash';
import { slugify } from '../../Utils';
import './UserSideBar.css';

const UserSideBar = () => {

  const userProfile = useRecoilValue(withUser);
  console.log(userProfile);

  return (
    <Fragment>
      <div className="sidebar h-full w-full col-span-3 overflow-hidden hidden md:block py-4 px-10 -mt-4">
        <div className="sidebar__body shadow bg-white-pure h-full p-6 border-2 border-white w-full rounded-tl-md rounded-tr-3xl rounded-b-md">
          <div className="flex items-center">
            <div className="w-8 h-8 overflow-hidden mr-2">
              <img className="w-full h-full object-contain" src="/assets/images/logo.png" alt="logo" />
            </div>
            <h5 className="font-semibold text-brand-black antialiased text-lg">Aspire<span className="text-primary antialiased">Consultancy</span></h5>
          </div>

          <ul className="w-full mt-5">
            <li className="mb-3 group">
              <NavLink
                exact
                to={`/user/${slugify(get(userProfile, 'name', null))}/dashboard`}
                activeClassName="active__link"
                className="bg-white transition-all transform w-full flex group-hover:text-white group-hover:bg-primary hover:scale-105 shadow-sm items-center px-4 py-3 rounded-xl text-brand-black font-medium"
              >
                <MdSpaceDashboard className="mr-3" size={18} />
                Dashboard
              </NavLink>
            </li>

            <li className="mb-3 group">
              <NavLink 
                exact
                to="/user/profile" 
                activeClassName="active__link"
                className="bg-white transition-all transform w-full flex group-hover:text-white group-hover:bg-primary hover:scale-105 shadow-sm items-center px-4 py-3 rounded-xl text-brand-black font-medium"
              >
                <BsFillPersonFill className="mr-3" size={18} />
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
}

export default UserSideBar;
