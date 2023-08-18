import { useLocation, matchPath } from "react-router-dom";

export default function useRouterMatch(path){
    const location=useLocation();
    return matchPath(location.pathname , {path})
}