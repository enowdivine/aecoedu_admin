import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ErrorText from "../../components/Typography/ErrorText";
import { showNotification } from "../common/headerSlice"
import { updateJob } from "../../app/reducers/app";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function UpdateJobModalBody({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [jobType, setJobType] = useState("")
  const [location, setLocation] = useState("")
  const [expiresIn, setExpiresIn] = useState("")
  const [details, setDetails] = useState("")

  const { item } = extraObject

  const updateHandler = async () => {
    if (title && category && jobType && location && expiresIn && details) {
      const data = {
        id: item._id,
        title,
        category,
        jobtype: jobType,
        location,
        expiresIn,
        details,
      }
      await dispatch(updateJob(data)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setErrorMessage(res.payload)
          setLoading(false)
          return
        }
        dispatch(showNotification({ message: "Job updated!", status: 1 }));
        setLoading(false)
        window.location.reload()
        closeModal();
      }).catch((err) => {
        console.error(err)
        setLoading(false)
      })
    }
    else {
      return setErrorMessage("All field is required!");
    }
  }

  useEffect(() => {
    setTitle(item.title)
    setCategory(item.category)
    setJobType(item.jobtype)
    setExpiresIn(item.expiresIn)
    setLocation(item.location)
    setDetails(item.details)
  }, [item])

  return (
    <>
      <p style={{ marginTop: 20 }}>Title</p>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Category</p>
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="input input-bordered w-full mt-2" />

      <p style={{ marginTop: 20 }}>Location</p>
      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="input input-bordered w-full mt-2" />

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

      <p style={{ marginTop: 20 }}>Expiring Date</p>
      <input type="date" value={expiresIn} onChange={(e) => setExpiresIn(e.target.value)} className="input input-bordered w-full mt-2" />

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
        <button className="btn btn-primary px-6" onClick={() => updateHandler()}>
          {loading ? "Loading..." : "Save"}
        </button>
      </div>
    </>
  );
}

export default UpdateJobModalBody;
