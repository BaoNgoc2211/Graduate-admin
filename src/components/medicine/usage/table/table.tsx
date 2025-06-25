import { useGetMedUsage } from "@/hooks/medicine/usage.hooks";

const TableUsage = () => {
  const { data, isLoading, error } = useGetMedUsage();
  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500">Error loading data</div>;
  }
  if (!data || data.data.length === 0) {
    return <div className="text-center text-gray-500">No data available</div>;
  }
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
        Medicine Usage Table
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Medicine Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usage
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dosage
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Example row, replace with dynamic data */}
            <tr className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">Aspirin</td>
              <td className="px-6 py-4 whitespace-nowrap">Pain Relief</td>
              <td className="px-6 py-4 whitespace-nowrap">500mg</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TableUsage;
