import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import ImageUploader from "../../components/Input/ImageUploader";
import { createNews } from "../../app/reducers/app";

const INITIAL_NEWS_OBJ = {
  image: "",
  title: "",
  desc: "",
  link: "",
};

function AddNewsModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setnewsObj] = useState(INITIAL_NEWS_OBJ);

  const handleCreateNews = async () => {
    try {
      if (
        // eventObj.category &&
        newsObj.image &&
        newsObj.title &&
        newsObj.link &&
        newsObj.desc
      ) {
        setLoading(true);
        const newNewsObj = {
          image: newsObj.image,
          title: newsObj.title,
          desc: newsObj.desc,
          link: newsObj.link,
        };
        await dispatch(createNews(newNewsObj)).then((res) => {
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
    setnewsObj({ ...newsObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={newsObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={newsObj.title}
        updateType="link"
        containerStyle="mt-4"
        labelTitle="Link"
        updateFormValue={updateFormValue}
      />
      <ImageUploader
        labelTitle="Upload an image"
        containerStyle="my-4"
        defaultValue={newsObj.image}
        updateFormValue={updateFormValue}
        updateType="image"
      />
      <TextAreaInput
        labelTitle="Enter your news discription"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={newsObj.desc}
        placeholder="Type your description here"
        updateFormValue={updateFormValue}
        updateType="message"
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => handleCreateNews()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddNewsModalBody;
