import Link from "next/link";

function Select() {
  return (
    <div className="bg-[#e1e8f0] h-screen lg:block text-align">
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-14 rounded flex flex-col items-center">
          <div className="text-2xl font-extrabold mb-10 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Hãy lựa chọn phần bạn muốn ôn
            </span>
          </div>
          <div className="flex flex-col items-center">
            <Link href={"/pages/Listen"}>
              <button
                type="button"
                className="bg-gradient-to-r rounded-xl px-6 py-2 w-32 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-500 hover:to-yellow-500 mb-4"
              >
                Listen
              </button>
            </Link>
            <Link href={"/pages/Reading"}>
              <button
                type="button"
                className="bg-gradient-to-r rounded-xl px-6 py-2 w-32 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-500 hover:to-yellow-500"
              >
                Reading
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Select;
