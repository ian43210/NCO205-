import { useState, useEffect, useRef } from 'react'

function FAQ() {
  const [chatOpen, setChatOpen] = useState(false)
  const defaultSuggestions = [
  'How do I book a seat?',
  'What if the shuttle is full?',
  'How do I cancel my booking?',
  'When should I arrive?',
]

const [messages, setMessages] = useState([
  {
    sender: 'bot',
    text: "Hi! I'm the Shuttle Support Assistant. Ask me about booking, boarding, cancellations or shuttle rules.",
    suggestions: defaultSuggestions,
  },
])
  const [input, setInput] = useState('')
  const chatEndRef = useRef(null)

useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}, [messages])

  function getBotReply(question) {
    const lower = question.toLowerCase()

    if (lower.includes('book')) {
      return 'To book a shuttle seat, go to Routes, choose your boarding station and trip timing, then continue to booking and select one available seat.'
    }

    if (lower.includes('full')) {
      return 'If the shuttle is full, the system can suggest another available pickup route for the same trip timing. If needed, you can also use the Google Maps fallback route.'
    }

    if (lower.includes('cancel')) {
      return 'You can cancel your booking from the Trips page. Cancelling early helps free up the seat for another student.'
    }

    if (lower.includes('board') || lower.includes('qr')) {
      return 'Before boarding, open your Trip Details and QR page and show the QR or booking details for verification.'
    }

    if (
      lower.includes('late') ||
      lower.includes('arrive') ||
      lower.includes('departure')
    ) {
      return 'Students should arrive at least 5 minutes before the bus departure time. Late arrivals may miss the shuttle.'
    }

    if (lower.includes('seat')) {
      return 'Each student can only book one seat and seats shown as booked cannot be selected.'
    }

    if (
      lower.includes('clean') ||
      lower.includes('property') ||
      lower.includes('damage')
    ) {
      return 'Students should keep the shuttle clean, dispose of rubbish responsibly and avoid damaging seats, fittings, curtains, tables, charging areas or any other bus property.'
    }

    return 'Sorry, I am not sure about that yet. Please check the FAQ below or contact support for more help.'
  }

  function handleUserMessage(question) {
  const reply = getBotReply(question)

  setMessages((previousMessages) => [
    ...previousMessages,
    { sender: 'user', text: question },
    { sender: 'bot', text: reply, suggestions: defaultSuggestions },
  ])
}

  function handleSend() {
    if (!input.trim()) return
    handleUserMessage(input)
    setInput('')
  }

  return (
    <div className="page-screen support-page">
      <div className="page-hero">
        <div className="page-badge">Support and help</div>
        <h2>Frequently Asked Questions</h2>
        <p>
          Find help about shuttle trip timings, booking rules, QR boarding and
          fair-use policies.
        </p>
      </div>

      <section className="faq-card">
        <h3 className="faq-question">How do I book a shuttle seat?</h3>
        <p className="faq-answer">
          Go to the Routes page, choose your boarding station, select your trip
          timing, then continue to booking. You will need to read the booking
          terms and choose one available seat before confirming.
        </p>
      </section>

      <section className="faq-card">
        <h3 className="faq-question">Can I book more than one shuttle seat?</h3>
        <p className="faq-answer">
          No. Each login can only hold one active booking at a time so more
          students can have a fair chance to reserve a seat.
        </p>
      </section>

      <section className="faq-card">
        <h3 className="faq-question">What happens if the shuttle is full?</h3>
        <p className="faq-answer">
          If the selected shuttle trip is full, the system can suggest other
          available pickup routes for the same SUSS class start time. If no
          shuttle seats are available, a Google Maps alternative route is
          provided.
        </p>
      </section>

      <section className="faq-card">
        <h3 className="faq-question">What time should I arrive for boarding?</h3>
        <p className="faq-answer">
          Students should arrive at least 5 minutes before the bus departure
          time. The shuttle may leave on time and late arrivals may miss the
          trip.
        </p>
      </section>

      <section className="faq-card">
        <h3 className="faq-question">What do I need to show when boarding?</h3>
        <p className="faq-answer">
          Students may need to show their booking QR page or student pass during
          boarding verification. Please open the Trip Details and QR page before
          the bus arrives.
        </p>
      </section>

      <section className="faq-card">
        <h3 className="faq-question">What if I no longer need my booking?</h3>
        <p className="faq-answer">
          Please cancel your booking in the app as early as possible. This frees
          up the seat for another student and supports fair access to the
          shuttle service.
        </p>
      </section>

      <section className="faq-card">
        <h3 className="faq-question">What if I miss the shuttle?</h3>
        <p className="faq-answer">
          If you miss the booked shuttle, you may need to use an alternative
          route. Repeated no-shows may lead to booking restrictions in a real
          implementation.
        </p>
      </section>

      <section className="faq-card">
        <h3 className="faq-question">
          Are there rules about cleanliness and bus property?
        </h3>
        <p className="faq-answer">
          Yes. Students should keep the shuttle clean, dispose of rubbish
          responsibly and avoid damaging seats, fittings, curtains, tables,
          charging areas or any other bus property.
        </p>
      </section>

      <section className="faq-card">
        <h3 className="faq-question">What amenities are available on board?</h3>
        <p className="faq-answer">
          Depending on the shuttle design, students may enjoy comfortable
          seating, air-conditioning, Wi-Fi support, storage space and selected
          travel amenities highlighted on the Home page.
        </p>
      </section>

      <section className="faq-support-box">
        <p className="faq-support-title">Still need help?</p>
        <p className="faq-support-text">
          Use the support assistant button to ask common shuttle questions.
        </p>
      </section>

      <div className="support-widget">
        <div className="support-widget-inner">
          {chatOpen && (
            <div className="chat-panel">
              <div className="chat-modal-header">
                <div>
                  <p className="chat-modal-label">Support</p>
                  <h3 className="chat-modal-title">Shuttle Support Assistant</h3>
                </div>

                <button
                  className="chat-close-button"
                  onClick={() => setChatOpen(false)}
                >
                  Close
                </button>
              </div>

              <div className="chat-window">
  {messages.map((message, index) => (
    <div key={index} className="chat-message-block">
      <div
  ref={
    message.sender === 'bot' && index === messages.length - 1
      ? chatEndRef
      : null
  }
  className={
    message.sender === 'bot'
      ? 'chat-bubble bot'
      : 'chat-bubble user'
  }
>
  {message.text}
</div>

      {message.sender === 'bot' &&
        message.suggestions &&
        message.suggestions.length > 0 && (
          <div className="chat-inline-suggestions">
            {message.suggestions.map((question) => (
              <button
                key={question}
                onClick={() => handleUserMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
        )}
    </div>
  ))}
  <div ref={chatEndRef}></div>
</div>

              

              <div className="chat-input-row">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <button onClick={handleSend}>Send</button>
              </div>
            </div>
          )}

          {!chatOpen && (
            <button
              className="support-fab"
              onClick={() => setChatOpen(true)}
              aria-label="Open Shuttle Support Assistant"
            >
              Chat
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FAQ