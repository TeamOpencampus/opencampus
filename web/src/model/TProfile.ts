export type TWorkProfile = {
  id: string;
  company: string;
  start_date: string;
  end_date: string;
  salary: string;
  position: string;
};

export type TAcademicProfile = {
  id: string;
  course: string;
  institute: string;
  board: string;
  reg_no: string;
  department: string;
  start_date: string;
  end_date: string;
  marks: string;
};

export type TStudentProfile = {
  caste: string;
  gender: string;
  id: string;
  name: string;
  nationality: string;
  phone: string;
  edges?: {
    academic_profile?: TAcademicProfile[];
    work_profile?: TWorkProfile[];
  };
};

export type TCompany = {
  id: string;
  company_name: string;
  contact_person_email: string;
  contact_person_name: string;
  contact_person_phone: string;
};

export type TJobPost = {
  id: string;
  position: string;
  location: string;
  salary: string;
  description: string;
  created_on: string;
  tags: string[];
  edges: {
    company?: TCompany;
    candidates?: TProfile[];
  };
};

export type TProfile = {
  id: string;
  email: string;
  role: string;
  created_at: string;
  edges: {
    enrolled_in?: TProfile[];
    student_profile?: TStudentProfile;
    college_profile?: {
      name: string;
      phone: string;
      address: string;
      type: string;
    };
  };
};
