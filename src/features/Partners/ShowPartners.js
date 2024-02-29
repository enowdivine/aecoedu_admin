import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ToogleInput from "../../components/Input/ToogleInput";
import TitleCard from "../../components/Cards/TitleCard";
import { showNotification } from "../common/headerSlice";
import { getSingleNews } from "../../app/reducers/app";
import { useParams } from "react-router-dom";
import ImageUploader from "../../components/Input/ImageUploader";

const INITIAL_PARTNER_OBJ = {
  image: "",
  logo: "",
  title: "",
  desc: "",
  link: "",
};

function ShowPartners() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [PartnerObj, setPartnerObj] = useState(INITIAL_PARTNER_OBJ);

  const handleGetPartners = async () => {
    try {
      await dispatch(getSinglePartner()).then((res) => {
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
        setPartnerObj(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetPartners();
  }, []);

  // Call API to update profile settings changes

  const handleUpdate = async () => {
    try {
      if (
        PartnerObj.image &&
        PartnerObj.logo &&
        PartnerObj.title &&
        PartnerObj.link &&
        PartnerObj.desc
      ) {
        setLoading(true);
        const newPartnerObj = {
          image: PartnerObj.image,
          logo: PartnerObj.logo,
          title: PartnerObj.title,
          desc: PartnerObj.desc,
          link: PartnerObj.link,
        };
        await dispatch(createNews(newPartnerObj)).then((res) => {
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
                status: 2,
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
    setPartnerObj({ ...PartnerObj, [updateType]: value });
  };

  return (
    <>
      <div className="sm:mx-32">
        <TitleCard title="Profile Settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <InputText
              labelTitle="Title"
              defaultValue={PartnerObj.title}
              updateFormValue={updateFormValue}
            />
            <ImageUploader
              labelTitle="image"
              updateFormValue={updateFormValue}
              defaultValue={PartnerObj.image}
            />
            <ImageUploader
              labelTitle="image"
              updateFormValue={updateFormValue}
              defaultValue={PartnerObj.logo}
            />
            <InputText
              type="url"
              labelTitle="Link"
              defaultValue={PartnerObj.link}
              updateFormValue={updateFormValue}
            />
            <TextAreaInput
              labelTitle="Details"
              defaultValue={PartnerObj.desc}
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

export default ShowPartners;
