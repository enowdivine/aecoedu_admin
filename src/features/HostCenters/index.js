import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";
import EyeIcon from "@heroicons/react/24/outline/EyeIcon";
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

  console.log(hostcenters);

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
  const deleteCurrentHostCenter = (id) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this HostCenter?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.HOSTCENTER_DELETE,
          id
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current HostCenter"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Logo</th>
                <th>Title</th>
                <th>Description</th>
                <th>Link</th>
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
                      <img src={hostcenter.image} alt="hostcenter image" />
                    </td>
                    <td>
                      <img src={hostcenter.logo} alt="hostcenter logo" />
                    </td>
                    <td>
                      <div className="font-bold">{hostcenter.title}</div>
                    </td>
                    <td>{hostcenter.desc}</td>
                    <td>{hostcenter.link}</td>
                    <td>
                      <Link to={`/hostcenter/show/${hostcenter._id}`} className="btn btn-square btn-ghost"><EyeIcon className="w-5" /></Link>
                      <button
                        className="btn btn-square btn-ghost"
                        onClick={() => deleteCurrentHostCenter(hostcenter._id)}
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