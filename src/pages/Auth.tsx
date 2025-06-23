import React, { useState, useEffect } from "react";
import { supabase } from "../../dashboard-app/src/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/components/ui/sonner";
import "@/styles/auth.css";

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Find intended redirect URL (query param ?returnTo=...)
  function getReturnPath() {
    const params = new URLSearchParams(location.search);
    const returnTo = params.get("returnTo");
    return returnTo || "/dashboard";
  }

  useEffect(() => {
    // Load saved email if "Remember Me" was previously checked
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard", { replace: true });
      }
    });
  }, [navigate, location.search]);

  const handleBookkeeperLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    console.log("Attempting bookkeeper login with email:", email);

    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password
    });
    
    if (error) {
      console.error("Login error:", error);
      setErrorMsg(`Login failed: ${error.message}`);
    } else {
      console.log("✅ Login successful for user:", data.user);
      
      const userId = data.user?.id;
      console.log(`🔍 Searching for profile with ID: ${userId}`);

      // Verify user exists in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error("❌ Profile fetch error:", profileError);
        setErrorMsg(`User profile not found. Please contact support. Error: ${profileError.message}`);
      } else {
        console.log("✅ Profile found. User role:", profileData?.role);
        
        if (profileData?.role !== 'bookkeeper') {
          console.warn(`Role mismatch: Expected 'bookkeeper', but got '${profileData?.role}'`);
          setErrorMsg("Access denied. This account is not authorized for bookkeeper access.");
        } else {
          // Save email to localStorage if "Remember Me" is checked
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          
          toast("Success", { description: "Logged in as Bookkeeper/Admin. Redirecting to dashboard..." });
          navigate("/dashboard", { replace: true });
        }
      }
    }

    setLoading(false);
  };

  const handleClientLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    console.log("Attempting client login with email:", email);

    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password
    });
    
    if (error) {
      console.error("Login error:", error);
      setErrorMsg(`Login failed: ${error.message}`);
    } else {
      console.log("✅ Login successful for user:", data.user);
      
      const userId = data.user?.id;
      console.log(`🔍 Searching for client profile with ID: ${userId}`);
      
      // Verify user exists in profiles table
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error("❌ Profile fetch error:", profileError);
        setErrorMsg(`User profile not found. Please contact support. Error: ${profileError.message}`);
      } else {
        console.log("✅ Profile found. User role:", profileData?.role);
        
        if (profileData?.role !== 'client') {
          console.warn(`Role mismatch: Expected 'client', but got '${profileData?.role}'`);
          setErrorMsg("Access denied. This account is not authorized for client access.");
        } else {
          // Save email to localStorage if "Remember Me" is checked
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }
          
          toast("Success", { description: "Logged in as Client. Redirecting to dashboard..." });
          navigate("/dashboard", { replace: true });
        }
      }
    }

    setLoading(false);
  };

  const toggleForm = () => {
    setIsActive(!isActive);
    setErrorMsg("");
    setEmail("");
    setPassword("");
    // Keep rememberMe state when switching forms
  };

  return (
    <div className="auth-container">
      <div className={`container ${isActive ? 'active' : ''}`}>
        {/* Client Login Form (shows first by default) */}
        <div className="form-box login">
          <form onSubmit={handleClientLogin}>
            <h1>Client Login</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="remember-me">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="checkmark"></span>
                Remember Me
              </label>
            </div>
            {errorMsg && (
              <div className="error-message">{errorMsg}</div>
            )}
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Please wait..." : "Login as Client"}
            </button>
            <p>Access to your financial dashboard and reports</p>
          </form>
        </div>

        {/* Bookkeeper/Admin Login Form (hidden by default) */}
        <div className="form-box register">
          <form onSubmit={handleBookkeeperLogin}>
            <h1>Bookkeeper Login</h1>
            <div className="input-box">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <i className='bx bxs-envelope'></i>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="remember-me">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="checkmark"></span>
                Remember Me
              </label>
            </div>
            {errorMsg && (
              <div className="error-message">{errorMsg}</div>
            )}
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Please wait..." : "Login as Bookkeeper"}
            </button>
            <p>Access to admin dashboard and management tools</p>
          </form>
        </div>

        {/* Toggle Panel */}
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Client!</h1>
            <p>Are you a bookkeeper?</p>
            <button className="btn login-btn" onClick={toggleForm}>
              Bookkeeper Login
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Welcome Back, Bookkeeper!</h1>
            <p>Need to access client dashboard?</p>
            <button className="btn register-btn" onClick={toggleForm}>
              Client Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
