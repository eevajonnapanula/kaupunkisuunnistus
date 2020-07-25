import React, { FunctionComponent, useEffect, useState } from "react";

const Protected: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/me");
      if (res.ok) {
        const userFromApi = await res.json();

        console.log(userFromApi);
        if (userFromApi) {
          setUser(userFromApi);
        }
        return await res.json;
      } else {
        return <div>Not allowed</div>;
      }
    };

    getUser();
  }, []);

  if (!user) return <div>No access</div>;

  return <>{children}</>;
};

export default Protected;
