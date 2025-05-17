import { ObjectId } from "mongoose";

export interface IUserSchema extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  resetPasswordOtp: string;
  resetPasswordOtpExpiry: Date;
  googleId:string ;
  isActive: boolean;
  termsAndCondition:boolean
  isProfileCompleted: boolean;
  verificationOtpExpiry: Date;
  verificationOtp: string;
  stripeCustomerId:string;
  isSubscribed:boolean; 
  validatePassword(candidatePassword: string): Promise<boolean>;
  getJwtToken(): string;
  profileId: ObjectId;
}

export interface IProfileSchema extends Document {
  userId: ObjectId;
  profileImage:string;
  firstName: string;
  lastName: string;
  dob: Date;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  phone: string;
  currentTitle: string;
  industry: string;
  summary:string;
  websites?: {
    url: string;
    type: string;
  }[];
  projects: {
    length: number;
    projectName: string;
    projectUrl?: string;
    projectDescription?: string;
  }[];
  languages: { name: string; proficiency: string; skills: string[] }[];
  experience: {
    companyName: string;
    jobTitle: string;
    skills: string[];
    startDate: Date;
    endDate?: Date;
    currentlyWorking: boolean;
    responsibilities: string;
  }[];
  education: {
    level: string;
    university: string;
    major: string;
    specialization: string;
    startDate: Date;
    endDate?: Date;
    gpa: string;
    description: string;
  }[];
  certifications: {
    name: string;
    completionId: string;
    url: string;
    startDate: Date;
    endDate?: Date;
  }[];
  publications:{
    length: number;
    author: string;
    description: string;
    publishedDate: Date;
    publisher: string;
    publisherUrl: string;
    title: string;
  }[]
}

export interface IResumeSchema extends Document {
  userId: ObjectId;
  resumeUrl: string;
  resumeName: string;
}

export interface IPayment {
  customerId: string;
  priceId: string;
  userId: string;
  email: string;
  subscriptionId: string;
  planName: string;
  price: number;
  status: string;
  isSubscribed: boolean;
  startDate: Date;
  endDate: Date;
}
