import { useLocation } from "react-router-dom";

export default function useQueryLocation() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}
