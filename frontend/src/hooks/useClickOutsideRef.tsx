import { RefObject, useEffect } from "react";

/**
 * A hook that calls actions when a click occurs outside ref
 */
const useClickOutsideRef = (
  ref: RefObject<HTMLDivElement>,
  handleOutsideClickActions: () => void
) => {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleOutsideClickActions();
      }
    };
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleOutsideClickActions]);
};

export default useClickOutsideRef;
