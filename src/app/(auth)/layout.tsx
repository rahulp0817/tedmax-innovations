import Footer from "@/components/Footer";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
