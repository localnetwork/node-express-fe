import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
export default function Users() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});
  const [payload, setPayload] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getUserInfo = useCallback(async () => {
    const id = router?.query?.id?.[0];
    try {
      const res = await axios?.get(`http://localhost:1000/users/${id}`);
      setPayload(res.data);
    } catch (error) {
      console.error("Error", error);
    }
  }, [router]);

  const onChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });

    console.log("payload", payload);
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.put(
        `http://localhost:1000/users/${payload.id}`,
        payload
      );

      getUserInfo();

      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      console.error("Error", error);
    }
  };

  return (
    <div>
      <div className="py-[50px]">
        <div className="max-w-[500px] mx-auto bg-[#ddd] p-[50px]">
          <h1>Edit User</h1>

          <form onSubmit={onSubmit}>
            <div className="form-item flex flex-col">
              <label htmlFor="name" className="mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={payload.name}
                onChange={onChange}
                className="min-h-[40px] px-[15px]"
                placeholder="Enter your name"
              />
            </div>

            <div className="mt-3">
              <button
                type="submit"
                className="bg-green-500 px-[15px] py-[10px]"
              >
                {isSubmitting ? "Updating..." : "Update User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
