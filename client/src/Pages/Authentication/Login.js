// import InputField from "./component/InputField";
// import { useState } from "react";
// import { useBeforeUnload, useNavigate } from "react-router-dom";
// import { login } from "../../global/api";
// import { protect } from "../../global/api";

// import "./styles/Signup.css";
// function Login(props) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = new useState("");
//   let navigate = useNavigate();

//   const handleClick = async function () {
//     console.log("click");

//     // callAPI if return status Code =200 then set
//     const reqBody = {
//       email: email,
//       password: password,
//     };
//     console.log(reqBody);
//     await login(JSON.stringify(reqBody))
//       .then((response) => {
//         if (response.status === 200) {
//           props.setIsLogin(true);
//         }
//       })
//       .catch((err) => {
//         props.setIsLogin(false);
//         //navigate("/feed");
//       });
//     //navigate("/feed");
//   };

//   return (
//     <div className="signup">
//       <InputField type={"text"} placeholder={"Email"} setData={setEmail} />
//       <InputField
//         type={"text"}
//         placeholder={"password"}
//         setData={setPassword}
//       />
//       <input
//         type="submit"
//         className="btn_register"
//         value="Login"
//         onClick={handleClick}
//       ></input>
//     </div>
//   );
// }
// export default Login;
