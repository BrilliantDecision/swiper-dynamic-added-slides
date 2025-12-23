import dynamic from "next/dynamic";
import { type PropsWithChildren } from "react";

const NoSSRWrapper = ({ children }: PropsWithChildren) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
