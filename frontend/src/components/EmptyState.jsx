function EmptyState({
  title,
  description,
  icon,
}) {
  return (
    <div className="relative overflow-hidden bg-white rounded-[32px] border border-gray-100 shadow-lg">

      {/* BACKGROUND */}

      <div className="absolute top-0 right-0 w-56 h-56 bg-red-50 rounded-full blur-3xl opacity-70" />

      <div className="absolute bottom-0 left-0 w-40 h-40 bg-red-100 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 p-12 text-center">

        {/* ICON */}

        <div className="w-24 h-24 mx-auto rounded-full bg-[#fff1f3] flex items-center justify-center mb-8 shadow-sm">

          <div className="text-[#c1121f] text-4xl">
            {icon}
          </div>

        </div>

        {/* TITLE */}

        <h2 className="text-3xl font-bold text-[#130a0c] mb-4">
          {title}
        </h2>

        {/* DESCRIPTION */}

        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
          {description}
        </p>

      </div>

    </div>
  );
}

export default EmptyState;
