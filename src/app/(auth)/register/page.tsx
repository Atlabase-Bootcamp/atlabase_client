import RegisterForm from "@/features/auth/components/RegisterForm";

function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
