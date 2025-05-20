import ReusableDisplayField from "@/app/common/DisplayField";
import ReExt from "@sencha/reext";
import React from "react";
import "../add/stepper/stepper.css";
import { DisplayDiv } from "@/app/common/CommonDiv";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useGlobalContext } from "@/app/context/GlobalContext";

function StudentInfo(props) {
  const { studentDetails } = props;
  const { theme } = useGlobalContext();

  if (!studentDetails?.name) {
    return <Skeleton count={6} height={100} />;
  }
  return (
    <div
      // className={`flex-1 w-full ${theme == "dark" ? "darkmode" : ""}`}
      className={`flex-1 w-full `}

      style={{ overflowY: "scroll" }}
    >
      <div className="flex items-center w-full">
        <ReExt
          style={{ width: 100, height: 100, minHeight: 100, minWidth: 100 }}
          xtype="image"
          config={{
            src: studentDetails?.logo || "/images/Default_picture.svg",
            width: 100,
            height: 100,
            alt: "logo",
            cls: "profile-img",
          }}
        />
        <div className="flex flex-col items-center m-10">
          <ReusableDisplayField
            label="Applicant Name:"
            value={studentDetails?.name || "Unavailable"}
            labelWidth={120}
            width={350}
            style={{ color: "blue", fontWeight: "bold" }}
          />
          <ReusableDisplayField
            label="Applicant Contact No:"
            value={studentDetails?.phone || "Unknown"}
            labelWidth={120}
            width={350}
          />
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <DisplayDiv>
          <ReusableDisplayField
            label="Email:"
            value={studentDetails?.email || "Unavailable"}
            labelWidth={120}
            width={350}
          />
          <ReusableDisplayField
            label="Gender:"
            value={studentDetails?.gender || "Unavailable"}
            labelWidth={120}
            width={350}
          />
        </DisplayDiv>
        <DisplayDiv>
          <ReusableDisplayField
            label="Country:"
            value={studentDetails?.country || "Unknown"}
            labelWidth={120}
            width={350}
          />
          <ReusableDisplayField
            label="Date of Birth:"
            value={studentDetails?.dob || "Unavailable"}
            labelWidth={120}
            width={350}
          />
        </DisplayDiv>
        <DisplayDiv>
          <ReusableDisplayField
            label="State:"
            value={studentDetails?.state || "Unavailable"}
            labelWidth={120}
            width={350}
          />
          {/* <ReusableDisplayField
            label="Visa Status:"
            value={studentDetails?.status || "Unavailable"}
            labelWidth={120}
            width={350}
            
          /> */}
          <div className="flex items-center w-half" style={{ gap: 25 }}>
            Visa Status:{" "}
            <p
              className={`${
                studentDetails?.status == "Success"
                  ? "active-text"
                  : studentDetails?.status == "Inprogress"
                  ? "progress-text"
                  : "inactive-text"
              }`}
            >
              {studentDetails?.status || "Unavailable"}
            </p>
          </div>
        </DisplayDiv>
        <ReusableDisplayField
          label={"Education Details"}
          style={{ borderTop: "1px solid var(--text-color)" }}
          labelWidth={400}
          width={400}
        />
        <DisplayDiv>
          <ReusableDisplayField
            label="Education Name:"
            value={studentDetails?.education_name || "Unavailable"}
            labelWidth={120}
            width={350}
          />
          <ReusableDisplayField
            label="Medium:"
            value={studentDetails?.medium || "Unavailable"}
            labelWidth={120}
            width={350}
          />
        </DisplayDiv>
        <DisplayDiv>
          <ReusableDisplayField
            label="Highest Qualification:"
            value={studentDetails?.highest_qualification || "Unavailable"}
            labelWidth={120}
            width={350}
          />
          <ReusableDisplayField
            label="Marks:"
            value={studentDetails?.marks || "Unavailable"}
            labelWidth={120}
            width={350}
          />
        </DisplayDiv>
        <DisplayDiv>
          <ReusableDisplayField
            label="Marksheet url:"
            value={studentDetails?.marksheet_url || "Unavailable"}
            labelWidth={120}
            width={350}
          />
          <ReusableDisplayField
            label="Document url:"
            value={studentDetails?.document_url || "Unavailable"}
            labelWidth={120}
            width={350}
          />
        </DisplayDiv>
      </div>
      <hr />
      <ReusableDisplayField label="Course Selected:" labelWidth={320} />
      <div
        id="course-wrapper"
        className="flex flex-col gap-10 items-center justify-center"
      >
        {studentDetails?.selectedUniversity.length > 0
          ? studentDetails?.selectedUniversity.map((item, i) => (
              <div className="course-body gap-10" key={i}>
                <div className="flex flex-col gap-10">
                  <h3 className="text-14">University: {item?.name}</h3>
                  <p className="text-14">Course: {item?.course}</p>
                  <p className="text-14">
                    Status: {item?.status || "Unavailable"}
                  </p>
                </div>
              </div>
            ))
          : "No Course Selected"}
      </div>
    </div>
  );
}

export default StudentInfo;
