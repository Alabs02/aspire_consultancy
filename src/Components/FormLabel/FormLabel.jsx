import { Fragment } from 'react';

export const FormLabel = ({ htmlFor, copy, mb }) => {
  return (
    <Fragment>
      <label htmlFor={htmlFor && htmlFor} className={`text-sm text-brand-black font-medium m-0 ${mb}`}>{copy && copy}</label>
    </Fragment>
  );
}

export default FormLabel;
