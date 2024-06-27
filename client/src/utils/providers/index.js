import React from "react";
import GqlProvider from "./gqlProvider";

const Providers = ({ children }) => {
  return <GqlProvider>{children}</GqlProvider>;
};

export default Providers;
