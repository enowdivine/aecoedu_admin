import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ImageUploader from "../../components/Input/ImageUploader";
import { createTestimony } from "../../app/reducers/app";

const INITIAL_TESTIMONY_OBJ = {
  image: "",
  title: "",
  desc: "",
  school: "",
  rating: "",
};

function AddTestimonyModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [TestimonyObj, setTestimonyObj] = useState(INITIAL_TESTIMONY_OBJ);

  const handleCreateTestimony = async () => {
    try {
      if (
        // eventObj.category &&
        TestimonyObj.image &&
        TestimonyObj.title &&
        TestimonyObj.desc &&
        TestimonyObj.school &&
        TestimonyObj.rating
      ) {
        setLoading(true);
        const newTestimonyObj = {
          image: TestimonyObj.image,
          title: TestimonyObj.title,
          desc: TestimonyObj.desc,
          school: TestimonyObj.school,
          rating: TestimonyObj.rating,
        };
        await dispatch(createTestimony(newTestimonyObj)).then((res) => {
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
    setTestimonyObj({ ...TestimonyObj, [updateType]: value });
  };

  const handleImageUpload = (value) => {
    console.log(value);
    // handle the uploaded image here
  };
  return (
    <>
      <InputText
        type="text"
        defaultValue={TestimonyObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={TestimonyObj.school}
        updateType="shool"
        containerStyle="mt-4"
        labelTitle="School"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="number"
        defaultValue={TestimonyObj.rating}
        updateType="rating"
        containerStyle="mt-4"
        labelTitle="Rating"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={TestimonyObj.image}
        updateFormValue={handleImageUpload}
        updateType="image"
      />
      <TextAreaInput
        labelTitle="Enter your Testimony"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={TestimonyObj.desc}
        placeholder="Type your testimony here"
        updateFormValue={updateFormValue}
        updateType="description"
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => handleCreateTestimony()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddTestimonyModalBody;
