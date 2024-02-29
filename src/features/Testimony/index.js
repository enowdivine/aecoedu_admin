import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";
import { getTestimonies } from "../../app/reducers/app";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const AddTestimonyModalBody = () => {
    dispatch(
      openModal({
        title: "Add New Testimony",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_TESTIMONY,
        size: "sm",
      })
    );
  };

  return (
    <div className="">
      <SearchBar />
      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => AddTestimonyModalBody()}
      >
        Add New
      </button>
    </div>
  );
};

function Testimony() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [testimonies, setTestimonies] = useState([]);

  console.log(testimonies);

  const handleGetTestimony = async () => {
    try {
      await dispatch(getTestimonies()).then((res) => {
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
        setTestimonies(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetTestimony();
  }, []);

  const deleteCurrentTestimony = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this testimony?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TESTIMONY_DELETE,
          id,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current Testimony"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>School</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {testimonies.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              ) : (
                testimonies?.map((testimony) => (
                  <tr key={testimony._id}>
                    <td>
                      <img src={testimony.image} alt="partner image" />
                    </td>
                    <td>
                      <div className="font-bold">{testimony.title}</div>
                    </td>
                    <td>{testimony.desc}</td>
                    <td>{testimony.school}</td>
                    <td>{testimony.rating}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        // onClick={() => openShowPartnerModal(partners._id)}
                      >
                        <EyeIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentTestimony(testimony._id)}
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

export default Testimony;
