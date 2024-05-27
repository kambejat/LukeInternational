import React from "react";
import Table from "../../ui/Table";
import Dashboard from "./Dashboard";

interface MenuContentProps {
  activeTab: number;
  handleTabChange: (tabNumber: number) => void;
}

const userData = [
  { id: 1, name: "John", age: 30 },
  { id: 2, name: "Jane", age: 25 },
  { id: 3, name: "Doe", age: 35 },
];

const MenuContent: React.FC<MenuContentProps> = ({
  activeTab,
  handleTabChange,
}) => {
  const renderContent = () => {
    if (activeTab === 1) {
      return (
        <>
          <Dashboard />
        </>
      );
    } else if (activeTab === 2) {
      return (
        <>
          <Table data={userData} />
        </>
      );
    }
    return null;
  };

  return renderContent();
};

export default MenuContent;
