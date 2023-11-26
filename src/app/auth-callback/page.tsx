"use client"

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { trpc } from "../_trpc/client";

type Props = {};

const AuthCallback = (props: Props) => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  const {data, isLoading} = trpc.authCallback.useQuery(undefined, {
    onSuccess: ({success}) => {
      if (success){
        // user is synced to db
        router.push(origin ? `/${origin}` : '/dashboard')
      }
    }
  })
};

export default AuthCallback;
