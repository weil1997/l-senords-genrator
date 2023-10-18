import React, { useState, useEffect } from "react";
import "./App.css";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()-_+=<>?/",
    };

    let allowedChars = "";

    if (includeUppercase) {
      allowedChars += charset.uppercase;
    }
    if (includeLowercase) {
      allowedChars += charset.lowercase;
    }
    if (includeNumbers) {
      allowedChars += charset.numbers;
    }
    if (includeSymbols) {
      allowedChars += charset.symbols;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChars.length);
      newPassword += allowedChars.charAt(randomIndex);
    }

    setPassword(newPassword);
  };

  const getPasswordStrength = () => {
    let strength = 0;

    if (password.length >= 15) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()-_+=<>?/]/.test(password)) strength++;

    switch (strength) {
      case 1:
      case 2:
        return "Svagt";
      case 3:
        return "Medel";
      case 4:
        return "starkt";
      case 5:
        return "Mycket starkt";
      default:
        return "Mycket svagt";
    }
  };

  const handleSliderChange = (e) => {
    const newLength = parseInt(e.target.value);
    setLength(newLength);
  };

  useEffect(() => {
    generatePassword();
  }, [
    length,
    includeUppercase,
    includeLowercase,
    includeNumbers,
    includeSymbols,
  ]);

  const getPasswordStrengthLevel = () => {
    const strength = getPasswordStrength();
    switch (strength) {
      case "Very Weak ":
        return 1;
      case "Weak":
        return 2;
      case "Medium":
        return 3;
      case "Strong":
        return 4;
      default:
        return 0;
    }
  };

  return (
    <>
      <h1 className="password">Password Generator</h1>
      <input type="text" value={password} readOnly />
      <div className="card">
        <label className="slider-label">
          Character Length:
          <input
            type="range"
            min="4"
            max="32"
            value={length}
            onChange={handleSliderChange}
          />
          {length}
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
          />
          Include uppercase letters
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
          />
          Include lowercase letters
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
          />
          Include numbers
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
          />
          Include symbols
        </label>

        <div className="password-strength">
          <label>
            password strength:
            <span>{getPasswordStrength()}</span>
          </label>
          <div className="strength-bar">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor:
                      index < getPasswordStrengthLevel()
                        ? "#yourActiveColor"
                        : "transparent",
                  }}
                ></div>
              ))}
          </div>
        </div>
        <br />
        <button onClick={generatePassword}>Generate</button>
        <br />
      </div>
    </>
  );
};

export default PasswordGenerator;
