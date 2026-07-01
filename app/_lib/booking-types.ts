export interface TranslationDict {
  [key: string]: string | undefined;
}

export interface TimeKey {
  key: string;
  name: string;
}

export interface TestStatus {
  key: string;
  name?: string;
}

export interface TestType {
  key?: string;
  name?: string;
}

export interface TestCenterLocationType {
  key?: string;
  name?: string;
}

export interface TestCenter {
  id: string | number;
  locationName?: string;
  locationName_i18n?: Record<string, string>;
  locationDetails?: string;
  locationDetails_i18n?: Record<string, string>;
  countryCode?: { name?: string };
  locationType?: TestCenterLocationType;
}

export interface TestItem {
  id: string | number;
  testDate?: string;
  startTime?: TimeKey;
  endTime?: TimeKey;
  typeOfTheTest?: TestType;
  testStatus?: TestStatus;
  capacity?: number | string;
  r_testCenterRelationship_c_testCenterId?: string | number;
}

export interface BookingData {
  testCenterId?: string | number | null;
  testId?: string | number | null;
  testDate?: string | null;
  selectedTimeSlot?: string | null;
  startTime?: TimeKey | null;
  endTime?: TimeKey | null;
  testType?: string | null;
  testTypeKey?: string | null;
  testTypeName?: string;
  testTypeName_i18n?: {
    ar_SA: string;
    en_US: string;
  };
  selectedDate?: string | Date | null;
  testStatus?: TestStatus | null;
  capacity?: number | string | null;
  originalBookingData?: BookingData | null;
}

export interface UserProfile {
  firstName?: string;
  secondName?: string;
  lastName?: string;
  firstNameInEnglish?: string;
  secondNameInEnglish?: string;
  lastNameInEnglish?: string;
  emailId?: string;
  phoneExtension?: string;
  phoneNumber?: string;
  nationality?: string;
  country?: string;
  motherTongue?: string;
  lastEducationalQualification?: string;
  timeZone?: string;
  passportNumber?: string;
  state?: string;
  province?: string;
  city?: string;
  postalCode?: string;
}

export interface LookupOption {
  key?: string;
  name?: string;
  label?: string;
}

export interface LookupData {
  nationalityOptions: LookupOption[];
  motherTongueOptions: LookupOption[];
  educationQualificationsOptions: LookupOption[];
  educationInstitutionsOptions: LookupOption[];
  specializationOptions: LookupOption[];
  timezoneOptions: LookupOption[];
  proofOptions: LookupOption[];
}

export interface TestBooking {
  id: string | number;
  emailId?: string;
  r_testRelationship_c_testId?: string | number;
  r_testCenterRelationship_c_testCenterId?: string | number;
  testBookingStatus?: TestStatus;
  typeOfTheTest?: TestType;
  testDate?: string;
  startTime?: TimeKey;
  endTime?: TimeKey;
  locationType?: TestCenterLocationType;
  testLink?: string;
  testUsername?: string;
  testPassword?: string;
}

export interface PaginatedApiResponse<T> {
  items?: T[];
  totalCount?: number;
  [key: string]: unknown;
}

declare global {
  interface Window {
    __bookingData?: BookingData | null;
  }
}

export {};
