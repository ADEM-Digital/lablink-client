import { createContext, useState } from "react"

export type ServicesSlideOverContextType = {
    isServicesSlideOverOpen: boolean;
    setIsServicesSlideOverOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ServicesSlideOverContext = createContext<ServicesSlideOverContextType | undefined>(undefined)

export const useServicesSlideOver = () => {
    const [isServicesSlideOverOpen, setIsServicesSlideOverOpen] = useState<boolean>(false);

    return {
        ServicesSlideOverContext,
        isServicesSlideOverOpen,
        setIsServicesSlideOverOpen,
    }
}