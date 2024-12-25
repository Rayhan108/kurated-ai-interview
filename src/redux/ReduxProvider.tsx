"use client";
import { store } from "@/redux/store";
import React from "react";
import { Provider } from "react-redux";

export default function ReduxProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Provider store={store}> {children} </Provider>
    </div>
  );
}
