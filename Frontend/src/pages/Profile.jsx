import { ProfileProvider } from "../context/profileContext";

import ProfileAddress from "../components/profileComp/ProfileAddress";
import ProfileCard from "../components/profileComp/ProfileCard";
import ProfileFooter from "../components/profileComp/ProfileFooter";
import ProfileOverview from "../components/profileComp/ProfileOverview";
import RecentOrders from "../components/profileComp/RecentOrders";

function ProfileLayout() {
  return (
    <div className="w-full h-full flex flex-col px-3 md:px-10 lg:px-22 pt-12 lg:pt-10 bg-slate-50">
      <div className="grid grid-cols-5 grid-rows-5 gap-2 flex-1 rounded-2xl shadow-2xl">
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
  return (
    <ProfileProvider>
      <ProfileLayout />
    </ProfileProvider>
  );
}

export default Profile;
