import { useEffect, useState } from "react";

function LocationAutocomplete({
  onSelectLocation,
}) {

  const [query, setQuery] =
    useState("");

  const [suggestions, setSuggestions] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // ================= FETCH LOCATIONS =================

  useEffect(() => {

    if (query.length < 3) {

      setSuggestions([]);

      return;
    }

    const fetchLocations =
      async () => {

        try {

          setLoading(true);

          const response =
            await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
            );

          const data =
            await response.json();

          setSuggestions(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    const debounce =
      setTimeout(() => {
        fetchLocations();
      }, 500);

    return () =>
      clearTimeout(debounce);

  }, [query]);

  // ================= SELECT LOCATION =================

  const handleSelect =
    (place) => {

      setQuery(place.display_name);

      setSuggestions([]);

      const address =
        place.display_name.split(",");

      onSelectLocation({
        country:
          address[
            address.length - 1
          ]?.trim() || "",

        state:
          address[
            address.length - 2
          ]?.trim() || "",

        city:
          address[
            address.length - 3
          ]?.trim() || "",

        address:
          place.display_name,

        latitude:
          place.lat,

        longitude:
          place.lon,
      });
    };

  return (
    <div className="relative">

      {/* INPUT */}
      <input
        type="text"
        placeholder="Search location..."
        value={query}
        onChange={(e) =>
          setQuery(e.target.value)
        }
        className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400"
      />

      {/* LOADING */}
      {loading && (
        <div className="absolute right-4 top-4 text-sm text-gray-500">
          Searching...
        </div>
      )}

      {/* SUGGESTIONS */}
      {suggestions.length > 0 && (

        <div className="absolute z-50 bg-white border border-gray-200 rounded-xl mt-2 w-full max-h-72 overflow-y-auto shadow-xl">

          {suggestions.map(
            (place) => (

              <button
                key={place.place_id}
                type="button"
                onClick={() =>
                  handleSelect(place)
                }
                className="w-full text-left px-4 py-3 hover:bg-red-50 border-b border-gray-100"
              >
                {place.display_name}
              </button>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default LocationAutocomplete;