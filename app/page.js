'use client';
import { useSelector } from "react-redux";
import "./globals.css"
import { selectAuth } from "@/app/GlobalRedux/Features/auth/authSlice";

export default function Home() {
  const auth = useSelector(selectAuth);
  const token = window.localStorage.getItem('token');
  return (
    <>
      <div>
        <h1>{token}</h1>
      </div>
    </>
  );
}
