import React from "react";

interface DashboardHeaderProps {
  title: string;
  children?: React.ReactNode;
}

function getUsername(): string {
  if (typeof window !== "undefined") {
    const email = localStorage.getItem("userEmail") || localStorage.getItem("email") || "User";
    if (email && email.includes("@")) {
      return email.split("@")[0];
    }
    return email || "User";
  }
  return "User";
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, children }) => {
  const [username, setUsername] = React.useState<string>("User");

  React.useEffect(() => {
    setUsername(getUsername());
  }, []);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 pt-6 pb-4">
      <div className="flex items-center gap-4 min-w-0">
        <h1 className="text-2xl font-bold truncate">{title}</h1>
        <span className="hidden sm:inline-block text-base text-muted-foreground font-medium truncate max-w-xs">{username}</span>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}; 