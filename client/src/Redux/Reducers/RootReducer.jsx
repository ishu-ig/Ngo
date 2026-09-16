import { combineReducers } from "@reduxjs/toolkit";
import AboutReducer from "./AboutReducer";
import ProjectReducer from "./ProjectReducer";
import CampaignReducer from "./CampaignReducer";
import DonationReducer from "./DonationReducer";
import VolunteerReducer from "./VolunteerReducer";
import EventReducer from "./EventReducer";
import TeamMemberReducer from "./TeamMemberReducer";
import PartnerReducer from "./PartnerReducer";
import BlogReducer from "./BlogReducer";
import TestimonialReducer from "./TestimonialReducer";
import GalleryReducer from "./GalleryReducer";
import ImpactReducer from "./ImpactReducer";
import FAQReducer from "./FAQReducer";
import ContactUsReducer from "./ContactUsReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
  AboutStateData: AboutReducer,
  ProjectStateData: ProjectReducer,
  CampaignStateData: CampaignReducer,
  DonationStateData: DonationReducer,
  VolunteerStateData: VolunteerReducer,
  EventStateData: EventReducer,
  TeamMemberStateData: TeamMemberReducer,
  PartnerStateData: PartnerReducer,
  BlogStateData: BlogReducer,
  TestimonialStateData: TestimonialReducer,
  GalleryStateData: GalleryReducer,
  ImpactStateData: ImpactReducer,
  FAQStateData: FAQReducer,
  ContactUsStateData: ContactUsReducer,
  UserStateData: UserReducer,
});