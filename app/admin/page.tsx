"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getuser } from "@/apiCalls/allApiCalls";
import { setUserdetails } from "@/app/redux/allSlice";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import { allUsers } from "@/apiCalls/allApiCalls";
import User from "../NewComponents/User";
import { setAllUsersdetails } from "@/app/redux/allUser";

export default function Component() {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const user = useSelector((data: any) => data?.userSlice?.data);
  const updateuser = useSelector((data: any) => data?.Slice?.data);
  const users = useSelector((data: any) => data?.AlluserSlice?.data);

  useEffect(() => {
    (async () => {
      setProgress(10);
      const res = await getuser();
      setProgress(70);
      if (res?.success) {
        dispatch(setUserdetails(res));
      } else {
        dispatch(setUserdetails({ ...user, picture: null }));
      }
      setProgress(100);
    })();
  }, [updateuser]);

  useEffect(() => {
    (async () => {
      const ans = await allUsers();
      if (ans) {
        dispatch(setAllUsersdetails(ans));
      } else {
        alert("please Login As Admin");
      }
    })();
  }, []);

  return (
    <div>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-2 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Recent Profile Searches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users?.length > 0 ? (
                  <>
                    {users?.map((user: any) => (
                      <User user={user} key={user.id} />
                    ))}
                  </>
                ) : (
                  <div className="w-full flex justify-center items-center">
                    <img src="/loading.gif" className="w-10 m-10 h-10 rounded" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
