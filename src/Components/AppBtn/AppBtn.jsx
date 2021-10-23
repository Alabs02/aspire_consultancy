import { forwardRef, Fragment } from "react";
import PropTypes from 'prop-types';

export const BlockBtn = forwardRef(({ title, type }, ref) => (
  <Fragment>
    <button ref={ref} type={type} className="block w-full antialiased shadow-sm hover:shadow-md text-white py-2.5 text-sm tracking-tight rounded-3xl transition-all bg-primary hover:bg-primary-dark">{title && title}</button>
  </Fragment>
));

export const TextBtn = forwardRef(({ title, classes, type }, ref) => (
  <Fragment>
    <button type={type} ref={ref} className={`antialiased transition-colors tracking-tight ${classes}`}>{title && title}</button>
  </Fragment>
));

BlockBtn.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
}

TextBtn.propTypes = {
  title: PropTypes.string,
  classes: PropTypes.string,
  type: PropTypes.string,
}