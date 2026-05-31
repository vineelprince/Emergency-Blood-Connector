import Navbar from "../components/Navbar";
import EmergencyNotificationModal from "../components/EmergencyNotificationModal";

function MainLayout({ children }) {

  return (

    <div className="min-h-screen bg-white">

      <EmergencyNotificationModal />

      <Navbar />

      <main>
        {children}
      </main>

    </div>
  );
}

export default MainLayout;