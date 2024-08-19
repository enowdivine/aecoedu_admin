import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { createNews } from "../../app/reducers/app";
import RichEditor from "./RichEditor";

function AddNewsModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newsObj, setNewsObj] = useState({
    title: "",
    body: "Use this area to build your news",
    image: null,
  });

  const handleCreateNews = async () => {
    try {
      if (newsObj.title && newsObj.body && newsObj.image) {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", newsObj.title);
        formData.append("body", newsObj.body);
        formData.append("image", newsObj.image);
        await dispatch(createNews(formData))
          .then((res) => {
            if (res.meta.requestStatus === "rejected") {
              setErrorMessage(res.payload);
              setLoading(false);
              return;
            }
            dispatch(showNotification({ message: "News Added!", status: 1 }));
            setLoading(false);
            window.location.reload();
            closeModal();
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      } else {
        dispatch(
          showNotification({ message: "All field are required!", status: 0 })
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
    setNewsObj({ ...newsObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={newsObj.title}
        updateType="title"
        containerStyle="mt-4 mb-6"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />
      <div className="mb-6">
        <label className="block mb-2">Main Image</label>
        <input
          type="file"
          onChange={(e) => setNewsObj({ ...newsObj, image: e.target.files[0] })}
        />
      </div>
      <RichEditor onChange={setNewsObj} newsObj={newsObj} />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => handleCreateNews()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddNewsModalBody;
