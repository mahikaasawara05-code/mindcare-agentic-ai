function switchView(viewName, buttonEl) {
  document.querySelectorAll('.view').forEach((sec) => sec.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach((btn) => btn.classList.remove('active'));

  const target = document.getElementById(`${viewName}-view`);
  if (target) target.classList.add('active');
  if (buttonEl) buttonEl.classList.add('active');
}

function appendMessage(sender, meta, text) {
  const box = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `msg ${sender}`;
  div.innerHTML = `<div class="msg-meta">${meta}</div>${text}`;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

function generateSupportReply(userText) {
  const lower = userText.toLowerCase();
  if (lower.includes('hopeless') || lower.includes('alone') || lower.includes('crisis') || lower.includes('give up')) {
    return "I hear how heavy things feel right now, and you don't have to carry this alone. With your consent, we can share a support alert with a trusted contact or connect you to a 24/7 helpline (such as Tele-MANAS 14416 or KIRAN 1800-599-0019 in India) or counselor.";
  }
  if (lower.includes('grounding')) {
    return "Let's try a quick 5-4-3-2-1 grounding check: name 5 things you can see around you, 4 you can physically touch, 3 you can hear, 2 you can smell, and 1 slow breath in for 4 seconds and out for 6 seconds.";
  }
  if (lower.includes('self-care')) {
    return "Small daily anchors help steady your mind: drink a glass of water, step away from screens for 10 minutes, note one manageable task for today, and log your mood in the Mood & Distress Journal.";
  }
  return "Thank you for opening up. Taking things one step at a time—like a short breathing pause or jotting down what feels heaviest in your journal—can help ease immediate pressure.";
}

function handleChatSubmit(event) {
  event.preventDefault();
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', 'You', text);
  input.value = '';

  const reply = generateSupportReply(text);
  setTimeout(() => {
    appendMessage('agent', 'MindCare Agent • IBM Granite + RAG', reply);
  }, 250);
}

function sendQuickPrompt(promptText) {
  appendMessage('user', 'You', promptText);
  const reply = generateSupportReply(promptText);
  setTimeout(() => {
    appendMessage('agent', 'MindCare Agent • IBM Granite + RAG', reply);
  }, 250);
}

function analyzeJournal() {
  const txt = document.getElementById('journal-text').value.toLowerCase();
  const signalEl = document.getElementById('signal-val');
  const riskEl = document.getElementById('risk-val');
  const recEl = document.getElementById('rec-val');

  if (txt.includes('hopeless') || txt.includes('alone') || txt.includes('crisis') || txt.includes('give up')) {
    signalEl.textContent = 'Elevated Distress Cues Detected';
    riskEl.textContent = 'High — Proactive Support Recommended';
    recEl.innerHTML =
      '<strong>Support &amp; Escalation Option:</strong> You do not have to go through this alone. With your consent, we can share a support alert with a trusted contact or connect you to a 24/7 helpline and counselor.';
  } else {
    signalEl.textContent = 'Anxiety &amp; Stress Cues Identified';
    riskEl.textContent = 'Moderate — Preventive Coping Suggested';
    recEl.innerHTML =
      "<strong>RAG-Grounded Recommendation:</strong> Ground yourself with 4-4-6 breathing, break tomorrow's tasks into one small first step, and check the 24/7 Crisis Helplines tab whenever you want human support.";
  }
}