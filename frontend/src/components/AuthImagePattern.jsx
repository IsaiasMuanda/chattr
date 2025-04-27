const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white p-10">
      <div className="max-w-md text-center space-y-4">
        <h2 className="text-3xl font-bold">{title || "Welcome to Our Platform"}</h2>
        <p className="text-lg text-white/80">{subtitle || "Start your journey with us now."}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
