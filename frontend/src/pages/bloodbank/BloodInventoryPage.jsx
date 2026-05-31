function BloodInventoryPage() {

  const inventory = [
    { group: "A+", units: 35 },
    { group: "A-", units: 12 },
    { group: "B+", units: 42 },
    { group: "B-", units: 8 },
    { group: "AB+", units: 15 },
    { group: "AB-", units: 4 },
    { group: "O+", units: 55 },
    { group: "O-", units: 9 },
  ];

  return (

    <div className="p-8">

      <h1 className="text-4xl font-bold text-red-600 mb-10">
        Blood Inventory
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        {inventory.map((item) => (

          <div
            key={item.group}
            className="bg-white rounded-3xl shadow p-6 text-center"
          >

            <h2 className="text-3xl font-bold text-red-600">
              {item.group}
            </h2>

            <p className="mt-3">
              {item.units} Units
            </p>

          </div>

        ))}

      </div>

    </div>

  );
}

export default BloodInventoryPage;