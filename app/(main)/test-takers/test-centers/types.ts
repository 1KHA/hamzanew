export type ExamCard = {
  id: number | string;
  centerName: string;
  centerKey: string;
  country: string;
  countryKey: string;
  location: string;
  testType: string;
  typeOfTheTest: string;
  typeOfTheTestKey: string;
  testId: string;
  capacity: number | string;
  level: string;
  status: string;
  date: string;
  registationStatus: "available" | "unavailable";
  testStatus: string;
};

export type DeliveryOption = {
  id: string;
  label: string;
  defaultChecked: boolean;
};

export type CountryOption = {
  key: string;
  name: string;
};

export type TestCentersLabels = {
  testTypePlaceholder: string;
  countryPlaceholder: string;
  noCentersMessage: string;
  noTestAvailable: string;
  registrationStatus: string;
  available: string;
  unavailable: string;
};
