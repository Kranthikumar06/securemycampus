import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function SignIn({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    // Simulate login API validation process
    setTimeout(() => {
      setIsLoading(false);
      setError('The credentials provided do not match our records. Please try again or contact security support.');
    }, 1200);
  };

  const handleGoogleLogin = () => {
    alert('Connecting to Google SSO Authorization Service...');
  };

  return (
    <div className="w-full flex justify-center px-md md:px-0">
      <Card className="max-w-[440px] p-xl md:p-2xl flex flex-col gap-lg" isGlass={true}>
        <header className="text-center">
          <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary mb-xs">
            Welcome Back
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Access your campus security dashboard
          </p>
        </header>

        {/* Social Login */}
        <Button 
          variant="social" 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-sm bg-white"
        >
          <img 
            className="w-5 h-5 object-contain" 
            alt="Google Logo" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS5sK3em5q_AQvgvrp2NpFUXasmOQwwjo4JTI6xM2p6mOPpDA-EMcckiGe0x1sssNNb3rYnm7BTuO9PQQp_HriTBF2A9pbLM87IyI2YwEe9PCbyaTeJF7_qsCKCH0PDF8piXtOuwTNsAmIORsKZour_93FhgpNtOXLKsCzv5UlvRhYd4t4uJEIUi8pwdFXH4mTqOy-FUIMr0ybNUEVF0JnuAnjx6ukfdhG8_m6ATlyeFqR8DJhnTdp"
          />
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-sm select-none">
          <div className="h-[1px] flex-grow bg-outline-variant"></div>
          <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider">
            or email
          </span>
          <div className="h-[1px] flex-grow bg-outline-variant"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-md">
          <Input
            label="Campus Email"
            id="email"
            type="email"
            icon="mail"
            placeholder="name@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="flex flex-col gap-xs">
            <Input
              label="Password"
              id="password"
              type="password"
              icon="lock"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end mt-xs">
              <button 
                type="button"
                className="font-label-md text-label-md text-primary hover:underline cursor-pointer border-none bg-transparent p-0 focus:outline-none"
                onClick={() => alert('Reset password link has been sent to your university email.')}
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Mock Error Message Display */}
          {error && (
            <div className="flex items-start gap-xs p-md bg-error-container/30 border border-error/10 rounded-lg animate-in fade-in slide-in-from-top-2">
              <span className="material-symbols-outlined text-error text-[20px] select-none">
                error
              </span>
              <p className="font-caption text-caption text-on-error-container">
                {error}
              </p>
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            icon="arrow_forward" 
            isLoading={isLoading}
            className="mt-sm"
          >
            Sign In
          </Button>
        </form>

        <footer className="text-center mt-md">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Don't have an account?{' '}
            <button 
              onClick={() => onNavigate('signup')} 
              className="text-primary font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        </footer>
      </Card>
    </div>
  );
}
