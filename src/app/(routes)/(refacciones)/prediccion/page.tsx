import React from 'react'
import PrediccionArima from './PrediccionArima/PrediccionArima'
import { auth } from "../../../../../auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
    
      // Si no hay sesión, redirige al login
      if (!session || !session.user) {
        redirect("/login");
      }

  return (
    <div>
      <PrediccionArima/>
    </div>
  )
}
