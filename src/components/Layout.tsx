import React from "react";
import { Header, Footer } from ".";

type ChildProp = {
  children: React.ReactNode;
};

function Layout({ children }: ChildProp) {
  return (
    <div className="flex flex-col">
      <Header />
      <main className="grow mx-3 mt-3 mb-20 bg-gray-100/90 rounded-md overflow-x-hidden px-10 py-10 shadow-lg">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
