import { useState } from 'react'

export default function Login() {
  const [form, setForm] = useState({
    username: '',
    password: '',
    isStudent: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const onLogin = async (e) => {

  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={onLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">


        <div className="mb-4">
          {/* Toggle for isStudent */}
          <div className="flex justify-center py-5">
            <input
              id="toggle"
              type="checkbox"
              name="isStudent"
              className="hidden"
              checked={form.isStudent}
              onChange={handleInputChange}
            />
            <label htmlFor="toggle" className="flex items-center cursor-pointer">
              <div className="relative">
                <div className="w-10 h-4 bg-gray-200 rounded-full shadow-inner"></div>
                <div className={`dot absolute  bg-primary w-6 h-6 bg-secondary rounded-full shadow -left-1 -top-1 transition ${form.isStudent ? 'translate-x-6' : ''}`}></div>
              </div>
              <div className="ml-3 text-font-bold text-gray-700">
                {form.isStudent ? 'Student' : 'Teacher'}
              </div>
            </label>
          </div>

          {/* Username input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleInputChange}
            />
          </div>

          {/* Password input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
              type="password"
              placeholder="******************"
              value={form.password}
              onChange={handleInputChange}
            />
            <p className="text-red-500 text-xs italic">Please choose a password.</p>
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-primary hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-primary hover:text-red-800" href="#">
              Forgot Password?
            </a>

          </div>
          

        </div>
      </form>
    </div>
  );
}
