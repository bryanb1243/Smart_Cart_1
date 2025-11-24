import { useState } from "react";
import "./App.css";

function App() {
  const [zip, setZip] = useState("");
  const [radius, setRadius] = useState(10);
  const [listText, setListText] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const items = listText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!zip || items.length === 0) {
      alert("Please enter a ZIP code and at least one shopping list item.");
      return;
    }

    // Fake / mock pricing logic for now (no real APIs yet)
    setIsLoading(true);

    const stores = ["Kroger", "Walmart", "Target"];
    const mockData = stores.map((store) => {
      const storeItems = items.map((item) => {
        const price = (Math.random() * 4 + 1).toFixed(2); // $1–$5
        return { name: item, price: Number(price) };
      });

      const total = storeItems.reduce((sum, i) => sum + i.price, 0);

      return {
        store,
        distance: Math.floor(Math.random() * radius) + 1,
        items: storeItems,
        total: Number(total.toFixed(2)),
      };
    });

    // Sort by total price (cheapest first)
    mockData.sort((a, b) => a.total - b.total);

    setTimeout(() => {
      setResults({
        zip,
        radius,
        items,
        stores: mockData,
      });
      setIsLoading(false);
    }, 600); // tiny delay to feel “real”
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a, #020617)",
        color: "#e5e7eb",
        display: "flex",
        justifyContent: "center",
        padding: "32px 16px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          backgroundColor: "rgba(15,23,42,0.9)",
          borderRadius: "24px",
          padding: "24px",
          boxShadow:
            "0 20px 40px rgba(15,23,42,0.7), 0 0 0 1px rgba(148,163,184,0.2)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1.2fr)",
          gap: "24px",
        }}
      >
        {/* Left side – form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Logo / header */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "999px",
                background:
                  "radial-gradient(circle at 30% 30%, #22c55e, #16a34a, #15803d)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 800,
                color: "#ecfdf5",
              }}
            >
              S
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: "24px",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                SmartCart
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "13px",
                  color: "#9ca3af",
                }}
              >
                Build the cheapest cart across nearby stores in seconds.
              </p>
            </div>
          </div>

          <hr
            style={{
              borderColor: "rgba(51,65,85,0.8)",
              margin: "4px 0 8px 0",
            }}
          />

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* ZIP + Radius */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    marginBottom: "4px",
                    color: "#e5e7eb",
                  }}
                >
                  ZIP code
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="75050"
                  maxLength={10}
                  style={{
                    width: "100%",
                    padding: "8px 10px",
                    borderRadius: "10px",
                    border: "1px solid #334155",
                    backgroundColor: "#020617",
                    color: "#e5e7eb",
                    fontSize: "14px",
                    outline: "none",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    marginBottom: "4px",
                    color: "#e5e7eb",
                  }}
                >
                  Driving radius (miles)
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={radius}
                    onChange={(e) => setRadius(Number(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span
                    style={{
                      fontSize: "13px",
                      minWidth: "32px",
                      textAlign: "right",
                      color: "#cbd5f5",
                    }}
                  >
                    {radius} mi
                  </span>
                </div>
              </div>
            </div>

            {/* Shopping list */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "13px",
                  marginBottom: "4px",
                  color: "#e5e7eb",
                }}
              >
                Shopping list
              </label>
              <textarea
                value={listText}
                onChange={(e) => setListText(e.target.value)}
                placeholder={"Example:\n- 2% milk\n- Eggs\n- Boneless chicken\n- Rice\n- Paper towels"}
                rows={8}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "12px",
                  border: "1px solid #334155",
                  backgroundColor: "#020617",
                  color: "#e5e7eb",
                  fontSize: "14px",
                  resize: "vertical",
                  outline: "none",
                  lineHeight: 1.4,
                }}
              />
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "12px",
                  color: "#9ca3af",
                }}
              >
                Tip: one item per line works best for now.
              </p>
            </div>

            {/* Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #22c55e, #16a34a, #15803d)",
                  color: "#ecfdf5",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: isLoading ? "wait" : "pointer",
                  boxShadow: "0 10px 25px rgba(34,197,94,0.45)",
                }}
              >
                {isLoading ? "Crunching prices..." : "Find cheapest cart"}
              </button>
              <span
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                }}
              >
                Mock data only for now — no real stores yet.
              </span>
            </div>
          </form>
        </div>

        {/* Right side – results */}
        <div
          style={{
            background:
              "radial-gradient(circle at top left, rgba(34,197,94,0.2), transparent 50%), #020617",
            borderRadius: "18px",
            padding: "18px",
            border: "1px solid rgba(51,65,85,0.8)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Cart comparison
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              color: "#9ca3af",
            }}
          >
            We’ll compare estimated baskets across nearby stores based on your
            list. This is a prototype view.
          </p>

          {!results && !isLoading && (
            <div
              style={{
                marginTop: "8px",
                padding: "12px",
                borderRadius: "12px",
                border: "1px dashed rgba(75,85,99,0.9)",
                fontSize: "13px",
                color: "#9ca3af",
                background:
                  "linear-gradient(145deg, rgba(15,23,42,0.8), rgba(15,23,42,0.5))",
              }}
            >
              <strong style={{ color: "#e5e7eb" }}>How it works:</strong>
              <ul style={{ paddingLeft: "18px", margin: "6px 0 0" }}>
                <li>Enter your ZIP and driving radius.</li>
                <li>Paste your shopping list (one item per line).</li>
                <li>
                  SmartCart (prototype) builds a rough price estimate for each
                  store.
                </li>
              </ul>
            </div>
          )}

          {isLoading && (
            <div
              style={{
                marginTop: "12px",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid rgba(148,163,184,0.5)",
                fontSize: "13px",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(15,23,42,0.7))",
              }}
            >
              Crunching sample prices for your list… 🧮
            </div>
          )}

          {results && !isLoading && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "4px",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span>
                  ZIP: <strong>{results.zip}</strong> · Radius:{" "}
                  <strong>{results.radius} mi</strong>
                </span>
                <span>
                  Items: <strong>{results.items.length}</strong>
                </span>
              </div>

              {results.stores.map((store, idx) => {
                const isBest = idx === 0;
                return (
                  <div
                    key={store.store}
                    style={{
                      borderRadius: "14px",
                      padding: "12px",
                      border: isBest
                        ? "1px solid rgba(34,197,94,0.9)"
                        : "1px solid rgba(55,65,81,0.9)",
                      backgroundColor: isBest
                        ? "rgba(22,163,74,0.08)"
                        : "rgba(15,23,42,0.85)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "6px",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "15px",
                            fontWeight: 600,
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          {store.store}
                          {isBest && (
                            <span
                              style={{
                                fontSize: "11px",
                                padding: "2px 8px",
                                borderRadius: "999px",
                                backgroundColor: "#22c55e",
                                color: "#022c22",
                                fontWeight: 700,
                                textTransform: "uppercase",
                              }}
                            >
                              Best value
                            </span>
                          )}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#9ca3af",
                          }}
                        >
                          ~{store.distance} mi away · Prototype pricing only
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          fontSize: "14px",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: "18px",
                            color: isBest ? "#bbf7d0" : "#e5e7eb",
                          }}
                        >
                          ${store.total.toFixed(2)}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            color: "#9ca3af",
                          }}
                        >
                          est. total
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 0.7fr)",
                        gap: "8px",
                        fontSize: "12px",
                      }}
                    >
                      <div
                        style={{
                          maxHeight: "96px",
                          overflowY: "auto",
                          paddingRight: "4px",
                        }}
                      >
                        {store.items.map((item) => (
                          <div
                            key={item.name}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "6px",
                              padding: "2px 0",
                              borderBottom:
                                "1px solid rgba(31,41,55,0.9)",
                            }}
                          >
                            <span
                              style={{
                                color: "#e5e7eb",
                              }}
                            >
                              {item.name}
                            </span>
                            <span
                              style={{
                                color: "#9ca3af",
                              }}
                            >
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          color: "#9ca3af",
                          alignSelf: "flex-start",
                          backgroundColor: "rgba(15,23,42,0.9)",
                          borderRadius: "10px",
                          padding: "8px",
                          border: "1px solid rgba(55,65,81,0.9)",
                        }}
                      >
                        <strong style={{ color: "#e5e7eb" }}>
                          Prototype only
                        </strong>
                        <p style={{ margin: "4px 0 0" }}>
                          In a real version, these prices would come directly
                          from partner store APIs in your area.
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
