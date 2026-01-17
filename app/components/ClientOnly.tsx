'use client'
import dynamic from "next/dynamic";
import React from "react";

const ClientOnly = dynamic(
  () => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>),
  { ssr: false }
);

export default ClientOnly;