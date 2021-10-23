import { Fragment, Suspense } from 'react';
import MiniHeader from '../../../Components/MiniHeader';
import UserSideBar from '../../../Components/UserSideBar';
import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { UserAppointmentList } from '../../../Components/UserPartials';
import GridCards  from '../../../Components/GridCards';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <Fragment>
      <div className="wrapper min-h-screen min-w-full bg-white">
        <div className="p-12 bg-white-pure"></div>
        <div className="main__wrapper min-h-screen min-w-full grid grid-cols-12 -mt-16">
          {/* Side bar */}
          <UserSideBar />
          <div className="main__body h-full w-full col-span-9">
            <MiniHeader />

            <main className="grid mt-5 pr-10 mb-5">
              {/* Body */} 
              <div className="flex sm:flex-col md:flex-row items-center justify-between py-4">
                <h4 className="text-brand-black uppercase tracking-wider font-light">My appointments</h4>

                <button className="flex items-center transition-all bg-warning text-brand-black px-6 py-3 rounded-2xl font-medium antialiased shadow hover:shadow-xl">
                  <BsFillCalendarPlusFill className="mr-2" />
                  Book an Appointment
                </button>
              </div>

              <Suspense fallback={<GridCards />}>
                <UserAppointmentList />
              </Suspense>

            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserDashboard;
