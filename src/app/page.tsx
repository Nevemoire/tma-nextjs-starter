"use client"
import {BackButtonHandler} from "@/components/tma/back-button-handler";
import {initData, useSignal} from "@telegram-apps/sdk-react";

export default function Home() {
    const initDataState = useSignal(initData.state);

    console.log(initDataState)
  return (
    <BackButtonHandler back={false}>
        <h1 className="text-5xl">Hi, {initDataState ? initDataState.user?.firstName : "stranger"}!</h1>
    </BackButtonHandler>
  );
}
