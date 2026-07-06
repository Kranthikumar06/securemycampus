import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function SignUp({ onNavigate }) {
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!username || !phone || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify your password entry.');
      return;
    }

    if (!termsAccepted) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);

    // Simulate database registration API
    setTimeout(() => {
      setIsLoading(false);
      alert('Registration submitted! Please check your email for verification.');
      
      // Reset fields
      setUsername('');
      setPhone('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTermsAccepted(false);
      
      // Redirect to Sign In page
      onNavigate('signin');
    }, 1500);
  };

  const handleGoogleSignup = () => {
    alert('Connecting to Google SSO Signup...');
  };

  return (
    <div className="w-full flex justify-center px-gutter relative z-10">
      <Card className="max-w-[480px] p-lg md:p-xl flex flex-col gap-lg bg-surface-container-lowest" isGlass={false}>
        {/* Header Section */}
        <div className="text-center">
          <h1 className="font-headline-lg text-headline-lg text-primary mb-xs">
            Create Account
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Join the community and stay protected on campus.
          </p>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-lg">
          {/* Username Field */}
          <Input
            label="Username"
            id="username"
            type="text"
            icon="person"
            placeholder="johndoe_secure"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Contact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <Input
              label="Phone Number"
              id="phone"
              type="tel"
              icon="phone"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Input
              label="Email"
              id="email"
              type="email"
              icon="mail"
              placeholder="student@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
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

          {/* Confirm Password Field */}
          <Input
            label="Confirm Password"
            id="confirm-password"
            type="password"
            icon="verified_user"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Terms and Conditions */}
          <div className="flex items-start gap-sm py-xs">
            <input
              className="mt-1 w-4 h-4 text-primary rounded border-outline focus:ring-primary cursor-pointer"
              id="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <label className="font-caption text-caption text-on-surface-variant leading-tight cursor-pointer select-none" htmlFor="terms">
              I agree to the <a className="text-primary underline" href="#">Terms of Service</a> and <a className="text-primary underline" href="#">Privacy Policy</a>.
            </label>
          </div>

          {/* Error Message Panel */}
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

          {/* Submit Button */}
          <Button 
            type="submit" 
            variant="primary" 
            icon="arrow_forward" 
            isLoading={isLoading}
          >
            Create Account
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-md my-xl select-none">
          <div className="flex-grow h-[1px] bg-outline-variant"></div>
          <span className="font-label-md text-label-md text-outline">OR</span>
          <div className="flex-grow h-[1px] bg-outline-variant"></div>
        </div>

        {/* Social Signup */}
        <Button 
          variant="social" 
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-md bg-white border border-outline-variant text-on-surface"
        >
          <img 
            alt="Google Logo" 
            className="w-5 h-5 object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVlfjGo3d_0aq9MXgIH3n19ZGXn_wt36CABNmKYvT-bi6-Eh4-DQWNZFkEcRwV0m6668uXi0dhh441qhA9cSyCRZl_8TdrJTbS59bh6qGKCRhpnOm7UF2Od4220Msgd1870R1VdxIBiuc6bMewAH5qx_ht4nc72Qj9AeJFYXHUd38kGex9MzLc8s9CCe-sJ23VJIjHyZwqWj-O8hgSgu-mWLV1TjgBvFDmjYipF-Ao-vam77xXPnsp"
          />
          Sign Up with Google
        </Button>

        {/* Redirect to Sign In */}
        <div className="mt-xl text-center">
          <p className="font-body-md text-body-md text-on-surface-variant">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate('signin')} 
              className="text-primary font-label-md text-label-md hover:underline transition-all bg-transparent border-none p-0 cursor-pointer focus:outline-none"
            >
              Sign In
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
}
