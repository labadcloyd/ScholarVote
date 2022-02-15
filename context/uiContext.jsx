import React, { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
const AuthContext = React.createContext();
const PopupContext = React.createContext();
const UpdatePopupContext = React.createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}
export function usePopupState() {
  return useContext(PopupContext);
}
export function useTogglePopup() {
  return useContext(UpdatePopupContext);
}

export default function UiContextProvider({ children }) {
  const session = useSession()
  /* ----- popup state ----- */
  const [popupState, setPopup] = useState({ show: false, type: '', message: '' })
  /* ----- updating popup state ----- */
  async function togglePopup(show, type, message) {
    setPopup({ show, type, message })
  }

  return (
    <AuthContext.Provider value={session}>
      <PopupContext.Provider value={popupState}>
        <UpdatePopupContext.Provider value={togglePopup}>
          {children}
        </UpdatePopupContext.Provider>
      </PopupContext.Provider>
    </AuthContext.Provider>
  );
}
