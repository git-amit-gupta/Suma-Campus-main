import { useMediaQuery } from "./hook";

export const CenterDiv = ({ className = "", ...props }) => (
  <div className={`flex flex-row items-center  ${className}`} {...props} />
);

export const DisplayDiv = ({ className = "", children, ...props }) => {
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  return (
    <div
      className={`flex ${
        isLargeScreen ? "flex-row" : "flex-col"
      }  ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export  const username = localStorage.getItem("username") || "Unknown";
  