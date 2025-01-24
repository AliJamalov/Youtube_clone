import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("All fields are required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const isLogin = await login(formData);

    if (isLogin) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="w-[300px]" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label>username</Label>
          <div>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              placeholder="username..."
              value={formData.username}
            />
          </div>
        </div>
        <div>
          <Label>password</Label>
          <div>
            <Input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              type="password"
              placeholder="password..."
              value={formData.password}
            />
          </div>
        </div>
        <p className="text-[16px] mt-3 font-medium">
          Do not have account ?{" "}
          <Link to="/register">
            <span className="text-blue-400">register</span>
          </Link>
        </p>
        <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
