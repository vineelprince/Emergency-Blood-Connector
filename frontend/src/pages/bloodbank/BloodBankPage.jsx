function BloodBankPage() {

  return (

    <div className="p-8">

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-red-600">
          Blood Banks
        </h1>

        <p className="text-gray-600 mt-2">
          Connected blood banks across the platform.
        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl shadow p-6">

          <h2 className="font-bold text-xl">
            Hyderabad Blood Center
          </h2>

          <p className="mt-2">
            Hyderabad
          </p>

          <p className="mt-2 text-green-600">
            Active
          </p>

        </div>

      </div>

    </div>

  );
}

export default BloodBankPage;