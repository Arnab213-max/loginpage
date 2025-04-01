
import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {user ? (
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
          <p className="text-gray-600">You are now logged in.</p>
          <Button onClick={logout} variant="outline" className="mt-4">
            Sign Out
          </Button>
        </div>
      ) : (
        <LoginForm />
      )}

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Demo credentials:</p>
        <p>Email: user@example.com</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
};

export default Index;
