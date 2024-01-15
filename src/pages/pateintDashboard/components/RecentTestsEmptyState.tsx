import { BeakerIcon } from "@heroicons/react/24/outline";

export default function RecentTestEmptyState() {
  return (
    <div className="text-center">
      <BeakerIcon className="mx-auto h-12 w-12 text-cyan-600" />

      <h3 className="mt-2 text-sm font-semibold text-gray-900">No services</h3>
      <p className="mt-1 text-sm text-gray-500">
        After your first results are in, they will display here.
      </p>
    </div>
  );
}
