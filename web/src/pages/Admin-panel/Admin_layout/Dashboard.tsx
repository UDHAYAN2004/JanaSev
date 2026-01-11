import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";

export const Dashboard = () => {
  const appUser = useSelector((state: any) => state.appUser);

  return (
    <>
      <Navbar />

      <main className=" bg-gray-50 px-6 py-6 ml-5">
        {/* Header */}
        <section className="mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Welcome back,{" "}
            <span className="text-blue-600">
              {appUser?.user?.name || "Admin"}
            </span>
          </h1>
          <p className="mt-1 text-gray-500">
            Here’s a quick overview of the JanaSev platform
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Schemes"
            value="12"
            icon="📄"
            accent="bg-blue-100 text-blue-600"
          />
          <DashboardCard
            title="Total Users"
            value="50"
            icon="👥"
            accent="bg-green-100 text-green-600"
          />
          <DashboardCard
            title="Categories"
            value="8"
            icon="🗂️"
            accent="bg-purple-100 text-purple-600"
          />
          <DashboardCard
            title="Reviews"
            value="50"
            icon="⭐"
            accent="bg-yellow-100 text-yellow-600"
          />
        </section>
      </main>
    </>
  );
};

/* ---------- Reusable Card Component ---------- */

interface CardProps {
  title: string;
  value: string;
  icon: string;
  accent: string;
}

const DashboardCard = ({ title, value, icon, accent }: CardProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-gray-800">{value}</h3>
        </div>

        <div
          className={`w-12 h-12 flex items-center justify-center rounded-xl text-xl ${accent}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};
