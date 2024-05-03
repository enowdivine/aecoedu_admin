import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteRoom, getRoomContent } from "./roomSlice";
import {
  CONFIRMATION_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { showNotification } from "../common/headerSlice";
import SearchBar from "../../components/Input/SearchBar";

const TopSideButtons = () => {
  const dispatch = useDispatch();

  const openAddNewRoomModal = () => {
    dispatch(
      openModal({
        title: "Add New Room",
        bodyType: MODAL_BODY_TYPES.ADD_NEW_ROOM,
      })
    );
  };

  return (
    <div className="">
      <SearchBar />

      <button
        className="btn mx-3 px-6 btn-sm normal-case btn-primary"
        onClick={() => openAddNewRoomModal()}
      >
        Add New
      </button>
    </div>
  );
};

function Rooms() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRoomContent());
  }, []);

  const dbData = false;

  const deleteCurrentRoom = (index) => {
    dispatch(
      openModal({
        title: "Confirmation",
        bodyType: MODAL_BODY_TYPES.CONFIRMATION,
        extraObject: {
          message: `Are you sure you want to delete this room?`,
          type: CONFIRMATION_MODAL_CLOSE_TYPES.ROOM_DELETE,
          index,
        },
      })
    );
  };

  return (
    <>
      <TitleCard
        title="Current room"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        {/* room List in table format loaded from slice after api call */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>size</th>
                <th>Capacity</th>
                <th>Bed</th>
                <th>Service</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-circle w-12 h-12">
                        <img
                          src="https://reqres.in/img/faces/1-image.jpg"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">martin</div>
                    </div>
                  </div>
                </td>
                <td>100</td>
                <td>10</td>
                <td>10 people</td>
                <td>5 bed</td>
                <td>TV ,mini Fride</td>
                <td>
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={() => deleteCurrentRoom(1)}
                  >
                    <TrashIcon className="w-5" />
                  </button>
                </td>
              </tr>
              {dbData === false && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Rooms;
