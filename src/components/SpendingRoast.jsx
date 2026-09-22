import '../styles/components/spending-roast.css';

export default function SpendingRoast() {
  return (
    <div className="spending-roast">
      <div className="spending-roast__head">
        <span className="spending-roast__badge mono-label">BUDGETING AI</span>
        <span className="spending-roast__version mono-label">SPENDING ASSISTANT</span>
      </div>

      <div className="spending-roast__chat">
        <div className="spending-roast__message spending-roast__message--user">
          <span className="spending-roast__sender mono-label">YOU</span>
          <p className="spending-roast__bubble">How much did I spend eating out this month?</p>
        </div>

        <div className="spending-roast__message spending-roast__message--app">
          <span className="spending-roast__sender mono-label">APP</span>
          <p className="spending-roast__bubble">
            <span className="mono-data">$512.40</span> — and your stove has officially filed a
            missing-person report.
          </p>
          <p className="spending-roast__breakdown mono-data">
            Groceries $310.15 · Subscriptions $86.00 · Transportation $64.20
          </p>
        </div>
      </div>
    </div>
  );
}
