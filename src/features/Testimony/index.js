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

  const deleteCurrentTestimony = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.name}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.TESTIMONY_DELETE,
          item,
        },
      })
    );
  };

  const updateCurrentTestimony = (item) => {
    dispatch(
      openModal({
        title: "Update Testimony",
        bodyType: MODAL_BODY_TYPES.UPDATE_TESTIMONY,
        extraObject: {
          item,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Testimonials"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* Leads List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>School</th>
                <th>Rating</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {testimonies.length > 0 ?
                testimonies?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${item?.image}`}
                              alt="Image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{item.desc}</td>
                    <td>{item.school}</td>
                    <td>{item.rating}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => updateCurrentTestimony(item)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentTestimony(item)}
                      >
                        <TrashIcon className="w-5" />
                      </button>
                    </td>
                  </tr>
                )) :
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    No records found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Testimony;
