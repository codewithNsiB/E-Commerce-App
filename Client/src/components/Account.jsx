import { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import {
  AiOutlineClose,
  AiFillEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import registerOptions from "../utils/formValidation";
import { registerUser, loginUser } from "../config/api";
import { toast } from "react-hot-toast";
import { useStore } from "../config/store";

export default function Account() {
  const [show, setShow] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordShown, setpasswordShown] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentUser } = useStore();
  const from = location.state?.from || "/"; //redirect user to the home page

  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  const togglePassword = () => {
    setpasswordShown(!passwordShown);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmitHandler = async ({ username, email, password }) => {
    setLoading(true);
    try {
      if (isSignup) {
        const res = await registerUser(username, email, password);
        if (res.status === 201) {
          setCurrentUser(res.data);
          toast.success("Registration Successful");
          navigate(from, { replace: true });
          handleClose();
        }
      } else {
        const res = await loginUser(username, password);
        if (res.status === 200) {
          setCurrentUser(res.data);
          toast.success("Login Successful");
          navigate(from, { replace: true });
          handleClose();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("invalid details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BiUser style={{ cursor: "pointer" }} size="24px" onClick={handleShow} />
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Body>
          <div className="w-100 text-end">
            <AiOutlineClose
              style={{ cursor: "pointer" }}
              size="24px"
              onClick={handleClose}
            />
          </div>
          <div>
            <h1 className="text-center">
              {isSignup ? "Create account" : "Login"}
            </h1>
            <form
              className="d-flex flex-column align-items-center w-100"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className="mb-2 inputRegBox">
                <input
                  type="text"
                  placeholder="Username"
                  id="username"
                  autoFocus
                  className="w-100 mb-0 inputReg"
                  {...register("username", registerOptions.username)}
                />
                {errors?.username?.message && (
                  <span className="text-danger fs-6">
                    {errors.username.message}
                  </span>
                )}
              </div>

              {isSignup && (
                <div className="mb-2 inputRegBox">
                  <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    className="w-100 mb-0 inputReg"
                    {...register("email", registerOptions.email)}
                  />
                  {errors?.email?.message && (
                    <span className="text-danger fs-6">
                      {errors.email.message}
                    </span>
                  )}
                </div>
              )}

              <div className=" mb-2 inputRegBox position-relative">
                <input
                  type={passwordShown ? "text" : "password"}
                  placeholder="password"
                  id="password"
                  className="w-100 inputReg mb-0"
                  {...register("password", registerOptions.password)}
                />
                {passwordShown ? (
                  <AiFillEye
                    className="position-absolute end-0 translate-middle"
                    style={{ top: "50%", cursor: "pointer" }}
                    onClick={togglePassword}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="position-absolute end-0 translate-middle"
                    style={{ top: "50%", cursor: "pointer" }}
                    onClick={togglePassword}
                  />
                )}
              </div>
              {errors?.password?.message && (
                <span className="text-danger fs-6 inputRegBox mb-1">
                  {errors.password.message}
                </span>
              )}
              <Button
                variant="dark"
                type="submit"
                size="lg"
                className="my-4 rounded-0 inputRegBox"
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : isSignup ? (
                  "create"
                ) : (
                  "Sign in"
                )}
              </Button>
              {isSignup ? (
                <p
                  className="fs-6 text-secondary-subtle"
                  type="button"
                  onClick={switchMode}
                >
                  Already have an account?{" "}
                  <span className="text-black text-decoration-underline fs-5">
                    Sign in here
                  </span>
                </p>
              ) : (
                <p
                  className="text-black text-decoration-underline fs-5"
                  type="button"
                  onClick={switchMode}
                >
                  Create Account
                </p>
              )}
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
