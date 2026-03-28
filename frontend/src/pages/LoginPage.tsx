import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { document.title = 'Login | Flipkart.com'; }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.data.token, data.data.user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#f1f3f6] p-4">
      <div className="bg-white flex flex-col md:flex-row w-full max-w-[800px] rounded-sm shadow-md overflow-hidden min-h-[500px]">
        {/* Left Side (Blue Background) */}
        <div className="bg-[#2874f0] w-full md:w-[40%] text-white p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4">Login</h1>
            <p className="text-[18px] text-gray-200">Get access to your Orders, Wishlist and Recommendations</p>
          </div>
          <img 
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png" 
            alt="login" 
            className="w-full mt-8 object-contain"
          />
        </div>

        {/* Right Side (Form) */}
        <div className="w-full md:w-[60%] p-8 flex flex-col px-10">
          <form onSubmit={handleLogin} className="flex-1 flex flex-col">
            <div className="mb-6 relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-[#2874f0] py-2 outline-none text-[15px] pt-4 transition-colors ring-0 peer"
                placeholder=" "
              />
              <label 
                className={`absolute left-0 text-gray-500 transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-[12px] peer-focus:text-[#2874f0] ${email ? '-top-2 text-[12px]' : 'top-3 text-[15px]'}`}
              >
                Enter Email/Mobile number
              </label>
            </div>

            <div className="mb-6 relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 focus:border-[#2874f0] py-2 outline-none text-[15px] pt-4 transition-colors ring-0 peer"
                placeholder=" "
              />
              <label 
                className={`absolute left-0 text-gray-500 transition-all pointer-events-none peer-focus:-top-2 peer-focus:text-[12px] peer-focus:text-[#2874f0] ${password ? '-top-2 text-[12px]' : 'top-3 text-[15px]'}`}
              >
                Enter Password
              </label>
              <span className="absolute right-0 top-4 text-[#2874f0] text-sm font-bold cursor-pointer">Forgot?</span>
            </div>

            <p className="text-xs text-gray-500 mt-2 mb-4">
              By continuing, you agree to Flipkart's <span className="text-[#2874f0] cursor-pointer">Terms of Use</span> and <span className="text-[#2874f0] cursor-pointer">Privacy Policy</span>.
            </p>

            {error && <div className="text-red-500 text-sm mb-4 font-medium">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="bg-[#fb641b] text-white w-full py-3 rounded-sm shadow-md font-bold text-[15px] mt-2 mb-4 cursor-pointer hover:bg-[#f05d15] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <div className="flex items-center justify-between mt-3 mb-6">
              <span className="h-[1px] bg-gray-300 flex-1"></span>
              <span className="text-gray-500 px-4 text-sm font-medium">OR</span>
              <span className="h-[1px] bg-gray-300 flex-1"></span>
            </div>

            <button type="button" className="text-[#2874f0] font-bold py-3 bg-white w-full rounded-sm shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] border border-gray-100 mt-2">
              Request OTP
            </button>

            <div className="mt-auto pt-8 text-center text-[14px]">
              <Link to="/signup" className="text-[#2874f0] font-bold cursor-pointer">New to Flipkart? Create an account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
