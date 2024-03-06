import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { getHostCenters } from "../../app/reducers/app";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewHostCenterModal = () => {
    dispatch(
      openModal({
        title: "Add New HostCenter",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_HOSTCENTER,
      })
    );
  };

  return (
    <div className="">
      <SearchBar />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewHostCenterModal()}
      >
        Add New
      </button>
    </div>
  );
};

function HostCenter() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [hostcenters, setHostCenter] = useState([]);

  const handleGetHostCenters = async () => {
    try {
      await dispatch(getHostCenters()).then((res) => {
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
        setHostCenter(res.payload);
        return;
      });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    handleGetHostCenters();
  }, []);

  const updateCurrentItem = (item) => {
    dispatch(
      openModal({
        title: "Update Host Center",
        bodyType: MODAL_BODY_TYPES.UPDATE_HOST_CENTER,
        extraObject: {
          item,
        },
      })
    );
  };

  const deleteCurrentHostCenter = (item) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete ${item.title}?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.HOSTCENTER_DELETE,
          item
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Host Centers"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Logo</th>
                <th>Image</th>
                <th>Link</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {hostcenters.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              ) : (
                hostcenters?.map((hostcenter) => (
                  <tr key={hostcenter._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-circle w-12 h-12">
                            <img
                              src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${hostcenter?.logo[0]}`}
                              alt="Image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{hostcenter.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-circle w-12 h-12">
                          <img
                            src={`${process.env.REACT_APP_BASE_URL}/uploads/gallery/${hostcenter?.image[0]}`}
                            alt="Image"
                          />
                        </div>
                      </div>
                    </td>
                    <td>{hostcenter.link}</td>
                    <td>{hostcenter.desc}</td>
                    <td>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => updateCurrentItem(hostcenter)}
                      >
                        <PencilSquareIcon className="w-5" />
                      </button>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentHostCenter(hostcenter)}
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

export default HostCenter;