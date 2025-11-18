class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [conversionMode, setConversionMode] = React.useState('g2s');
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [shamsiDate, setShamsiDate] = React.useState(gregorianToShamsi(selectedDate));

    // For Shamsi input when mode is s2g
    const [shamsiInput, setShamsiInput] = React.useState(() => {
      const s = gregorianToShamsi(new Date());
      return { year: s.year, month: s.month, day: s.day, monthName: s.monthName };
    });

    const [resultGregorian, setResultGregorian] = React.useState(selectedDate);

    // Update conversions when inputs change
    React.useEffect(() => {
      if (conversionMode === 'g2s') {
        const s = gregorianToShamsi(selectedDate);
        setShamsiDate(s);
        setResultGregorian(selectedDate);
      } else {
        // s2g
        const g = shamsiToGregorian(shamsiInput.year, shamsiInput.month, shamsiInput.day);
        setResultGregorian(g);
        // also ensure shamsiDate reflects the input for display
        setShamsiDate({ year: parseInt(shamsiInput.year, 10), month: parseInt(shamsiInput.month, 10), day: parseInt(shamsiInput.day, 10), monthName: getShamsiMonthName(parseInt(shamsiInput.month, 10)) });
      }
    }, [conversionMode, selectedDate, shamsiInput]);

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js">
        <Header />
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="card">
            <DateInput
              conversionMode={conversionMode}
              onModeChange={setConversionMode}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              shamsiInput={shamsiInput}
              onShamsiChange={(v) => setShamsiInput(prev => ({ ...prev, ...v }))}
            />
            {shamsiDate && <ResultDisplay mode={conversionMode} shamsiDate={shamsiDate} gregorianDate={resultGregorian} />}
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);