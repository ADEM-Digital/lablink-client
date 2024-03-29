import { useNavigate } from "react-router-dom";
import { classNames } from "../../../../utils/stringUtils";

type DesktopSidebarPropsType = {
  navigation: {
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
    current: boolean;
  }[];
  secondaryNavigation: {
    name: string;
    href: string;
    icon: React.ForwardRefExoticComponent<
      Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
        title?: string | undefined;
        titleId?: string | undefined;
      } & React.RefAttributes<SVGSVGElement>
    >;
  }[];
};

const DesktopSidebar = ({
  navigation,
  secondaryNavigation,
}: DesktopSidebarPropsType) => {
  const navigate = useNavigate();
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pb-4 pt-5">
        <div className="flex flex-shrink-0 items-center px-4 gap-2">
          <div className="bg-white rounded-full p-0.5">
            <img className="h-8 w-auto" src="/Lablink-logo.png" alt="LabLink" />
          </div>
          <p className="text-white font-semibold text-2xl">LabLink</p>
        </div>
        <nav
          className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="space-y-1 px-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className={classNames(
                  item.href === window.location.pathname
                    ? "bg-cyan-800 text-white"
                    : "text-cyan-100 hover:bg-cyan-600 hover:text-white",
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 w-full"
                )}
                aria-current={
                  item.href === window.location.pathname ? "page" : undefined
                }
              >
                <item.icon
                  className="mr-4 h-6 w-6 flex-shrink-0 text-cyan-200"
                  aria-hidden="true"
                />
                {item.name}
              </button>
            ))}
          </div>
          <div className="mt-6 pt-6">
            <div className="space-y-1 px-2">
              {secondaryNavigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium leading-6 text-cyan-100 hover:bg-cyan-600 hover:text-white w-full"
                >
                  <item.icon
                    className="mr-4 h-6 w-6 text-cyan-200"
                    aria-hidden="true"
                  />
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidebar;
