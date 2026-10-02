import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Base_Url } from "../utils/const";
import { addRequests } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {
      const res = await axios.get(Base_Url + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return <div className="text-center">No Requests Found!</div>;

  return (
    <div >
      <div className="text-center flex flex-col gap-3 max-w-208 m-auto p-2 justify-center ">
        <h1 className="text-3xl font-bold my-4 ">Requests </h1>
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex border bg-gray-900 gap-4 m-2 rounded-2xl"
            >
              <div>
                {" "}
                <img
                  className="w-30 h-30 rounded-l-2xl"
                  src={photoUrl}
                  alt="photo"
                />
              </div>
              <div className="flex flex-col gap-2 mt-3 ml-4">
                {firstName + " " + lastName}
                <p>{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
