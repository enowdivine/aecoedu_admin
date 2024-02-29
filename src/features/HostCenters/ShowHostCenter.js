import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ToogleInput from "../../components/Input/ToogleInput";
import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { getSingleHostCenter, updateEvent, updateHostCenter } from "../../app/reducers/app";
import { useParams } from "react-router-dom";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_HOSTCENTER_OBJ = {
  image: "",
  logo: "",
  title: "",
  desc: "",
  link: "",
};

function ShowHostCenter() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hostcenterObj, sethostcenterObj] = useState(INITIAL_HOSTCENTER_OBJ);

  const handleGetHostCenters = async () => {
    try {
      await dispatch(getSingleHostCenter()).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          dispatch(
            showNotification({
              message: res.payload,
              status: 1,
            })
          );
          setLoading(false);
          return;
        }
        sethostcenterObj(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetHostCenters();
  }, []);

  // Call API to update profile settings changes

    const handleUpdate = async () => {
      try {
        if (
          // eventObj.category &&
          hostcenterObj.image &&
          hostcenterObj.logo &&
          hostcenterObj.title &&
          hostcenterObj.desc &&
          hostcenterObj.link
        ) {
          setLoading(true);
          const newHostCenterObj = {
            image: hostcenterObj.image,
            logo: hostcenterObj.logo,
            title: hostcenterObj.title,
            desc: hostcenterObj.desc,
            link: hostcenterObj.link,
          };
          await dispatch(updateHostCenter(newHostCenterObj)).then((res) => {
            if (res.meta.requestStatus === "rejected") {
              dispatch(
                showNotification({
                  message: res.payload,
                  status: 1,
                })
              );
              setLoading(false);
              return;
            } else {
              dispatch(
                showNotification({
                  message: res.payload.message,
                  status: 1,
                })
              );
              setLoading(false);
              return;
            }
          });
        } else {
          dispatch(
            showNotification({ message: "All field are required!", status: 1 })
          );
          return;
        }
      } catch (error) {
        console.error(error);
        return;
      }
    };

    const updateFormValue = ({ updateType, value }) => {
      setErrorMessage("");
      sethostcenterObj({ ...hostcenterObj, [updateType]: value });
    };

  return (
    <>
      <div className="sm:mx-32">
        <TitleCard title="Profile Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <InputText
              labelTitle="Title"
              defaultValue={hostcenterObj.title}
              updateFormValue={updateFormValue}
            />
            <ImageUploader
                labelTitle="image"
                updateFormValue={updateFormValue}
                defaultValue={hostcenterObj.image}
            />
            <ImageUploader
                labelTitle="logo"
                updateFormValue={updateFormValue}
                defaultValue={hostcenterObj.logo}
            />
            <InputText
              type="url"
              labelTitle="Link"
              defaultValue={hostcenterObj.link}
              updateFormValue={updateFormValue}
            />
            <TextAreaInput
              labelTitle="Details"
              defaultValue={hostcenterObj.desc}
              updateFormValue={updateFormValue}
            />
          </div>
          <div className="divider"></div>
          <div className="mt-16">
            <button
              className="btn btn-primary float-right"
              onClick={() => handleUpdate()}
            >
              Update
            </button>
          </div>
        </TitleCard>
      </div>
    </>
  );
}

export default ShowHostCenter;
