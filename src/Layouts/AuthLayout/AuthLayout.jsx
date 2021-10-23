import { forwardRef, Fragment } from "react";
import PropTypes from 'prop-types';

const AuthLayout = forwardRef(({ children, title, copy }, ref) => (
  <Fragment>
    <div ref={ref} className="min-h-screen min-w-full bg-primary-light grid place-items-center px-4 md:px-14 py-16">
      <div className="w-full h-full bg-white-pure rounded-sm grid grid-cols-12 overflow-hidden">

        <div className="md:col-span-6 col-span-12 w-full h-full bg-white-pure md:px-20 px-10 py-10">
          <div className="md:w-10 md:h-10 w-8 h-8 overflow-hidden">
            <img src="/assets/images/logo.png" className="w-full h-full object-contain" alt="logo" />
          </div>
          <h4 className="font-semibold text-brand-black text-2xl tracking-tight mt-8">{title && title}</h4>
          <p className="m-0 text-secondary mt-3 text-sm font-medium">{copy && copy}</p>

          {children && children}

          <footer className="text-secondary-light font-normal text-xs">&copy;{new Date().getFullYear()} Aspire Consultancy All rights reserved.</footer>

        </div>

        <div className="col-span-12 md:col-span-6 bg-primary">
        </div>

      </div>
    </div>
  </Fragment>
));

AuthLayout.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
  children: PropTypes.node,
}

export default AuthLayout;