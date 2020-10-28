import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "../../Apiservice/loginSerice";
import { RestData } from "../../classes/RestData";
import { actionCreator } from "../../redux/action/actionCreator";
import { actions } from "../../redux/action/actions";

const INITIAL_AUTHENTICATION_URL =
  "https://github.com/login/oauth/authorize?client_id=89d1c63f7c22d1bb7e89&redirect_uri=http://localhost:3000/login&scope=repo%20gist%20notifications%20user";

const Login: React.FC = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes("?code=")) {
      const newArray = currentUrl.split("?code=");
      window.history.pushState({}, "", newArray[0]);
      api
        .authenticateUser(newArray[1])
        .then((res) => {
          // console.log(res.data);
          const token = res.data.split("&")[0].split("=")[1];
          localStorage.setItem("OUTH_TOKEN", token);
          let userData = null;
          api
            .getAuthenticatedUser(token)
            .then((res) => {
              userData = new RestData(res.data);
              dispatch(
                actionCreator(actions.LOGIN, {
                  isLoggedIn: true,
                  data: userData,
                })
              );
            })
            .catch((error) => {
              dispatch(
                actionCreator(actions.LOGIN_ERROR, { error: error.message })
              );
            });
        })
        .catch((error) => {
          dispatch(
            actionCreator(actions.LOGIN_ERROR, { error: error.message })
          );
        });
    }
  }, []);

  return (
    <div>
      <a href={INITIAL_AUTHENTICATION_URL}>Login with github!</a>
    </div>
  );
  // const initialLogin=(
  //   <div className="form-container">
  //     <img src={logo} alt="logo" className="form-container-logo" />
  //     <Typography.Title level={3} className="form-container-title">
  //       Sign in to GitHub
  //     </Typography.Title>
  //     <div className="form-container-form">
  //       <Formik
  //         initialValues={initialValues}
  //         validationSchema={validationSchema}
  //         onSubmit={(values, handlers) => {}}
  //       >
  //         {({ handleSubmit, isSubmitting }) => (
  //           <form onSubmit={handleSubmit}>
  //             <FormikInput
  //               label="Username"
  //               placeholder="ex. ishu-yash"
  //               helperText="Your github username"
  //               name="username"
  //               type="text"
  //             />
  //             <FormikInput
  //               label="Password"
  //               placeholder="************"
  //               helperText="Your github password"
  //               name="password"
  //               type="password"
  //             />
  //             <button
  //               type="submit"
  //               disabled={isSubmitting}
  //               className="form-button"
  //             >
  //               Sign In
  //             </button>
  //           </form>
  //         )}
  //       </Formik>
  //     </div>
  //   </div>
  // );
};

export default Login;
