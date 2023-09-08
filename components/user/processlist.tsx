export function ProcessList(props: any) {
  const process: Object[] = []
  Object.keys(props.process).forEach(key => {
    let name = key
    let value = props.process[key]
    let isNeeded = true

    switch (String(key)) {
      case "Colored":
        name = "Mehrfarbig"
        break;
      default:
        break;
    }

    if (props.process[key] instanceof Object) {
      let valueString = ""
      for (const key2 in props.process[key]) {
        if (Object.prototype.hasOwnProperty.call(props.process[key], key2)) {
          const value = props.process[key][key2];
          if (value) {
            valueString = valueString + key2 + ", "
          }
        }
      }
      value = valueString.replace(/,\s*$/, "");
    }

    switch (props.process[key]) {
      case true:
        value = "Ja"
        break;
      case false:
        value = "Nein"
        break;
      default:
        break;
    }

    if (isNeeded) {
      const item = { name: name, value: value }
      process.push(item)
    }
  });

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr className="divide-x divide-gray-200">
                  <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    Eigenschaft
                  </th>
                  <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ihre Konfiguration
                  </th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {process.map((item: any) => (
                  <tr key={item.name} className="divide-x divide-gray-200">
                    <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">
                      {item.name}
                    </td>
                    <td className="whitespace-nowrap p-4 text-sm text-gray-500">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}