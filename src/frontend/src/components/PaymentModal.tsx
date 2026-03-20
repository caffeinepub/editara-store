import { CheckCircle, Copy, X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { ModalState } from "../App";

const UPI_ID = "7715804457@fam";

interface PaymentModalProps {
  modal: ModalState;
  setModal: React.Dispatch<React.SetStateAction<ModalState>>;
  onClose: () => void;
  copyUPI: () => void;
}

const paymentApps = [
  { label: "💚 Google Pay", color: "#16A34A" },
  { label: "💙 PhonePe", color: "#5B21B6" },
  { label: "💛 Paytm", color: "#1D4ED8" },
  { label: "🟣 Any UPI App", color: "#7C3AED" },
];

export default function PaymentModal({
  modal,
  setModal,
  onClose,
  copyUPI,
}: PaymentModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modal.step === 2) inputRef.current?.focus();
  }, [modal.step]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Editara&am=${modal.amount}&cu=INR`;

  const buildWALink = () => {
    const msg = `Hi Editara! I just paid for ${modal.serviceName} via UPI. Amount: ₹${modal.amount}. Transaction ID: ${
      modal.txnId || "[enter txn id]"
    }. Please confirm.`;
    return `https://wa.me/917715804457?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] modal-overlay"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />
      {/* Modal content */}
      <div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
        data-ocid="payment.modal"
      >
        <div
          className="modal-glass w-full max-w-md rounded-2xl flex flex-col pointer-events-auto"
          style={{
            boxShadow: "0 25px 80px rgba(91,33,182,0.5)",
            maxHeight: "90vh",
          }}
        >
          {/* Header */}
          <div
            className="px-6 py-4 flex items-center justify-between flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(91,33,182,0.3), rgba(59,130,246,0.2))",
              borderBottom: "1px solid rgba(139,92,246,0.3)",
            }}
          >
            <div>
              <h3 className="text-lg font-bold font-heading text-white">
                💳 Complete Your Purchase
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {modal.serviceName} · ₹{modal.amount}
              </p>
            </div>
            <button
              type="button"
              data-ocid="payment.close_button"
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Step indicators */}
          <div className="flex px-6 pt-4 gap-2 flex-shrink-0">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background:
                      modal.step >= s
                        ? "linear-gradient(135deg, #5B21B6, #3B82F6)"
                        : "rgba(255,255,255,0.1)",
                    color: modal.step >= s ? "white" : "#6B7280",
                  }}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className="flex-1 h-0.5 w-8"
                    style={{
                      background:
                        modal.step > s ? "#8B5CF6" : "rgba(255,255,255,0.1)",
                    }}
                  />
                )}
              </div>
            ))}
            <div className="ml-2 text-xs text-gray-400 flex items-center">
              {modal.step === 1
                ? "Pay"
                : modal.step === 2
                  ? "Confirm"
                  : "Done!"}
            </div>
          </div>

          {/* STEP 1 */}
          {modal.step === 1 && (
            <>
              {/* Scrollable content */}
              <div className="px-6 py-4 overflow-y-auto flex-1 space-y-4">
                <div>
                  <p className="text-xs text-gray-400 mb-2">UPI ID to pay:</p>
                  <div
                    className="flex items-center justify-between p-3 rounded-xl"
                    style={{
                      background: "rgba(139,92,246,0.15)",
                      border: "1px solid rgba(139,92,246,0.4)",
                    }}
                  >
                    <span className="font-mono font-bold text-purple-300 text-sm">
                      {UPI_ID}
                    </span>
                    <button
                      type="button"
                      data-ocid="payment.secondary_button"
                      onClick={copyUPI}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                      style={{ background: "rgba(139,92,246,0.4)" }}
                    >
                      <Copy size={12} />
                      Copy
                    </button>
                  </div>
                </div>

                <div
                  className="text-center py-3 rounded-xl"
                  style={{
                    background: "rgba(245,158,11,0.1)",
                    border: "1px solid rgba(245,158,11,0.3)",
                  }}
                >
                  <p className="text-xs text-gray-400">Amount to Pay</p>
                  <p
                    className="text-3xl font-black price-mono"
                    style={{
                      background: "linear-gradient(135deg, #F59E0B, #F97316)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    ₹{modal.amount}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {paymentApps.map((app) => (
                    <a
                      key={app.label}
                      href={upiLink}
                      data-ocid="payment.primary_button"
                      className="flex items-center justify-center py-3 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                      style={{
                        background: app.color,
                        boxShadow: `0 4px 12px ${app.color}40`,
                      }}
                    >
                      {app.label}
                    </a>
                  ))}
                </div>

                <div
                  className="flex flex-col items-center justify-center py-4 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px dashed rgba(255,255,255,0.2)",
                  }}
                >
                  <img
                    src="/assets/uploads/payment-1.jpeg"
                    alt="UPI QR Code"
                    className="w-44 h-44 object-contain p-2 bg-white rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    QR Code for ₹{modal.amount}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Open any UPI app and scan
                  </p>
                </div>
              </div>

              {/* Sticky footer with CTA button — always visible */}
              <div
                className="px-6 pb-5 pt-3 flex-shrink-0"
                style={{
                  borderTop: "1px solid rgba(139,92,246,0.2)",
                  background: "rgba(15,10,30,0.6)",
                }}
              >
                <button
                  type="button"
                  data-ocid="payment.submit_button"
                  onClick={() => setModal((prev) => ({ ...prev, step: 2 }))}
                  className="w-full py-4 rounded-xl font-bold text-base text-white glow-btn"
                >
                  ✅ Done! I've Paid →
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {modal.step === 2 && (
            <div className="px-6 py-4 overflow-y-auto flex-1 space-y-4">
              <div>
                <p className="text-sm text-gray-300 mb-2">
                  Enter your Transaction ID to confirm payment:
                </p>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="e.g. 4123456789"
                  value={modal.txnId}
                  onChange={(e) =>
                    setModal((prev) => ({ ...prev, txnId: e.target.value }))
                  }
                  data-ocid="payment.input"
                  className="w-full px-4 py-3 rounded-xl text-sm font-mono text-white placeholder-gray-500 outline-none"
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(139,92,246,0.4)",
                  }}
                />
              </div>

              <div
                className="p-4 rounded-xl text-sm text-gray-300"
                style={{
                  background: "rgba(22,163,74,0.1)",
                  border: "1px solid rgba(22,163,74,0.3)",
                }}
              >
                <p className="font-semibold text-green-400 mb-1">
                  📸 Send Payment Proof
                </p>
                <p className="text-xs text-gray-400">
                  Take a screenshot of your payment and send it on WhatsApp to
                  confirm.
                </p>
              </div>

              <a
                href={buildWALink()}
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="payment.submit_button"
                onClick={() =>
                  setTimeout(
                    () => setModal((prev) => ({ ...prev, step: 3 })),
                    500,
                  )
                }
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #16A34A, #15803D)",
                  boxShadow: "0 4px 20px rgba(22,163,74,0.4)",
                }}
              >
                📱 Send Payment Screenshot on WhatsApp
              </a>

              <button
                type="button"
                data-ocid="payment.cancel_button"
                onClick={() => setModal((prev) => ({ ...prev, step: 1 }))}
                className="w-full py-2 text-xs text-gray-500 hover:text-gray-300"
              >
                ← Back to payment
              </button>
            </div>
          )}

          {/* STEP 3 */}
          {modal.step === 3 && (
            <div className="px-6 py-4 overflow-y-auto flex-1 flex flex-col items-center text-center space-y-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center animate-scale-in"
                style={{
                  background: "linear-gradient(135deg, #16A34A, #15803D)",
                  boxShadow: "0 0 40px rgba(22,163,74,0.5)",
                }}
              >
                <CheckCircle size={40} className="text-white" />
              </div>
              <div>
                <h4 className="text-xl font-bold font-heading text-white mb-2">
                  Payment Confirmation Sent!
                </h4>
                <p className="text-sm text-gray-400">
                  We'll confirm within{" "}
                  <span className="text-green-400 font-semibold">
                    5 minutes
                  </span>{" "}
                  and start work within{" "}
                  <span className="text-purple-400 font-semibold">1 hour</span>.
                </p>
              </div>
              <div
                className="w-full p-4 rounded-xl text-sm"
                style={{
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <p className="text-purple-300 font-semibold">
                  ✅ What happens next?
                </p>
                <ul className="text-left text-xs text-gray-400 mt-2 space-y-1">
                  <li>1. We verify your payment on WhatsApp</li>
                  <li>2. You receive a confirmation message</li>
                  <li>3. Work begins immediately — delivered in 24h</li>
                </ul>
              </div>
              <button
                type="button"
                data-ocid="payment.close_button"
                onClick={onClose}
                className="px-8 py-3 rounded-xl font-bold text-sm text-white glow-btn"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
