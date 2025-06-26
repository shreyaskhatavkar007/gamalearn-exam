export interface Assessment {
    id: string;
    area: string;
    program: string;
    course: string;
    name: string;
    startDate: string;
    endDate: string;
    status: "Available" | "Not Available";
  }
  
export interface GroupNode {
    id: string;
    label: string;
    children?: GroupNode[];
  }
  
  export interface Examinee {
    assessmentId: string;
    id: number;
    username: string;
    fullName: string;
    loginTime: string;
    startTime: string;
    area: string;
    groupId: string;
    questionsSynced: number;
    timeElapsed: string;
    status: "Student Submission" | "Absent" | "In Progress";
  }
  export type RecursiveValue = Pick<GroupNode, "id" | "label"> & {
    children?: RecursiveValue[];
  };
