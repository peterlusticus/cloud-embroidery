
export function InputsAlign(props: any) {
  return (
    <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
      <div className="relative mt-1 rounded-none shadow-sm">
        <input
          type="text"
          id="x"
          className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
          placeholder="X-Koordinate"
        />
      </div>
      <div className="relative mt-1 rounded-none shadow-sm">
        <input
          type="text"
          id="y"
          className="block w-full rounded-none border-gray-300 pl-2 pr-12 focus:border-green-600 focus:ring-green-600 sm:text-sm transition"
          placeholder="Y-Koordinate"
        />
      </div>
    </div>

  );
}