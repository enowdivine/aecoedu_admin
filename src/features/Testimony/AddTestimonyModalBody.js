import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import TextAreaInput from "../../components/Input/TextAreaInput";
import { createTestimony } from "../../app/reducers/app";

const INITIAL_TESTIMONY_OBJ = {
  name: "",
  desc: "",
  school: "",
  rating: "",
  program: ""
};

function AddTestimonyModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [TestimonyObj, setTestimonyObj] = useState(INITIAL_TESTIMONY_OBJ);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([])

  const handleCreateTestimony = async () => {
    if (TestimonyObj.name.trim() === "")
      return setErrorMessage("Name is required!");
    else if (TestimonyObj.school.trim() === "")
      return setErrorMessage("School is required!")
    else if (TestimonyObj.rating.trim() === "")
      return setErrorMessage("Rating is required!");
    else if (TestimonyObj.program.trim() === "")
      return setErrorMessage("Program is required!");
    else if (TestimonyObj.desc.trim() === "")
      return setErrorMessage("Description is required!");
    else {
      setLoading(true)
      const formData = new FormData();
      formData.append('image', selectedFiles[0]);
      formData.append('name', TestimonyObj.name);
      formData.append('school', TestimonyObj.school);
      formData.append('desc', TestimonyObj.desc);
      formData.append('rating', TestimonyObj.rating);
      formData.append('program', TestimonyObj.program);
      await dispatch(createTestimony(formData)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "New Testimony Added!", status: 1 }));
        setLoading(false)
        closeModal();
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newSelectedFiles = [...selectedFiles, ...files];
      setSelectedFiles(newSelectedFiles);
      displayImagePreviews(newSelectedFiles);
    }
  };

  const displayImagePreviews = (files) => {
    const urls = [];
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = () => {
        urls.push(reader.result);
        if (urls.length === files.length) {
          setPreviews(urls);
        }
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const removeImage = (index) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles.splice(index, 1);
    setSelectedFiles(newSelectedFiles);

    const newImagePreviewUrls = [...previews];
    newImagePreviewUrls.splice(index, 1);
    setPreviews(newImagePreviewUrls);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setTestimonyObj({ ...TestimonyObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={TestimonyObj.title}
        updateType="name"
        containerStyle="mt-4"
        labelTitle="Username"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={TestimonyObj.school}
        updateType="school"
        containerStyle="mt-4"
        labelTitle="School"
        updateFormValue={updateFormValue}
      />
      <InputText
        type="text"
        defaultValue={TestimonyObj.program}
        updateType="program"
        containerStyle="mt-4"
        labelTitle="Program"
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

      <TextAreaInput
        labelTitle="Enter your Testimony"
        labelStyle="text-lg"
        type="text"
        containerStyle="my-4"
        defaultValue={TestimonyObj.desc}
        placeholder="Type your testimony here"
        updateFormValue={updateFormValue}
        updateType="desc"
      />

      <p style={{ marginTop: 20 }}>Image</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange} className="input  input-bordered w-full mt-2" />

      <ul style={{ display: 'flex', flexWrap: 'wrap', marginTop: 20 }}>
        {previews?.map((url, index) => (
          <div style={{ width: "32%", margin: 2 }}>
            <img key={index} src={url} alt={`Image Preview ${index + 1}`}
              style={{ width: "100%", height: '80%', display: 'flex', border: '1px solid #ccc', cursor: 'pointer' }} />
            <p style={{ textAlign: 'right', cursor: 'pointer', color: 'red' }}
              onClick={() => removeImage(index)}
            >remove</p>
          </div>
        ))}
      </ul>

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
