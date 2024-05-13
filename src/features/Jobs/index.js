import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { getJobs } from "../../app/reducers/app";
import { showNotification } from "../common/headerSlice";
import { FilterFunnction } from "../../components/TableFilter/FilterFunction";
import moment from "moment";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewEventModal = () => {
    dispatch(
      openModal({
        title: "Add New Job",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_JOB,
      })
    );
  };

  return (
    <div className="">
      {/* <SearchBar /> */}
      <input type="text" className="input input-bordered w-50 mt-2" placeholder="Search text"
        onKeyUp={(e) => FilterFunnction(0, e.target)} />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewEventModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Jobs() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleGetJobs = async () => {
    try {
      await dispatch(getJobs()).then((res) => {
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
        setJobs(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetJobs();
  }, []);

  const deleteCurrentJob = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.JOB_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Update Job",
        bodyType: MODAL_BODY_TYPES.UPDATE_JOB,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Jobs"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Event List in table format loaded from the state */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full" id="dataTable">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Job Type</th>
                <th>Location</th>
                <th>Expiring Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              ) : (
                jobs?.map((job, index) => (
                  <tr key={index}>
                    <td>
                      <div>
                        <div className="font-bold">{job.title}</div>
                      </div>
                    </td>
                    <td>{job.category}</td>
                    <td>{job.jobtype}</td>
                    <td>{job.location}</td>
                    <td>{moment(job.expiresIn).format("D MMM YYYY")}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => updateCurrentItem(job)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentJob(job)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Jobs;
