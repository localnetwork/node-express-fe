import axios from "axios";
export default function Home() {
  const onSubmit = async (e) => {
    console.log("eeee");
    e.preventDefault();

    const name = e.target.name.value;

    const data = {
      name,
    };

    try {
      const res = await axios.post("http://localhost:1000/users", data);

      console.log("res", res);

      e.target.reset();
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <div className="py-[50px]">
      <div className="max-w-[500px] mx-auto bg-[#ddd] p-[50px]">
        <h1>Create a user</h1>

        <form onSubmit={onSubmit}>
          <div className="form-item flex flex-col">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="min-h-[40px] px-[15px]"
              placeholder="Enter your name"
            />
          </div>

          <div className="mt-3">
            <button type="submit" className="bg-green-500 px-[15px] py-[10px]">
              Create user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
