import { forwardRef, Fragment } from 'react';
import { ErrorMessage } from 'formik';

const FormikErrorMsg = forwardRef((props, ref) => (
  <Fragment>
    <div ref={ref} className="m-0 p-0">
      <ErrorMessage {...props}>
        {msg => <div className="text-left text-red-500 font-medium text-sm">{msg}</div>}
      </ErrorMessage>
    </div>
  </Fragment>
));

export default FormikErrorMsg;
