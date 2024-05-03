import { useState } from "react";
import { useParams } from "react-router-dom";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { Link } from "react-router-dom";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";
import LandingIntro from "./LandingIntro";

function ForgotPassword() {
  const { id } = useParams();

  const INITIAL_PASSWORDS = {
    currentPassword: "",
    newPassword: "",
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (
      passwords.currentPassword.trim() === "" ||
      passwords.newPassword.trim() === ""
    ) {
      return setErrorMessage("Current password and new password are required");
    } else {
      setLoading(true);

      try {
        // Call API to update the password
        const response = await fetch(
          `https://aecoedu-59e5eed6446e.herokuapp.com/api/v1/auth/update-password/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(passwords),
          }
        );

        if (response.ok) {
          setPasswordUpdated(true);
        } else {
          throw new Error("Failed to update password");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }

      setLoading(false);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setPasswords({ ...passwords, [updateType]: value });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center">
      <div className="card mx-auto w-full max-w-5xl  shadow-xl">
        <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
          <div className="">
            <LandingIntro />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 text-center">
              Forgot Password
            </h2>
            {passwordUpdated ? (
              <div className="text-center mt-8">
                <p className="my-4 text-xl font-bold text-center">
                  <CheckCircleIcon className="inline-block w-32 text-success" />
                </p>
                <div className="text-center mt-4">
                  <Link to="/login">
                    <button className="btn btn-block btn-primary">Login</button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => submitForm(e)}>
                <div className="mb-4">
                  <InputText
                    type="password"
                    defaultValue={passwords.currentPassword}
                    updateType="currentPassword"
                    containerStyle="mt-4"
                    labelTitle="Current Password"
                    updateFormValue={updateFormValue}
                  />
                  <InputText
                    type="password"
                    defaultValue={passwords.newPassword}
                    updateType="newPassword"
                    containerStyle="mt-4"
                    labelTitle="New Password"
                    updateFormValue={updateFormValue}
                  />
                </div>
                <ErrorText styleClass="mt-12">{errorMessage}</ErrorText>
                <button
                  type="submit"
                  className={
                    "btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
                  }
                >
                  Update Password
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
