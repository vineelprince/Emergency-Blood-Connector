function Loader() {
  return (
    <div className="flex items-center justify-center py-24">

      <div className="flex flex-col items-center">

        {/* LOGO LOADER */}

        <div className="relative">

          <div className="w-24 h-24 rounded-full border-4 border-red-100"></div>

          <div className="absolute inset-0 w-24 h-24 rounded-full border-4 border-transparent border-t-[#c1121f] animate-spin"></div>

          <div className="absolute inset-3 bg-white rounded-full flex items-center justify-center shadow-lg">

            <span className="text-[#c1121f] text-2xl font-bold">
              B
            </span>

          </div>

        </div>

        {/* TEXT */}

        <h3 className="mt-8 text-2xl font-bold text-[#130a0c]">
          Loading Data
        </h3>

        <p className="mt-2 text-gray-500">
          Please wait while we connect you to the
          emergency blood network.
        </p>

      </div>

    </div>
  );
}

export default Loader;