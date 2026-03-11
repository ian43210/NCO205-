import { useState } from 'react'

function Login({ onLogin }) {
  const [studentEmail, setStudentEmail] = useState('')
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')

  const isFormReady =
    studentEmail.trim() !== '' &&
    studentId.trim() !== '' &&
    password.trim() !== ''

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-badge">SUSS Student Access</div>
        <h1 className="login-title">SUSS Shuttle Login</h1>
        <p className="login-text">
          Sign in to access shuttle routes, booking, trip details, and your
          boarding QR.
        </p>

        <div className="login-image-wrap">
          <img
            className="login-image"
            src={`${import.meta.env.BASE_URL}Sample 2.6_Bus exterior.jpg`}
            alt="SUSS shuttle bus"
          />
        </div>

        <label className="login-label">SUSS Student Email</label>
        <input
          className="login-input"
          type="email"
          placeholder="e.g. name@suss.edu.sg"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value)}
        />

        <p className="login-note">
          Please use your SUSS student email to access the shuttle system.
        </p>

        <label className="login-label">Student ID / PI Number</label>
        <input
          className="login-input"
          type="text"
          placeholder="e.g. 1234567A"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        />

        <label className="login-label">Password</label>
        <input
          className="login-input"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" className="forgot-password-button">
          Forgot password?
        </button>

        <button
          className="primary-button login-button"
          disabled={!isFormReady}
          onClick={() =>
            onLogin({
              studentEmail,
              studentId,
            })
          }
        >
          Sign In to Shuttle App
        </button>

        <p className="login-helper">
          Prototype login for demonstration purposes only. No real authentication
          is performed.
        </p>
      </div>
    </div>
  )
}

export default Login