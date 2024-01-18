import { Dialog, Transition } from "@headlessui/react";

import {
  FormEvent,
  Fragment,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { ArrowUpOnSquareStackIcon } from "@heroicons/react/24/outline";
import { FullServiceType } from "../../../types/Service";
import { classNames } from "../../../utils/stringUtils";
import DotLoaderSpinner from "../../../components/spinners/DotLoader";
import { useQueryClient } from "react-query";


type UploadResultsPropsType = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  selectedService: FullServiceType | undefined;
  setSelectedService: React.Dispatch<React.SetStateAction<FullServiceType | undefined>>;
};

const UploadResults = ({
  open,
  setOpen,
  selectedService,
  setSelectedService
}: UploadResultsPropsType) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadingFile, setIsUploadingFile] = useState<boolean>(false);
  const queryClient = useQueryClient()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setIsUploadingFile(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/s3/upload`,
        formData,
        {
          params: {
            serviceId: selectedService?._id?.toString(),
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      queryClient.refetchQueries("staffServices");
      setSelectedService(response.data);
      setIsUploadingFile(false)
      setOpen(false)
    } catch (error) {
      console.log(error);
      setIsUploadingFile(false)
    }
  };

  useEffect(() => {
    console.log(selectedService?._id);
  }, [selectedService]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div className={classNames(isUploadingFile ? "hidden" : "")}>
                  <div className="px-4 pb-2 sm:px-0 border-b border-gray-400">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">
                      Upload
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                      Upload the results related to the selected service.
                    </p>
                  </div>
                  <div className="mt-4">
                    <form onSubmit={handleSubmit}>
                      <input
                        className="block w-full  border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6"
                        type="file"
                        id="fileInput"
                        style={{ display: "none" }}
                        onChange={(e) =>
                          e.target.files && e.target.files.length > 0
                            ? setSelectedFile(e.target.files[0])
                            : setSelectedFile(null)
                        }
                      />
                      <div className="flex items-center">
                        <label
                          htmlFor="fileInput"
                          className="flex items-center gap-2 rounded-tl-md rounded-bl-md bg-white px-3.5 py-2.5 text-sm font-semibold text-cyan-600 shadow-sm ring-1 ring-inset ring-cyan-600 hover:bg-gray-50"
                        >
                          <ArrowUpOnSquareStackIcon className="w-4 h-4" />
                        </label>
                        <span className="px-2 truncate flex-1 rounded-tr-md rounded-br-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-600 sm:text-sm sm:leading-6">
                          {selectedFile ? selectedFile.name : "Select a file"}
                        </span>
                      </div>
                      <div className="flex flex-row-reverse mt-4">
                        <button className="inline-flex gap-2 items-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className={classNames(
                    !isUploadingFile ? "hidden" : "",
                    " flex flex-col items-center justify-center w-full min-h-[217px]"
                  )}
                >
                  <DotLoaderSpinner />
                  <p className="mt-10 text-sm text-gray-500">Please wait while we process the request...</p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default UploadResults;
