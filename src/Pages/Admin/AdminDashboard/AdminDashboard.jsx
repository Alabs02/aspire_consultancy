import { Fragment, Suspense } from 'react';
import AdminSideBar from '../../../Components/AdminSideBar';
import AdminMiniHeader from '../../../Components/AdminMiniHeader';
import TableLoader from '../../../Components/TableLoader';
import {AppointmentList} from '../../../Components/AdminPartials';

const AdminDashboard = () => {
  return (
    <Fragment>
      <div className="wrapper min-h-screen min-w-full bg-white">
        <div className="p-12 bg-white-pure"></div>
        <div className="main__wrapper min-h-screen min-w-full grid grid-cols-12 -mt-16">
          {/* Side bar */}
          <AdminSideBar />
          <div className="main__body h-full w-full col-span-12 md:col-span-9">
            <AdminMiniHeader />

            <main className="grid mt-5 pr-4 pl-4 md:pl-0 md:pr-10 mb-5">
              {/* Body */} 
              <div className="flex flex-col md:flex-row items-start md:items-center justify-start w-100 md:justify-between py-4">
                <h4 className="text-brand-black uppercase tracking-wider font-light">My appointments</h4>
              </div>

              <Suspense fallback={<TableLoader />}>
                <AppointmentList />
              </Suspense>

            </main>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminDashboard;
