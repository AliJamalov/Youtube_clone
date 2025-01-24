import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../stores/authStore";
import toast from "react-hot-toast";
import Label from "../components/ui/Label";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuthStore();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.username.trim() || !formData.password.trim()) {
      toast.error("All fields are required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    const isRegistered = await register(formData);

    if (isRegistered) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-2xl font-bold mb-4">Create account</h1>
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
          already have account ?{" "}
          <Link to="/login">
            <span className="text-blue-400">login</span>
          </Link>
        </p>
        <Button type="submit" className="mt-3 w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-5 animate-spin" />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
