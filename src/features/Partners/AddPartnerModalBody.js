import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import ImageUploader from "../../components/Input/ImageUploader";
import { createPartner } from "../../app/reducers/app";

const INITIAL_PARTNER_OBJ = {
  image: "",
  logo: "",
  title: "",
  desc: "",
  link: "",
};

function AddPartnerModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [PartnerObj, setPartnerObj] = useState(INITIAL_PARTNER_OBJ);

  const handleCreatePartner = async () => {
    try {
      if (
        // eventObj.category &&
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
        await dispatch(createPartner(newPartnerObj)).then((res) => {
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
    setPartnerObj({ ...PartnerObj, [updateType]: value });
  };

  const handleImageUpload = (value) => {
    console.log(value);
    // handle the uploaded image here
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={PartnerObj.name}
        updateType="tilte"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="url"
        defaultValue={PartnerObj.link}
        updateType="link"
        containerStyle="mt-4"
        labelTitle="link"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload logo"
        containerStyle="my-4"
        defaultValue={PartnerObj.logo}
        updateFormValue={handleImageUpload}
        updateType="logo"
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={PartnerObj.image}
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <TextAreaInput
        labelTitle="Enter Description"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={PartnerObj.desc}
        placeholder="Type your description here"
        updateFormValue={updateFormValue}
        updateType="desc"
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => handleCreatePartner()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddPartnerModalBody;
