"use client";
import CountryVisaPage from "../[country]/page";

export default function UnitedStatesVisaPage(props: any) {
  // Pass the correct slug for dynamic content
  return <CountryVisaPage params={{ country: "united-states" }} />;
}
