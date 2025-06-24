import EditProfileUser from "../../components/ui/EditProfileUser/EditProfileUser";
import JEMBar from "../../components/ui/JEMBar/JEMBar";
import LoginBar from "../../components/ui/LoginBar/LoginBar";

const Profile = () => {
  return (
    <div>
      <JEMBar />
      <LoginBar />
      <EditProfileUser />
    </div>
  );
};

export default Profile;
