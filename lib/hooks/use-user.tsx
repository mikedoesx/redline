import { AuthContext } from "../providers/auth-context";
import { useContext } from "react";

export const useUser = () => useContext(AuthContext);
