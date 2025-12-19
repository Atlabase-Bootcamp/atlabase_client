import LoginForm from "@/features/auth/components/LoginForm";

function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <LoginForm />
    </div>
  );
}

export default LoginPage;
