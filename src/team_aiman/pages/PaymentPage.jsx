import React from "react";
import PaymentCard from "../../../src/team_aiman/components/PaymentCard";

export default function PaymentPage({ payment, onPay, onBack }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Payment Gateway</h1>

      <PaymentCard payment={payment} onPay={onPay} onBack={onBack} />
    </div>
  );
}