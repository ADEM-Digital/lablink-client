import { CheckCircleIcon, ExclamationCircleIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { UseQueryResult } from "react-query";
import { StaffDashboardDataType } from "../hooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


type OverviewPropsType = {
  staffDashboardQuery: UseQueryResult<StaffDashboardDataType | undefined, unknown>
}



const Overview = ({staffDashboardQuery} : OverviewPropsType) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    { name: "Completed services", href: "/services", icon: CheckCircleIcon, amount: 0 },
    { name: "Pending services", href: "/services", icon: ExclamationCircleIcon, amount: 0 },
    { name: "Unopened services", href: "/services", icon: PhoneIcon, amount: 0 },
  
  ])

  useEffect(() => {
    if(staffDashboardQuery.data) {
      const updatedCards = [...cards]
      updatedCards[0].amount = staffDashboardQuery.data.completedServices
      updatedCards[1].amount = staffDashboardQuery.data.pendingServices
      updatedCards[2].amount = staffDashboardQuery.data.unopenedServices
      setCards(updatedCards);
    }
  }, [staffDashboardQuery.data])
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg font-medium leading-6 text-gray-900">Overview</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        {cards.map((card) => (
          <div
            key={card.name}
            className="overflow-hidden rounded-lg bg-white shadow"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <card.icon
                    className="h-6 w-6 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      {card.name}
                    </dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">
                        {card.amount}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <button
                  onClick={() => navigate(card.href)}
                  className="font-medium text-cyan-700 hover:text-cyan-900"
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
