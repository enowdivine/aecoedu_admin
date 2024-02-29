import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from "../../common/headerSlice";
import InputText from "../../../components/Input/InputText";

function ProfileSettings() {
  const dispatch = useDispatch();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    fetch("https://aecoedu-59e5eed6446e.herokuapp.com/api/v1/profile")
      .then((response) => response.json())
      .then((data) => {
        setProfileData(data);
      })
      .catch((error) => {
        console.error("An error occurred while fetching profile data:", error);
      });
  }, []);

  const updateProfile = () => {
    const userId = "123"; // Replace with the actual user ID or fetch it from state if available
    const email = "alex@dashwind.com"; // Replace with the actual email from state or form input

    fetch(
      `https://aecoedu-59e5eed6446e.herokuapp.com/api/v1/auth/update/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch(showNotification({ message: "Profile Updated", status: 1 }));
      })
      .catch((error) => {
        console.error("An error occurred while updating profile:", error);
      });
  };

  const updateFormValue = ({ updateType, value }) => {
    console.log(updateType);
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
          <InputText
            labelTitle="Email Id"
            defaultValue={profileData.email}
            updateFormValue={updateFormValue}
          />
        <div className="divider"></div>

        <div className="mt-16">
          <button
            className="btn btn-primary float-right"
            onClick={() => updateProfile()}
          >
            Update
          </button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
