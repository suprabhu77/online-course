import React, { useEffect } from "react";
import { Button } from "../../../../components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import globalAPI from "@/app/_utils/globalAPI";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function CourseEnrollSection({ courseinfo, isEnrolled }) {
  const membership = false;
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("Enrolled", isEnrolled);
  }, []);

  const enrollCourse = (courseinfo) => {
    globalAPI
      .enrollCourse(courseinfo?.slug, user?.primaryEmailAddress?.emailAddress)
      .then((res) => {
        // Redirect to watch course
        if (res) {
          toast("Successfully Enrolled the Course", {
            description: "Continue the Course.....",
            action: {
              label: "Close",
              onClick: () => console.log("Undo"),
            },
          });
          router.push("/watch-course/" + res?.createUserEnrolCourse?.id);
        }
        // Show Toast
      });
  };
  return (
    <div className="p-3 text-center rounded-sm bg-primary">
      <h2 className="text-[22px] font-bold text-white">Enroll to the Course</h2>
      {/* Memeber has membership subsription */}
      {user &&
      (membership || courseinfo?.free) &&
      !isEnrolled &&
      !isEnrolled ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-light">
            Enroll now to start building the project and learn, get the
            Internship Certificate on completion...
          </h2>
          <Button
            className="bg-white text-primary hover:text-primary hover:bg-white"
            onClick={() => enrollCourse(courseinfo)}
          >
            Enroll Now
          </Button>
        </div>
      ) : !user ? (
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-light">
            Enroll now to start building the project and learn, get the
            Internship Certificate on completion...
          </h2>
          <Link href={"/sign-in"}>
            <Button className="bg-white text-primary hover:text-primary hover:bg-white">
              Enroll Now
            </Button>
          </Link>
        </div>
      ) : (
        !isEnrolled && (
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-light">
              Buy Monthly Membership and get access to all the course....
            </h2>
            <Button className="bg-white text-primary hover:text-primary hover:bg-white">
              Buy Membership for $2.99
            </Button>
          </div>
        )
      )}

      {isEnrolled && (
        <div className="flex flex-col gap-3">
          <h2 className="text-white font-light">
            Continue to learn this Project....
          </h2>
          <Link href={'/watch-course/'+ isEnrolled}>
            <Button className="bg-white text-primary hover:text-primary hover:bg-white">
              Continue
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CourseEnrollSection;
