import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ZakatCalculator from "./pages/ZakatCalculator";
import ResultPage from "./pages/ResultPage";
import PaymentPage from "./pages/PaymentPage";
import TransferPage from "./pages/TransferPage";
import "./App.css";
import "./Styles/ZakatCalculator.css";

export default function App() {
  const defaultResult = {
    zakatAmount: 0,
    nisabStatus: "Not calculated",
    method: "-",
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authPage, setAuthPage] = useState("login"); // "login" or "register"
  const [page, setPage] = useState("calculator");
  const [result, setResult] = useState(defaultResult);
  const [payment, setPayment] = useState({
    paymentId: "PAY-2026-001",
    amount: 0,
    gateway: "FPX / Online Banking",
    status: "Pending",
  });
  const [transfer, setTransfer] = useState({
    transferId: "TRF-2026-001",
    bankName: "Maybank",
    zakatOrganization: "Kelantan Zakat Organization",
    status: "Pending",
  });

  useEffect(() => {
    // Check if user is already logged in
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const savedResult = localStorage.getItem("zakat-result");
    if (savedResult) {
      const parsedResult = JSON.parse(savedResult);

      setResult(parsedResult);
      setPayment((prev) => ({
        ...prev,
        amount: parsedResult.zakatAmount || 0,
      }));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("zakat-result", JSON.stringify(result));
    alert("Calculation result saved successfully.");
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setAuthPage("login");
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    setAuthPage("login");
  };

  const handleGoToRegister = () => {
    setAuthPage("register");
  };

  const handleBackToLogin = () => {
    setAuthPage("login");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setPage("calculator");
  };

  const handleReset = () => {
    localStorage.removeItem("zakat-result");

    setResult({
      zakatAmount: 0,
      nisabStatus: "Not calculated",
      method: "-",
    });

    setPayment({
      paymentId: "PAY-2026-001",
      amount: 0,
      gateway: "FPX / Online Banking",
      status: "Pending",
    });

    setTransfer({
      transferId: "TRF-2026-001",
      bankName: "Maybank",
      zakatOrganization: "Kelantan Zakat Organization",
      status: "Pending",
    });

    setPage("calculator");
    alert("Calculation has been reset.");
  };

  const handleProceedToPayment = () => {
    if (!result || Number(result.zakatAmount) <= 0) {
      alert("Please calculate zakat first before proceeding to payment.");
      return;
    }

    setPayment((prev) => ({
      ...prev,
      amount: Number(result.zakatAmount),
      status: "Pending",
    }));

    setPage("payment");
  };

  const handlePaymentSuccess = () => {
    setPayment((prev) => ({
      ...prev,
      status: "Success",
    }));

    setTransfer((prev) => ({
      ...prev,
      status: "Success",
    }));

    setPage("transfer");
  };

  const handleBackToResult = () => {
    setPage("result");
  };

  const handleCalculatorComplete = (calculatorResult) => {
    const newResult = {
      zakatAmount: Number(calculatorResult.zakat) || 0,
      nisabStatus:
        calculatorResult.total >= calculatorResult.nisab
          ? "Eligible"
          : "Not Eligible",
      method:
        calculatorResult.businessMethod === "UntungRugi"
          ? "Profit & Loss"
          : "Working Capital",
    };

    setResult(newResult);

    setPayment((prev) => ({
      ...prev,
      amount: Number(calculatorResult.zakat) || 0,
      status: "Pending",
    }));

    setTransfer((prev) => ({
      ...prev,
      status: "Pending",
    }));

    setPage("result");
  };

  return (
    <>
      {!isLoggedIn ? (
        <>
          {authPage === "login" ? (
            <Login onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} />
          ) : (
            <Register onRegisterSuccess={handleRegisterSuccess} onBackToLogin={handleBackToLogin} />
          )}
        </>
      ) : (
        <div className="app-shell">
          <div className="app-header-logout">
            <span>👤 {localStorage.getItem("userEmail") || "User"}</span>
            <button 
              onClick={handleLogout}
              className="logout-btn"
              title="Logout"
            >
              🚪 Logout
            </button>
          </div>

          {page === "calculator" && (
            <ZakatCalculator onComplete={handleCalculatorComplete} />
          )}

          {page === "result" && (
            <ResultPage
              result={result}
              onSave={handleSave}
              onReset={handleReset}
              onProceed={handleProceedToPayment}
            />
          )}

          {page === "payment" && (
            <PaymentPage
              payment={payment}
              onPay={handlePaymentSuccess}
              onBack={handleBackToResult}
            />
          )}

          {page === "transfer" && (
            <TransferPage transfer={transfer} onBack={handleBackToResult} />
          )}
        </div>
      )}
    </>
  );
}