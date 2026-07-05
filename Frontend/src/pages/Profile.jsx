import { useOutletContext } from "react-router-dom";

import { ProfileProvider } from "../context/profileContext";

import ProfileAddress from "../components/profileComp/ProfileAddress";
import ProfileCard from "../components/profileComp/ProfileCard";
import ProfileFooter from "../components/profileComp/ProfileFooter";
import ProfileOverview from "../components/profileComp/ProfileOverview";
import RecentOrders from "../components/profileComp/ProfileRecentOrders";
import SubmissionAlert from "../components/profileComp/SubmissionAlert";
import ProfileEdit from "../components/profileComp/ProfileEdit";
import CardList from "../components/profileComp/CardList";
import AddressList from "../components/profileComp/AddressList";

function ProfileLayout() {
  return (
    <div className="w-full h-full flex flex-col px-3 md:px-10 lg:px-12 pt-4 md:pt-8 lg:pt-10 bg-slate-50">
      <div className="flex flex-col md:grid grid-cols-5 grid-rows-5 gap-6 md:gap-3 flex-1 md:h-full rounded-2xl shadow-2xl">
        <SubmissionAlert />
        <ProfileEdit />
        <CardList />
        <AddressList />
        <ProfileOverview />
        <RecentOrders />
        <ProfileCard />
        <ProfileAddress />
        <ProfileFooter />
      </div>
    </div>
  );
}

function Profile() {
  const userData = useOutletContext();
  return (
    <ProfileProvider userData={userData}>
      <ProfileLayout />
    </ProfileProvider>
  );
}

export default Profile;
