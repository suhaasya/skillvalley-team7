import { confirmPasswordReset, getAuth } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../components/Button";
import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import useQuery from "../hooks/useQuery";

export default function ResetPassword() {
  const auth = getAuth();
  const query = useQuery();
  const navigate = useNavigate();

  const [password, setPassword] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  }

  function resetPassword(e) {
    e.preventDefault();
    const oobCode = query.get("oobCode");

    if (password.newPassword === password.confirmNewPassword) {
      confirmPasswordReset(auth, oobCode, password.newPassword);
      toast.success("Password reset successfully");
      navigate("/login");
    } else {
      toast.error("Passwords doesnt Match");
    }
  }

  return (
    <div>
      <FormContainer onSubmit={resetPassword}>
        <h3 className="text-2xl font-medium text-center">Set New Password</h3>
        <p className="text-sm">
          We have sent an email email. If you don’t see it, please check your
          spam folder.
        </p>
        <Input
          type={"password"}
          label={"New Password"}
          name={"newPassword"}
          value={password.newPassword}
          onChange={handleChange}
        />
        <Input
          type={"password"}
          label={"Confirm New Password"}
          name={"confirmNewPassword"}
          value={password.confirmNewPassword}
          onChange={handleChange}
        />
        <Button type="success" size="medium">
          Set password and login
        </Button>
      </FormContainer>
    </div>
  );
}
