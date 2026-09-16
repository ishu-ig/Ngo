import { all } from "redux-saga/effects";
import AboutSagas from "./AboutSaga";
import ProjectSagas from "./ProjectSagas";
import CampaignSagas from "./CampaignSagas";
import DonationSagas from "./DonationSagas";
import VolunteerSagas from "./VolunteerSagas";
import EventSagas from "./EventSagas";
import TeamMemberSagas from "./TeamMemberSagas";
import PartnerSagas from "./PartnerSagas";
import BlogSagas from "./BlogSagas";
import TestimonialSagas from "./TestimonialSagas";
import GallerySagas from "./GallerySagas";
import ImpactSagas from "./ImpactSagas";
import FAQSagas from "./FAQSagas";
import ContactUsSagas from "./ContactUsSagas";
import UserSagas from "./UserSagas";

export default function* RootSagas() {
  yield all([
    AboutSagas(),
    ProjectSagas(),
    CampaignSagas(),
    DonationSagas(),
    VolunteerSagas(),
    EventSagas(),
    TeamMemberSagas(),
    PartnerSagas(),
    BlogSagas(),
    TestimonialSagas(),
    GallerySagas(),
    ImpactSagas(),
    FAQSagas(),
    ContactUsSagas(),
    UserSagas(),
  ]);
}