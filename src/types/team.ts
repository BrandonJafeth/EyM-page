export interface TeamMemberContact {
  email: string;
  phone?: string;
  whatsapp?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  shortBio: string;
  fullBio: string;
  professionalProfile: string;
  education: string[];
  judicialExperience: string[];
  specialties: string[];
  courses: string[];
  contact: TeamMemberContact;
}
