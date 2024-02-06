import React, { useEffect, useState } from "react";
import { getTokensExpiration } from "../../APIs/Users";
import { useJwt } from "react-jwt";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";
interface Props {}

const Footer: React.FC<Props> = () => {
  const signOut = useSignOut();
  const header = useAuthHeader();
  const [expirace, setExpirace] = useState<string>("");
  const { decodedToken } = useJwt(header || "");
  let timerId: NodeJS.Timeout;

  useEffect(() => {
    const checkTokenExpiration = async () => {
      clearTimeout(timerId);
      if (header && header.length > 0) {
        const data = await getTokensExpiration(`/auth/expiration/`, header);

        setExpirace(data);

        // Schedule the next check after a fixed interval (e.g., 10 minutes)
        timerId = setTimeout(checkTokenExpiration, 10000);
      } else {
        signOut();
        clearTimeout(timerId);
        return;
      }
    };

    checkTokenExpiration();

    return () => {
      // Clear the timeout when the component unmounts
      clearTimeout(timerId);
    };
  }, [header]);

  useEffect(() => {
    // Remove previous interval and token when a new token is generated
    clearTimeout(timerId);
    setExpirace("");
  }, [decodedToken]);

  return (
    <footer className="w-full text-white bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 sticky bottom-0">
      <div className="flex flex-col items-center px-4 py-6 mx-auto lg:items-stretch lg:justify-between lg:flex-row max-w-7xl">
        <div className="grid grid-cols-2 text-center">
          <div className="col-span-1">
            {" "}
            {new Date().getFullYear()} © MediTrack
          </div>
          {expirace && parseInt(expirace) > 0 && (
            <div className="col-span-1">
              {" "}
              Přihlášení vyprší za:{" "}
              <span className="text-blue-300 font-bold underline">
                {expirace} (minuty)
              </span>
            </div>
          )}

          {!expirace && (
            <div className="col-span-1">
              {" "}
              Přihlášení vypršelo -{" "}
              <span
                onClick={() => {
                  signOut();
                }}
                className="text-blue-300 font-bold underline cursor-pointer"
              >
                přihlašte se prosím
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
