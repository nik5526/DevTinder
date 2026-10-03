import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Base_Url } from "../utils/const";
import { addRequests,removeRequests } from "../utils/requestSlice";
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

  const reviewRequest = async (status, _id) => {
    try {
      //we have sent a {} empty bracets because it is a post call and in post call we have to send the data but here we dont have to sent the data so we have sent empty bracets.
      const res = await axios.post(
        Base_Url + "/request/receive" + "/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequests(_id));
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <div className="text-center text-3xl font-bold my-4 ">
        No Requests Found!
      </div>
    );

  return (
    <div>
      <div className="text-center flex flex-col gap-3 max-w-208 m-auto p-2 justify-center ">
        <h1 className="text-3xl font-bold my-4 ">Requests </h1>
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, about } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="flex border bg-gray-900 gap-4 m-2 rounded-2xl"
            >
              <div>
                {" "}
                <img
                  className="w-42 h-42 rounded-l-2xl"
                  src={photoUrl}
                  alt="photo"
                />
              </div>
              <div className="flex flex-col gap-2 mt-3 ml-4">
                <p className="font-semibold">{firstName + " " + lastName}</p>
                <p className="max-w-150">{about}</p>
                <div className="flex justify-center gap-x-5 mt-2">
                  {" "}
                  {/*here we are sending the rejected and request id from request*/}
                  <button
                    className="btn btn-active btn-success w-20"
                    onClick={() => reviewRequest("accepted", request._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-active btn-error w-20 "
                    onClick={() => reviewRequest("rejected", request._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
