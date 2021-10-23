import { Fragment, useState } from "react";
import { AiOutlineEye } from 'react-icons/ai';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import 'animate.css';
import './FormFields.css';

export const TextField = (props) => {
  return (
    <Fragment>
      <input className="form-input text-secondary text-sm py-3 rounded-3xl px-6 shadow-sm border-1 border-white focus:border-primary" {...props} />
    </Fragment>
  );
}

export const PasswordField = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Fragment>
      <div className="w-full h-auto relative">
        <input type={isVisible ? "text" : "password"} className="form-input text-secondary text-sm py-3 rounded-3xl px-6 shadow-sm border-1 border-white focus:border-primary w-full" {...props} />
        { isVisible
          ? <AiOutlineEye onClick={() => setIsVisible(!isVisible)} size="20px" className="text-primary absolute right-5 password__field cursor-pointer animate__animated animate__pulse" />
          : <AiOutlineEyeInvisible onClick={() => setIsVisible(!isVisible)} size="20px" className="text-primary absolute right-5 password__field cursor-pointer animate__animated animate__pulse" />
        }
      </div>
    </Fragment>
  );
}