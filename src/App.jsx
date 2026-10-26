
import { useState } from "react";
import "./App.css";

const formatMoney = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

function calculateLoan(amount, rate, years) {
  const months = years * 12;
  const monthlyRate = rate / 1200;
  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  return {
    emi,
    totalPayment,
    totalInterest: totalPayment - amount,
  };
}

function App() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(9);
  const [years, setYears] = useState(5);
  const [income, setIncome] = useState(50000);
  const [active, setActive] = useState("Loan Advisor");

  const [documentText, setDocumentText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [insuranceText, setInsuranceText] = useState("");
  const [insuranceAnalysis, setInsuranceAnalysis] = useState("");

  const months = years * 12;
  const monthlyRate = rate / 1200;
  const emi =
    monthlyRate === 0
      ? amount / months
      : (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - amount;
  const incomeShare = income > 0 ? (emi / income) * 100 : 0;
  const remaining = income - emi;

  const tools = [
    { name: "Loan Advisor", icon: "↗" },
    { name: "Loan Comparison", icon: "⇄" },
    { name: "Financial Health", icon: "◉" },
    { name: "Money Tracker", icon: "₹" },
    { name: "Loan X-Ray", icon: "⌕" },
    { name: "Insurance Decoder", icon: "◇" },
    { name: "Safety Net", icon: "♡" },
    { name: "AI Copilot", icon: "✳" },
  ];

  function reviewLoan() {
    if (!documentText.trim()) {
      setAnalysis("Please paste some sample loan details first.");
      return;
    }

    const keywords = [
      "processing fee",
      "penalty",
      "prepayment",
      "late fee",
      "floating rate",
      "insurance",
      "foreclosure",
      "default",
      "additional charges",
      "part payment",
    ];

    const found = keywords.filter((word) =>
      documentText.toLowerCase().includes(word)
    );

    setAnalysis(
      "LOAN DOCUMENT REVIEW — DEMO\n\nTerms to check:\n" +
        (found.length
          ? found.map((word) => "• " + word).join("\n")
          : "No predefined keywords detected.") +
        "\n\nCheck all charges, interest terms and repayment conditions in the original document.\n\nLIMITATION: This is keyword matching, not real AI or legal analysis."
    );
  }

  function reviewInsurance() {
    if (!insuranceText.trim()) {
      setInsuranceAnalysis("Please enter some sample policy text first.");
      return;
    }

    const keywords = [
      "premium",
      "waiting period",
      "exclusion",
      "deductible",
      "co-payment",
      "copayment",
      "claim",
      "renewal",
      "coverage limit",
      "pre-existing",
      "grace period",
      "sum insured",
      "room rent",
    ];

    const found = keywords.filter((word) =>
      insuranceText.toLowerCase().includes(word)
    );

    setInsuranceAnalysis(
      "INSURANCE POLICY REVIEW — DEMO\n\nTerms to check:\n" +
        (found.length
          ? found.map((word) => "• " + word).join("\n")
          : "No predefined keywords detected.") +
        "\n\nCheck coverage, exclusions, waiting periods, limits and claim conditions with the insurer.\n\nLIMITATION: This is keyword matching, not real AI or insurance advice."
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">L</div>
          <div>
            <h2>
              LoanLens<span> AI</span>
            </h2>
            <p>FINANCIAL CLARITY</p>
          </div>
        </div>

        <div className="nav-label">YOUR WORKSPACE</div>

        <nav className="navigation">
          {tools.map((tool) => (
            <button
              key={tool.name}
              className={`nav-item ${
                active === tool.name ? "selected" : ""
              }`}
              onClick={() => setActive(tool.name)}
            >
              <span className="nav-icon">{tool.icon}</span>
              <span>{tool.name}</span>
              {active === tool.name && <span className="active-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="privacy-icon">✓</div>
          <div>
            <strong>Privacy first</strong>
            <p>Demo runs in your browser.</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR FINANCIAL COMPANION</p>
            <h1>{active}</h1>
          </div>
          <div className="demo-pill">
            <span /> PROTOTYPE MODE
          </div>
        </header>

        {active === "Loan Advisor" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <span className="hero-tag">✳ SMART BORROWING</span>
                <h2>
                  Borrow smarter.
                  <br />
                  <span>Live better.</span>
                </h2>
                <p>
                  Understand what a loan really costs before you commit.
                  Adjust the numbers and explore your repayment plan.
                </p>
              </div>
              <div className="hero-art" aria-hidden="true">
                <div className="orbit orbit-one" />
                <div className="orbit orbit-two" />
                <div className="art-circle">
                  <span>₹</span>
                </div>
                <div className="art-label">YOUR MONEY, CLEARER</div>
              </div>
            </section>

            <section className="metrics">
              <div className="metric-card primary-metric">
                <p>MONTHLY EMI</p>
                <h3>{formatMoney(emi)}</h3>
                <span>Estimated monthly payment</span>
              </div>
              <div className="metric-card">
                <p>TOTAL INTEREST</p>
                <h3>{formatMoney(totalInterest)}</h3>
                <span>Cost of borrowing</span>
              </div>
              <div className="metric-card">
                <p>INCOME SHARE</p>
                <h3>{incomeShare.toFixed(1)}%</h3>
                <span>Of your monthly income</span>
              </div>
            </section>

            <section className="workspace-grid">
              <div className="panel calculator-panel">
                <div className="panel-heading">
                  <div>
                    <p className="eyebrow">CUSTOMISE YOUR PLAN</p>
                    <h2>Loan calculator</h2>
                  </div>
                  <span className="panel-icon">↗</span>
                </div>

                <div className="field-group">
                  <div className="field-heading">
                    <label htmlFor="amount">Loan amount</label>
                    <strong>{formatMoney(amount)}</strong>
                  </div>
                  <input
                    id="amount"
                    type="range"
                    min="50000"
                    max="2000000"
                    step="10000"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                  <div className="range-labels">
                    <span>₹50K</span>
                    <span>₹20L</span>
                  </div>
                </div>

                <div className="field-group">
                  <div className="field-heading">
                    <label htmlFor="rate">Interest rate</label>
                    <strong>
                      {rate.toFixed(1)}% <small>p.a.</small>
                    </strong>
                  </div>
                  <input
                    id="rate"
                    type="range"
                    min="1"
                    max="20"
                    step="0.5"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                  />
                  <div className="range-labels">
                    <span>1%</span>
                    <span>20%</span>
                  </div>
                </div>

                <div className="field-group">
                  <div className="field-heading">
                    <label htmlFor="years">Loan tenure</label>
                    <strong>{years} years</strong>
                  </div>
                  <input
                    id="years"
                    type="range"
                    min="1"
                    max="30"
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                  />
                  <div className="range-labels">
                    <span>1 year</span>
                    <span>30 years</span>
                  </div>
                </div>

                <div className="income-field">
                  <label htmlFor="income">Monthly take-home income</label>
                  <div className="income-input-wrap">
                    <span>₹</span>
                    <input
                      id="income"
                      type="number"
                      min="0"
                      value={income}
                      onChange={(e) =>
                        setIncome(Math.max(0, Number(e.target.value)))
                      }
                    />
                    <span className="per-month">/ month</span>
                  </div>
                </div>

                <div className="calculation-note">
                  <span>ⓘ</span>
                  Estimates exclude taxes, fees and other lender charges.
                </div>
              </div>

              <div className="right-column">
                <div className="panel breakdown-panel">
                  <p className="eyebrow">YOUR REPAYMENT BREAKDOWN</p>
                  <h2>See the full picture.</h2>
                  <div className="breakdown-total">
                    <span>Total repayment</span>
                    <strong>{formatMoney(totalPayment)}</strong>
                  </div>
                  <div className="bar-track">
                    <div
                      className="bar-principal"
                      style={{
                        width: `${
                          (amount / Math.max(totalPayment, 1)) * 100
                        }%`,
                      }}
                    />
                    <div
                      className="bar-interest"
                      style={{
                        width: `${
                          Math.max(
                            0,
                            (totalInterest / Math.max(totalPayment, 1)) * 100
                          )
                        }%`,
                      }}
                    />
                  </div>
                  <div className="legend-row">
                    <span>
                      <i className="dot principal-dot" /> Principal
                    </span>
                    <strong>{formatMoney(amount)}</strong>
                  </div>
                  <div className="legend-row">
                    <span>
                      <i className="dot interest-dot" /> Interest
                    </span>
                    <strong>{formatMoney(totalInterest)}</strong>
                  </div>
                </div>

                <div className="panel affordability-panel">
                  <p className="eyebrow">AFFORDABILITY CHECK</p>
                  <h2>Can you comfortably repay?</h2>
                  <div className="affordability-score">
                    <div>
                      <strong>{formatMoney(remaining)}</strong>
                      <span>Income left after EMI</span>
                    </div>
                    <div
                      className={`status-pill ${
                        incomeShare > 40 ? "warning" : "healthy"
                      }`}
                    >
                      {incomeShare > 40 ? "Review budget" : "Within guide"}
                    </div>
                  </div>
                  <p className="small-note">
                    {income <= 0
                      ? "Enter your monthly income to assess affordability."
                      : incomeShare > 40
                      ? "Your EMI is over 40% of income. Consider a smaller loan or longer tenure."
                      : "Your EMI is within a general 40% income guide. Keep room for essentials and emergencies."}
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        {active === "Loan Comparison" && <LoanComparison />}

        {active === "Financial Health" && (
          <FinancialHealth income={income} />
        )}

        {active === "Money Tracker" && <MoneyTracker />}

        {active === "Loan X-Ray" && (
          <section className="panel feature-panel">
            <span className="hero-tag">⌕ DOCUMENT REVIEW</span>
            <h2>Look beyond the fine print.</h2>
            <p>
              Paste sample loan offer or Key Facts Statement text to highlight
              terms worth checking.
            </p>
            <label className="textarea-label" htmlFor="loan-document">
              LOAN DOCUMENT TEXT
            </label>
            <textarea
              id="loan-document"
              className="document-input"
              placeholder="Example: Loan amount ₹5,00,000. Interest rate 10%. Processing fee ₹5,000. Prepayment charges may apply..."
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
            />
            <button className="analyze-button" onClick={reviewLoan}>
              Review document <span>→</span>
            </button>
            {analysis && <pre className="analysis-result">{analysis}</pre>}
            <p className="disclaimer">
              Demo only: keyword matching, not real AI or financial advice. Do
              not paste private documents.
            </p>
          </section>
        )}

        {active === "Insurance Decoder" && (
          <section className="panel feature-panel">
            <span className="hero-tag">◇ POLICY EXPLAINER</span>
            <h2>Make sense of your insurance.</h2>
            <p>
              Enter sample policy wording to identify common terms worth
              checking.
            </p>
            <label className="textarea-label" htmlFor="insurance-document">
              INSURANCE POLICY TEXT
            </label>
            <textarea
              id="insurance-document"
              className="document-input"
              placeholder="Example: Annual premium ₹12,000. A waiting period applies. Pre-existing conditions are subject to exclusions..."
              value={insuranceText}
              onChange={(e) => setInsuranceText(e.target.value)}
            />
            <button className="analyze-button" onClick={reviewInsurance}>
              Review policy <span>→</span>
            </button>
            {insuranceAnalysis && (
              <pre className="analysis-result">{insuranceAnalysis}</pre>
            )}
            <p className="disclaimer">
              Demo only: keyword matching, not real AI or insurance advice. Do
              not enter private information.
            </p>
          </section>
        )}

        {active === "Safety Net" && (
          <SafetyNet money={formatMoney} income={income} />
        )}

        {active === "AI Copilot" && (
          <Copilot money={formatMoney} emi={emi} />
        )}

        <footer className="footer">
          <span>LOANLENS AI</span>
          <span>Clarity before commitment.</span>
          <span>Educational prototype · Not financial advice</span>
        </footer>
      </main>
    </div>
  );
}

function LoanComparison() {
  const [amount, setAmount] = useState(500000);
  const [years, setYears] = useState(5);
  const [rateA, setRateA] = useState(9);
  const [rateB, setRateB] = useState(10);
  const [feeA, setFeeA] = useState(5000);
  const [feeB, setFeeB] = useState(2500);

  const offerA = calculateLoan(amount, rateA, years);
  const offerB = calculateLoan(amount, rateB, years);
  const costA = offerA.totalPayment + feeA;
  const costB = offerB.totalPayment + feeB;
  const difference = Math.abs(costA - costB);
  const winner =
    costA < costB
      ? "Offer A"
      : costB < costA
      ? "Offer B"
      : "Both offers cost the same";

  return (
    <section className="panel feature-panel comparison-panel">
      <span className="hero-tag">⇄ SIDE-BY-SIDE ANALYSIS</span>
      <h2>Two offers. One clearer choice.</h2>
      <p>
        Compare estimated repayment and listed fees using the same loan amount
        and tenure.
      </p>

      <div className="comparison-inputs">
        <div className="field-group">
          <div className="field-heading">
            <label htmlFor="compare-amount">Loan amount</label>
            <strong>{formatMoney(amount)}</strong>
          </div>
          <input
            id="compare-amount"
            type="range"
            min="50000"
            max="2000000"
            step="10000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <div className="range-labels">
            <span>₹50K</span>
            <span>₹20L</span>
          </div>
        </div>

        <div className="field-group">
          <div className="field-heading">
            <label htmlFor="compare-years">Tenure</label>
            <strong>{years} years</strong>
          </div>
          <input
            id="compare-years"
            type="range"
            min="1"
            max="30"
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <div className="range-labels">
            <span>1 year</span>
            <span>30 years</span>
          </div>
        </div>
      </div>

      <div className="comparison-cards">
        {[
          {
            label: "OFFER A",
            rate: rateA,
            setRate: setRateA,
            fee: feeA,
            setFee: setFeeA,
            offer: offerA,
            cost: costA,
          },
          {
            label: "OFFER B",
            rate: rateB,
            setRate: setRateB,
            fee: feeB,
            setFee: setFeeB,
            offer: offerB,
            cost: costB,
          },
        ].map((item, index) => (
          <div className="comparison-offer" key={item.label}>
            <span className="offer-label">{item.label}</span>
            <h3>{index === 0 ? "Lower-rate offer" : "Alternative offer"}</h3>
            <label htmlFor={`rate-${index}`}>Annual interest rate (%)</label>
            <input
              id={`rate-${index}`}
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={item.rate}
              onChange={(e) =>
                item.setRate(
                  Math.min(100, Math.max(0, Number(e.target.value)))
                )
              }
            />
            <label htmlFor={`fee-${index}`}>Processing fee (₹)</label>
            <input
              id={`fee-${index}`}
              type="number"
              min="0"
              value={item.fee}
              onChange={(e) =>
                item.setFee(Math.max(0, Number(e.target.value)))
              }
            />
            <div className="offer-result">
              <span>Monthly EMI</span>
              <strong>{formatMoney(item.offer.emi)}</strong>
            </div>
            <div className="offer-result">
              <span>Total interest</span>
              <strong>{formatMoney(item.offer.totalInterest)}</strong>
            </div>
            <div className="offer-result">
              <span>Total incl. fee</span>
              <strong>{formatMoney(item.cost)}</strong>
            </div>
          </div>
        ))}
      </div>

      <div className="comparison-verdict">
        <p className="eyebrow">COMPARISON SUMMARY</p>
        <h3>{winner}</h3>
        <p>
          {costA === costB
            ? "Both offers have the same estimated repayment plus the processing fee entered."
            : `${winner} is estimated to cost ${formatMoney(
                difference
              )} less over the full tenure, including the entered processing fee.`}
        </p>
        <p className="small-note">
          This estimate includes only principal, reducing-balance interest and
          the processing fee entered. It excludes other charges, insurance,
          taxes and differences in loan conditions.
        </p>
      </div>

      <p className="disclaimer">
        Illustrative comparison, not a lender quote or financial advice. Verify
        the APR, Key Facts Statement, all fees and repayment terms with each
        lender before deciding.
      </p>
    </section>
  );
}

function FinancialHealth({ income }) {
  const [expenses, setExpenses] = useState(25000);
  const [existingEmis, setExistingEmis] = useState(5000);
  const [savings, setSavings] = useState(100000);

  const safeIncome = Math.max(0, income);
  const monthlyOutgoings = expenses + existingEmis;
  const surplus = safeIncome - monthlyOutgoings;
  const savingsRate = safeIncome > 0 ? (surplus / safeIncome) * 100 : 0;
  const emiRatio = safeIncome > 0 ? (existingEmis / safeIncome) * 100 : 0;
  const emergencyMonths = expenses > 0 ? savings / expenses : null;

  let status = "Needs more information";
  let statusClass = "health-neutral";
  let advice =
    "Enter your monthly income in Loan Advisor and review your expenses to see your snapshot.";

  if (safeIncome > 0) {
    if (surplus < 0) {
      status = "Budget under pressure";
      statusClass = "health-high";
      advice =
        "Your listed expenses and existing EMIs exceed your take-home income. Review essential spending and seek reliable financial guidance before taking on more debt.";
    } else if (emiRatio > 40 || savingsRate < 10) {
      status = "Worth reviewing";
      statusClass = "health-medium";
      advice =
        "Your existing EMI burden or remaining surplus may leave limited flexibility. Check your budget and keep room for unexpected costs.";
    } else {
      status = "Positive monthly balance";
      statusClass = "health-good";
      advice =
        "Your listed monthly outgoings are within your income. Continue tracking expenses and build an emergency reserve where possible.";
    }
  }

  return (
    <section className="panel feature-panel health-panel">
      <span className="hero-tag">◉ YOUR MONEY OVERVIEW</span>
      <h2>Your financial health, at a glance.</h2>
      <p>
        Your income is shared from Loan Advisor. Enter your own estimates for
        other expenses, existing EMIs and savings.
      </p>

      <div className="health-income-banner">
        <div>
          <span>MONTHLY TAKE-HOME INCOME</span>
          <strong>{formatMoney(safeIncome)}</strong>
        </div>
        <p className="small-note">
          To change income, use the Loan Advisor tab.
        </p>
      </div>

      <div className="health-fields">
        <div className="income-field">
          <label htmlFor="health-expenses">Other monthly expenses (₹)</label>
          <div className="income-input-wrap">
            <span>₹</span>
            <input
              id="health-expenses"
              type="number"
              min="0"
              value={expenses}
              onChange={(e) =>
                setExpenses(Math.max(0, Number(e.target.value)))
              }
            />
          </div>
        </div>
        <div className="income-field">
          <label htmlFor="health-emis">Existing monthly EMIs (₹)</label>
          <div className="income-input-wrap">
            <span>₹</span>
            <input
              id="health-emis"
              type="number"
              min="0"
              value={existingEmis}
              onChange={(e) =>
                setExistingEmis(Math.max(0, Number(e.target.value)))
              }
            />
          </div>
        </div>
        <div className="income-field">
          <label htmlFor="health-savings">Available savings (₹)</label>
          <div className="income-input-wrap">
            <span>₹</span>
            <input
              id="health-savings"
              type="number"
              min="0"
              value={savings}
              onChange={(e) =>
                setSavings(Math.max(0, Number(e.target.value)))
              }
            />
          </div>
        </div>
      </div>

      <div className="health-metrics">
        <div className="health-metric">
          <span>MONTHLY SURPLUS</span>
          <strong className={surplus < 0 ? "negative-value" : ""}>
            {formatMoney(surplus)}
          </strong>
          <p>
            {surplus >= 0
              ? "Income remaining after listed outgoings"
              : "Monthly shortfall to address"}
          </p>
        </div>
        <div className="health-metric">
          <span>EXISTING EMI RATIO</span>
          <strong>{safeIncome > 0 ? `${emiRatio.toFixed(1)}%` : "—"}</strong>
          <p>Existing EMIs as a share of income</p>
        </div>
        <div className="health-metric">
          <span>SAVINGS COVERAGE</span>
          <strong>
            {emergencyMonths === null
              ? "—"
              : `${emergencyMonths.toFixed(1)} months`}
          </strong>
          <p>Based on other monthly expenses only</p>
        </div>
      </div>

      <div className={`health-status ${statusClass}`}>
        <span>YOUR SNAPSHOT</span>
        <h3>{status}</h3>
        <p>{advice}</p>
      </div>

      <p className="disclaimer">
        Educational estimate based only on the figures entered. This is not a
        credit score, formal financial assessment or financial advice. Savings
        coverage excludes EMIs and other costs unless included in expenses.
      </p>
    </section>
  );
}

function MoneyTracker() {
  const [transactions, setTransactions] = useState([
    { id: 1, title: "Monthly salary", category: "Salary", type: "Income", amount: 45000, date: "2026-10-01" },
    { id: 2, title: "Apartment rent", category: "Housing", type: "Expense", amount: 9000, date: "2026-10-03" },
    { id: 3, title: "Groceries", category: "Food", type: "Expense", amount: 3500, date: "2026-10-06" },
    { id: 4, title: "Freelance project", category: "Other income", type: "Income", amount: 5000, date: "2026-10-10" },
    { id: 5, title: "Transport", category: "Transport", type: "Expense", amount: 1800, date: "2026-10-12" },
    { id: 6, title: "Online course", category: "Education", type: "Expense", amount: 1200, date: "2026-10-15" },
  ]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("Expense");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("2026-10-27");
  const [filter, setFilter] = useState("All");
  const [error, setError] = useState("");

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - expenses;
  const savingsRate = totalIncome > 0 ? (balance / totalIncome) * 100 : 0;

  const categoryTotals = transactions
    .filter((t) => t.type === "Expense")
    .reduce((result, t) => {
      result[t.category] = (result[t.category] || 0) + t.amount;
      return result;
    }, {});

  const categoryColors = [
    "#82995f",
    "#d7ff62",
    "#a9b995",
    "#d5dfc7",
    "#52664a",
    "#c6d3b5",
  ];

  const filteredTransactions = transactions
    .filter((t) => filter === "All" || t.type === filter)
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);

  function addTransaction(event) {
    event.preventDefault();
    const numericAmount = Number(amount);

    if (!title.trim()) {
      setError("Please enter a transaction name.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Please enter an amount greater than zero.");
      return;
    }

    setTransactions((previous) => [
      ...previous,
      {
        id: Date.now(),
        title: title.trim(),
        category,
        type,
        amount: numericAmount,
        date,
      },
    ]);

    setTitle("");
    setAmount("");
    setError("");
  }

  function deleteTransaction(id) {
    setTransactions((previous) =>
      previous.filter((transaction) => transaction.id !== id)
    );
  }

  return (
    <section className="panel feature-panel money-tracker">
      <span className="hero-tag">₹ PERSONAL FINANCE</span>
      <h2>Know where your money goes.</h2>
      <p>
        Track money coming in, understand your spending habits and see how
        much remains. The starting transactions are fictional demo data.
      </p>

      <div className="money-summary">
        <div className="money-summary-card money-income">
          <span>TOTAL INCOME</span>
          <strong>{formatMoney(totalIncome)}</strong>
          <small>Money received</small>
        </div>
        <div className="money-summary-card money-expense">
          <span>TOTAL EXPENSES</span>
          <strong>{formatMoney(expenses)}</strong>
          <small>Money spent</small>
        </div>
        <div className="money-summary-card money-balance">
          <span>REMAINING BALANCE</span>
          <strong>{formatMoney(balance)}</strong>
          <small>Income minus expenses</small>
        </div>
        <div className="money-summary-card">
          <span>SAVINGS RATE</span>
          <strong>
            {totalIncome > 0 ? `${savingsRate.toFixed(1)}%` : "—"}
          </strong>
          <small>Balance as a share of income</small>
        </div>
      </div>

      <div className="money-tracker-grid">
        <form className="money-add-panel" onSubmit={addTransaction}>
          <p className="eyebrow">RECORD A TRANSACTION</p>
          <h3>Add transaction</h3>

          <label htmlFor="transaction-title">Transaction name</label>
          <input
            id="transaction-title"
            type="text"
            placeholder="e.g. Grocery shopping"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
          />

          <label htmlFor="transaction-type">Transaction type</label>
          <select
            id="transaction-type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setCategory(e.target.value === "Income" ? "Salary" : "Food");
            }}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>

          <label htmlFor="transaction-category">Category</label>
          <select
            id="transaction-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {type === "Expense" ? (
              <>
                <option>Food</option>
                <option>Housing</option>
                <option>Transport</option>
                <option>Education</option>
                <option>Shopping</option>
                <option>Health</option>
                <option>Entertainment</option>
                <option>Utilities</option>
                <option>Other</option>
              </>
            ) : (
              <>
                <option>Salary</option>
                <option>Other income</option>
                <option>Freelance</option>
                <option>Investment</option>
                <option>Gift</option>
                <option>Other</option>
              </>
            )}
          </select>

          <label htmlFor="transaction-amount">Amount (₹)</label>
          <input
            id="transaction-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <label htmlFor="transaction-date">Date</label>
          <input
            id="transaction-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {error && <p className="money-error">{error}</p>}

          <button type="submit" className="analyze-button money-submit">
            + Add transaction
          </button>
        </form>

        <div className="money-category-panel">
          <p className="eyebrow">SPENDING BREAKDOWN</p>
          <h3>Where you spend</h3>

          {Object.keys(categoryTotals).length === 0 ? (
            <p className="money-empty">
              Add an expense to see your breakdown.
            </p>
          ) : (
            <>
              <div className="money-category-list">
                {Object.entries(categoryTotals)
                  .sort((a, b) => b[1] - a[1])
                  .map(([name, total], index) => {
                    const percentage =
                      expenses > 0 ? (total / expenses) * 100 : 0;

                    return (
                      <div className="money-category" key={name}>
                        <div className="money-category-heading">
                          <span>
                            <i
                              style={{
                                background:
                                  categoryColors[index % categoryColors.length],
                              }}
                            />
                            {name}
                          </span>
                          <strong>{formatMoney(total)}</strong>
                        </div>
                        <div className="money-category-track">
                          <div
                            style={{
                              width: `${percentage}%`,
                              background:
                                categoryColors[index % categoryColors.length],
                            }}
                          />
                        </div>
                        <small>{percentage.toFixed(1)}% of expenses</small>
                      </div>
                    );
                  })}
              </div>
              <div className="money-category-total">
                <span>Total tracked expenses</span>
                <strong>{formatMoney(expenses)}</strong>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="money-history">
        <div className="money-history-heading">
          <div>
            <p className="eyebrow">YOUR RECORDS</p>
            <h3>Transaction history</h3>
          </div>
          <select
            aria-label="Filter transactions"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All transactions</option>
            <option value="Income">Income only</option>
            <option value="Expense">Expenses only</option>
          </select>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="money-empty">
            No transactions found. Add one using the form above.
          </div>
        ) : (
          <div className="money-table-wrap">
            <table className="money-table">
              <thead>
                <tr>
                  <th>TRANSACTION</th>
                  <th>CATEGORY</th>
                  <th>DATE</th>
                  <th>AMOUNT</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      <div className="money-transaction-name">
                        <span
                          className={`money-transaction-icon ${
                            transaction.type === "Income"
                              ? "transaction-in"
                              : "transaction-out"
                          }`}
                        >
                          {transaction.type === "Income" ? "↙" : "↗"}
                        </span>
                        <div>
                          <strong>{transaction.title}</strong>
                          <small>{transaction.type}</small>
                        </div>
                      </div>
                    </td>
                    <td>{transaction.category}</td>
                    <td>{transaction.date}</td>
                    <td>
                      <strong
                        className={
                          transaction.type === "Income"
                            ? "money-positive"
                            : "money-negative"
                        }
                      >
                        {transaction.type === "Income" ? "+" : "−"}
                        {formatMoney(transaction.amount)}
                      </strong>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="money-delete"
                        aria-label={`Delete ${transaction.title}`}
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="disclaimer">
        Prototype only. Sample transactions are fictional, and changes remain
        in this page's current session. No bank account is connected. This is
        an educational tracker, not financial advice.
      </p>
    </section>
  );
}

function SafetyNet({ money, income }) {
  const [drop, setDrop] = useState(30);
  const [expenses, setExpenses] = useState(25000);
  const [savings, setSavings] = useState(100000);

  const reducedIncome = income * (1 - drop / 100);
  const balance = reducedIncome - expenses;
  const emergencyMonths = expenses > 0 ? savings / expenses : 0;

  return (
    <section className="panel feature-panel">
      <span className="hero-tag">♡ EMERGENCY PLANNER</span>
      <h2>Prepare for an unexpected income drop.</h2>
      <p>
        Explore how a hypothetical income change could affect your monthly
        budget.
      </p>

      <div className="field-group">
        <div className="field-heading">
          <label htmlFor="drop">Income reduction</label>
          <strong>{drop}%</strong>
        </div>
        <input
          id="drop"
          type="range"
          min="0"
          max="100"
          step="5"
          value={drop}
          onChange={(e) => setDrop(Number(e.target.value))}
        />
        <div className="range-labels">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>

      <div className="income-field safety-field">
        <label htmlFor="expenses">Essential monthly expenses (₹)</label>
        <div className="income-input-wrap">
          <span>₹</span>
          <input
            id="expenses"
            type="number"
            min="0"
            value={expenses}
            onChange={(e) =>
              setExpenses(Math.max(0, Number(e.target.value)))
            }
          />
        </div>
      </div>

      <div className="income-field safety-field">
        <label htmlFor="savings">Emergency savings (₹)</label>
        <div className="income-input-wrap">
          <span>₹</span>
          <input
            id="savings"
            type="number"
            min="0"
            value={savings}
            onChange={(e) =>
              setSavings(Math.max(0, Number(e.target.value)))
            }
          />
        </div>
      </div>

      <section className="metrics safety-metrics">
        <div className="metric-card primary-metric">
          <p>REDUCED MONTHLY INCOME</p>
          <h3>{money(reducedIncome)}</h3>
        </div>
        <div className="metric-card">
          <p>MONTHLY BALANCE</p>
          <h3>{money(balance)}</h3>
          <span>{balance >= 0 ? "Remaining after expenses" : "Shortfall to cover"}</span>
        </div>
        <div className="metric-card">
          <p>SAVINGS COVERAGE</p>
          <h3>{emergencyMonths.toFixed(1)} months</h3>
          <span>At entered expense level</span>
        </div>
      </section>

      <p className="disclaimer">
        Illustrative estimate only. Not personalised financial advice.
      </p>
    </section>
  );
}

function Copilot({ money, emi }) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "assistant",
      text: "Hi! I'm the LoanLens demo copilot. Ask me about EMI, interest, loan fees, insurance exclusions or budgeting.",
    },
  ]);

  function answerQuestion(event) {
    event.preventDefault();
    const q = question.trim().toLowerCase();
    if (!q) return;

    let answer;

    if (q.includes("emi") || q.includes("monthly payment")) {
      answer = `Your current calculator estimates an EMI of ${money(
        emi
      )} per month. This is based on the loan amount, interest rate and tenure entered in Loan Advisor.`;
    } else if (q.includes("interest")) {
      answer =
        "Interest is the cost of borrowing money. Compare both the interest rate and the total amount repayable. Also check whether the rate is fixed or floating and whether fees are charged separately.";
    } else if (
      q.includes("fee") ||
      q.includes("charge") ||
      q.includes("penalty")
    ) {
      answer =
        "Review processing fees, late-payment charges, prepayment or foreclosure conditions, and any compulsory add-ons. Ask the lender to clarify charges you do not understand.";
    } else if (
      q.includes("insurance") ||
      q.includes("policy") ||
      q.includes("exclusion")
    ) {
      answer =
        "Read the coverage limits, exclusions, waiting periods, deductibles and claim requirements. Ask the insurer for clarification about anything that could affect your claim.";
    } else if (
      q.includes("budget") ||
      q.includes("save") ||
      q.includes("emergency")
    ) {
      answer =
        "Start with essential monthly expenses, existing EMIs and a realistic savings target. Keep emergency funds accessible and avoid assuming future income is guaranteed.";
    } else if (q.includes("loan") || q.includes("borrow")) {
      answer =
        "Before accepting a loan, compare the total repayment, annual interest rate, fees, tenure and early-repayment conditions. Choose repayments that leave enough for essential expenses.";
    } else {
      answer =
        "I can help with general questions about EMI, interest, loan fees, insurance exclusions and budgeting. Try asking one of those topics. This demo uses predefined responses, not a live AI model.";
    }

    setMessages((previous) => [
      ...previous,
      { from: "user", text: question.trim() },
      { from: "assistant", text: answer },
    ]);
    setQuestion("");
  }

  return (
    <section className="panel feature-panel copilot-panel">
      <span className="hero-tag">✳ FINANCIAL COPILOT</span>
      <h2>Ask money questions.</h2>
      <p>
        Get simple explanations for common financial terms. This is an offline
        demo with predefined answers.
      </p>

      <div className="chat-box" aria-live="polite">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.from}`}
          >
            <span>{message.from === "assistant" ? "LOANLENS" : "YOU"}</span>
            <p>{message.text}</p>
          </div>
        ))}
      </div>

      <form className="chat-form" onSubmit={answerQuestion}>
        <input
          type="text"
          aria-label="Ask a financial question"
          placeholder="e.g. What is an EMI?"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit" className="analyze-button">
          Ask →
        </button>
      </form>

      <div className="suggested-questions">
        <span>TRY ASKING</span>
        {[
          "What is EMI?",
          "What fees should I check?",
          "What are insurance exclusions?",
        ].map((q) => (
          <button key={q} type="button" onClick={() => setQuestion(q)}>
            {q}
          </button>
        ))}
      </div>

      <p className="disclaimer">
        Demo only. Answers are predefined, may not cover your situation and
        are not financial advice. Do not enter personal information.
      </p>
    </section>
  );
}

export default App;
