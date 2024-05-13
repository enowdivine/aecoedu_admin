import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../components/Input/InputText";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice";
import { createJob } from "../../app/reducers/app";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const INITIAL_OBJ = {
  title: "",
  category: "",
  location: "",
  expiresIn: ""
};

function AddJobModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [jobObj, setJobObj] = useState(INITIAL_OBJ);
  const [jobType, setJobType] = useState("");
  const [details, setDetails] = useState("");

  const handleCreateEvent = async () => {
    try {
      if (
        jobObj.title &&
        jobObj.location &&
        jobType &&
        details &&
        jobObj.category &&
        jobObj.expiresIn
      ) {
        const newObj = {
          title: jobObj.title,
          category: jobObj.category,
          jobtype: jobType,
          expiresIn: jobObj.expiresIn,
          location: jobObj.location,
          details: details,
        };
        setLoading(true)
        await dispatch(createJob(newObj)).then((res) => {
          if (res.meta.requestStatus === "rejected") {
            setErrorMessage(res.payload)
            setLoading(false)
            return
          }
          dispatch(showNotification({ message: "New Job Added!", status: 1 }));
          setLoading(false)
          window.location.reload()
          closeModal();
        }).catch((err) => {
          console.error(err)
          setLoading(false)
        })
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
    setJobObj({ ...jobObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={jobObj.title}
        updateType="title"
        containerStyle="mt-4"
        labelTitle="Title"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={jobObj.category}
        updateType="category"
        containerStyle="mt-4"
        labelTitle="Category"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={jobObj.location}
        updateType="location"
        containerStyle="mt-4"
        labelTitle="Location"
        updateFormValue={updateFormValue}
      />

      <p style={{ marginTop: 20 }}>Job Type</p>
      <select className="input input-bordered w-full mt-2"
        onChange={(e) => setJobType(e.target.value)}
        value={jobType}>
        <option>Select Job Type</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>

      <InputText
        type="date"
        defaultValue={jobObj.date}
        updateType="expiresIn"
        containerStyle="mt-4"
        labelTitle="Expiring Date"
        updateFormValue={updateFormValue}
      />

      <p style={{ marginTop: 20 }}>Details</p>
      <ReactQuill
        theme="snow"
        value={details}
        onChange={setDetails}
        style={{ height: 200 }}
      />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="btn btn-primary px-6"
          onClick={() => handleCreateEvent()}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default AddJobModalBody;

