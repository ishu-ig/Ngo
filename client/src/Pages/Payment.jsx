import React, { useEffect, useState, useCallback } from "react";
import { useRazorpay } from "react-razorpay";
import { useParams, Link } from "react-router-dom";
import { Heart, ShieldCheck, CheckCircle2, CreditCard, ArrowLeft, Printer, AlertCircle } from "lucide-react";

export default function Payment() {
    const { _id } = useParams();
    const { Razorpay } = useRazorpay();

    const [donation, setDonation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [paySuccess, setPaySuccess] = useState(false);
    const [payError, setPayError] = useState("");
    const [receiptData, setReceiptData] = useState(null);

    const fetchDonation = useCallback(async () => {
        try {
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/donation/${_id}`);
            const data = await res.json();
            if (data.result === "Done" && data.data) {
                setDonation(data.data);
                if (data.data.paymentStatus === "completed" || data.data.paymentStatus === "Done") {
                    setPaySuccess(true);
                    setReceiptData(data.data);
                }
            } else {
                setPayError("Donation record not found. Please initiate a new donation.");
            }
        } catch (err) {
            console.error("Fetch Donation Error:", err);
            setPayError("Could not retrieve donation information. Please check your connection.");
        } finally {
            setLoading(false);
        }
    }, [_id]);

    useEffect(() => {
        if (_id && _id !== "-1") {
            fetchDonation();
        } else {
            setLoading(false);
        }
    }, [_id, fetchDonation]);

    const handleRazorpayPayment = async () => {
        if (!donation) return;

        try {
            setProcessing(true);
            setPayError("");

            // 1. Create Razorpay order on backend
            const orderRes = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/donation/donation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount: donation.amount,
                    currency: donation.currency || "INR"
                })
            });

            const orderData = await orderRes.json();
            const order = orderData.data;

            if (!order || !order.id) {
                // If test mode or order create failed, allow fallback simulation
                console.warn("Razorpay order creation fallback:", orderData);
            }

            const rzpKey = process.env.REACT_APP_RPKEYID || "rzp_test_hPWsSLPsp2DADQ";

            const options = {
                key: rzpKey,
                amount: (order?.amount) || (donation.amount * 100),
                currency: order?.currency || donation.currency || "INR",
                name: "Subhashish Wellfare Foundation",
                description: `Donation for ${donation.campaign?.title || donation.message || "General Social Welfare"}`,
                image: "/assets/images/logo.png",
                order_id: order?.id,
                prefill: {
                    name: donation.donorName,
                    email: donation.email,
                    contact: donation.phone || ""
                },
                notes: {
                    donationId: donation._id,
                    cause: donation.campaign?.title || "Community Welfare"
                },
                theme: {
                    color: "#0f766e"
                },
                handler: async function (response) {
                    try {
                        setProcessing(true);
                        // 2. Verify signature on backend
                        const verifyRes = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/api/donation/verify`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                checkid: donation._id,
                                razorpay_order_id: response.razorpay_order_id || order?.id || "ORDER_" + Date.now(),
                                razorpay_payment_id: response.razorpay_payment_id || "PAY_" + Date.now(),
                                razorpay_signature: response.razorpay_signature || "TEST_SIG"
                            })
                        });

                        const verifyData = await verifyRes.json();
                        if (verifyData.result === "Done") {
                            setPaySuccess(true);
                            setReceiptData(verifyData.data || {
                                ...donation,
                                paymentId: response.razorpay_payment_id,
                                paymentStatus: "completed"
                            });
                        } else {
                            setPayError(verifyData.message || "Payment verification failed. Please contact support.");
                        }
                    } catch (err) {
                        console.error("Verification Error:", err);
                        setPayError("Network error during payment verification.");
                    } finally {
                        setProcessing(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setProcessing(false);
                    }
                }
            };

            const rzp = new Razorpay(options);
            rzp.on("payment.failed", function (response) {
                setProcessing(false);
                setPayError(response.error?.description || "Payment failed. Please try another payment method.");
            });

            rzp.open();

        } catch (err) {
            console.error("Razorpay Init Error:", err);
            setProcessing(false);
            setPayError("Could not initialize secure payment gateway. Please try again.");
        }
    };

    const printReceipt = () => {
        window.print();
    };

    if (loading) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                    <div className="spinner" style={{ width: 44, height: 44, border: "4px solid #ccfbf1", borderTop: "4px solid #0f766e", borderRadius: "50%", margin: "0 auto 1rem auto", animation: "spin 1s linear infinite" }} />
                    <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>Loading secure donation portal...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: "var(--bg-alt)", minHeight: "85vh", padding: "3.5rem 0" }}>
            <div className="container" style={{ maxWidth: "720px" }}>
                <Link to="/donate" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "var(--primary)", fontWeight: 600, fontSize: "0.9rem", marginBottom: "1.5rem", textDecoration: "none" }}>
                    <ArrowLeft size={16} /> Back to Giving Options
                </Link>

                {!paySuccess ? (
                    <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: "2.5rem", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-light)" }}>
                        {/* Header */}
                        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--primary-subtle)", color: "var(--primary)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "0.75rem" }}>
                                <Heart size={28} />
                            </div>
                            <h1 style={{ fontSize: "1.85rem", marginBottom: "0.35rem", color: "var(--text-primary)" }}>
                                Complete Your Donation
                            </h1>
                            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                                Subhashish Wellfare Foundation • 80G & 501(c)(3) Tax-Deductible
                            </p>
                        </div>

                        {payError && (
                            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", padding: "1rem", borderRadius: "var(--radius-md)", color: "#dc2626", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                                <AlertCircle size={20} style={{ flexShrink: 0 }} />
                                <span>{payError}</span>
                            </div>
                        )}

                        {donation ? (
                            <div>
                                {/* Summary Table */}
                                <div style={{ background: "var(--bg-alt)", padding: "1.5rem", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-light)", marginBottom: "2rem" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-light)", marginBottom: "0.75rem" }}>
                                        <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Donor Name</span>
                                        <strong style={{ color: "var(--text-primary)" }}>{donation.donorName}</strong>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-light)", marginBottom: "0.75rem" }}>
                                        <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Donor Email</span>
                                        <span>{donation.email}</span>
                                    </div>
                                    {donation.phone && (
                                        <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-light)", marginBottom: "0.75rem" }}>
                                            <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Contact Number</span>
                                            <span>{donation.phone}</span>
                                        </div>
                                    )}
                                    <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.75rem", borderBottom: "1px solid var(--border-light)", marginBottom: "0.75rem" }}>
                                        <span style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Cause / Program</span>
                                        <strong style={{ color: "var(--primary)" }}>
                                            {donation.campaign?.title || donation.message || "General Community Welfare"}
                                        </strong>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "0.5rem" }}>
                                        <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>Total Contribution</span>
                                        <span style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary)" }}>
                                            ₹{donation.amount?.toLocaleString('en-IN')} <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{donation.currency || "INR"}</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Security Badges */}
                                <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "1rem", color: "var(--text-muted)", fontSize: "0.825rem", marginBottom: "2rem" }}>
                                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <ShieldCheck size={16} color="var(--primary)" /> 256-Bit SSL Encrypted
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <CheckCircle2 size={16} color="var(--primary)" /> Instant 80G Tax Receipt
                                    </span>
                                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                        <CreditCard size={16} color="var(--primary)" /> Razorpay / UPI / NetBanking
                                    </span>
                                </div>

                                {/* Pay Button */}
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    disabled={processing}
                                    onClick={handleRazorpayPayment}
                                    style={{ width: "100%", padding: "1rem", fontSize: "1.15rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}
                                >
                                    <CreditCard size={20} />
                                    {processing ? "Launching Secure Gateway..." : `Pay ₹${donation.amount?.toLocaleString('en-IN')} Now`}
                                </button>
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", padding: "2rem 0" }}>
                                <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                                    No pending donation selected. Please choose a cause to support.
                                </p>
                                <Link to="/donate" className="btn btn-primary">
                                    Explore Relief Causes
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Receipt / Success Screen */
                    <div style={{ background: "white", borderRadius: "var(--radius-xl)", padding: "3rem", boxShadow: "var(--shadow-xl)", border: "1px solid var(--border-light)" }}>
                        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "#dcfce7", color: "#16a34a", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                                <CheckCircle2 size={42} />
                            </div>
                            <h1 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "0.35rem" }}>
                                Thank You For Your Generosity!
                            </h1>
                            <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
                                Your contribution powers life-changing impact on the ground.
                            </p>
                        </div>

                        {/* Official Receipt Box */}
                        <div style={{ background: "#f8fafc", padding: "clamp(1.25rem, 3vw, 2rem)", borderRadius: "var(--radius-lg)", border: "1.5px dashed var(--border-light)", marginBottom: "2rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid var(--border-light)" }}>
                                <div>
                                    <h3 style={{ fontSize: "1.2rem", color: "var(--primary)", margin: 0 }}>Subhashish Wellfare Foundation</h3>
                                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Official 80G Tax Exemption Receipt</span>
                                </div>
                                <span style={{ background: "#dcfce7", color: "#16a34a", padding: "0.25rem 0.75rem", borderRadius: "var(--radius-full)", fontSize: "0.8rem", fontWeight: 700 }}>
                                    PAID
                                </span>
                            </div>

                            <div className="grid grid-2" style={{ gap: "1rem", fontSize: "0.9rem", marginBottom: "1rem" }}>
                                <div>
                                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Donor Name</span>
                                    <strong>{receiptData?.donorName || donation?.donorName}</strong>
                                </div>
                                <div>
                                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Email Address</span>
                                    <span>{receiptData?.email || donation?.email}</span>
                                </div>
                                <div>
                                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Transaction Reference</span>
                                    <strong style={{ fontFamily: "monospace", color: "var(--primary)" }}>
                                        {receiptData?.rppid || receiptData?.paymentId || "SWF-TXN-" + Math.floor(100000 + Math.random() * 900000)}
                                    </strong>
                                </div>
                                <div>
                                    <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.8rem" }}>Date</span>
                                    <span>{new Date().toLocaleDateString("en-IN", { month: "long", day: "numeric", year: "numeric" })}</span>
                                </div>
                            </div>

                            <div style={{ background: "white", padding: "1rem", borderRadius: "var(--radius-md)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <span style={{ fontWeight: 600 }}>Amount Donated:</span>
                                <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--primary)" }}>
                                    ₹{(receiptData?.amount || donation?.amount)?.toLocaleString('en-IN')}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={printReceipt}
                                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                            >
                                <Printer size={16} /> Print Receipt
                            </button>
                            <Link
                                to="/"
                                className="btn btn-primary"
                                style={{ flex: 1, textAlign: "center" }}
                            >
                                Return to Homepage
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}