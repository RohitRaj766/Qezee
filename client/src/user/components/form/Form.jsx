import { useState } from "react";

const Form = () => {
  const [ifRegistor, setIfRegistor] = useState(false);
  const handleSignIn = (e) => {

  }

  return (
    <>
      <div className="form__box">
        <form action="">

        {ifRegistor ? (
            <>
            <div className="form__container1">
              <div className="form__input1">
                <input type="text" placeholder="First Name" />
              </div>
              <div className="form__input2">
                <input type="text" placeholder="Last Name" />
              </div>
            </div>
            <div className="form__container2">
              <div className="form__input3">
                <input type="email" placeholder="Email Address" />
              </div>
            </div>
            <div className="form__container3">
              <div className="form__input4">
                <input type="password" placeholder="Password" />
              </div>
            </div>
            <div className="form__container4">
              <div className="form__input5">
                <input type="password" placeholder="Confirm Password" />
              </div>
            </div>
          </>
        ) : (
            <>
            <div className="form__container2">
              <div className="form__input3">
                <input type="email" placeholder="Email Address" />
              </div>
            </div>
            <div className="form__container3">
              <div className="form__input4">
                <input type="password" placeholder="Password" />
              </div>
            </div>
          </>
        )}
        <div className="form__button__container">
           {ifRegistor ? (<div className="button1">
                 <button onClick={()=>handleSignIn()}>SIGN-UP</button>
            </div>):
            (
                <div className="button2">
                 <button>LOGIN</button>
            </div>
            )}
        </div>
        </form>
      </div>
    </>
  );
};

export default Form;
