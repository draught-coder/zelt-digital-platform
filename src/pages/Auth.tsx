
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [variant, setVariant] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // redirect if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/", { replace: true });
      }
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    if (variant === "signup") {
      const redirectUrl = `${window.location.origin}/`;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectUrl },
      });
      if (error) {
        setErrorMsg(error.message);
      } else {
        toast("Success", {
          description: "Signup successful! Please check your email to confirm.",
        });
        setVariant("login");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setErrorMsg("Invalid credentials or user not confirmed.");
      } else {
        toast("Success", { description: "Logged in. Redirecting..." });
        navigate("/", { replace: true });
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-950 to-purple-900">
      <div className="w-full max-w-md bg-white/90 rounded-lg shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
          {variant === "login" ? "Login" : "Sign Up"} to Ibn Zelt
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-medium mb-1">Email</label>
            <Input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Password</label>
            <Input
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          {errorMsg && (
            <div className="text-red-600 text-sm font-medium">{errorMsg}</div>
          )}
          <Button
            className="w-full"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : variant === "login"
              ? "Login"
              : "Sign up"}
          </Button>
        </form>

        <div className="flex flex-col items-center gap-2 mt-8">
          <span className="text-gray-700">
            {variant === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>
          <button
            className="text-blue-600 font-semibold hover:underline"
            disabled={loading}
            onClick={() => setVariant(variant === "login" ? "signup" : "login")}
          >
            {variant === "login" ? "Sign up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
