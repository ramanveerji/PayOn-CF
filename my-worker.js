addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

function paymentHTML(qrImageUrl, upiId, upiLink, amount) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #440a67, #330867, #200441);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      .container {
        max-width: 450px;
        padding: 30px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 16px;
        box-shadow: 0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.8), inset 0 0 20px rgba(255, 0, 255, 0.5);
      }

      h1 {
        text-align: center;
        margin-bottom: 30px;
      }

      #qrCode {
        text-align: center;
        margin-top: 30px;
        border: 2px solid #6b146d;
        padding: 10px;
        border-radius: 8px;
        background-color: #330867;
      }

      #qrCode img {
        max-width: 100%;
        height: auto;
      }

      #payButton {
        text-align: center;
        margin-top: 30px;
      }

      #payButton a {
        color: #fff;
        text-decoration: none;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        background: linear-gradient(135deg, #ae5aea, #6b146d);
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3);
        display: inline-block;
        font-weight: 600;
      }

      #payButton a:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6), 0 14px 32px rgba(0, 0, 0, 0.4);
      }

      .upiId {
        text-align: center;
        margin-top: 20px;
        font-size: 18px;
        font-weight: 600;
        border: 2px solid #6b146d;
        padding: 10px;
        border-radius: 8px;
      }
      
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Pay On</h1>
      <div class="upiId">UPI ID: ${upiId}</div>
      <div class="upiId">Pay Amt: ${amount}</div>
      <div id="qrCode">
        <img src="${qrImageUrl}" alt="QR Code" draggable="false">
      </div>
      <div id="payButton">
        <a href="${upiLink}" id="payLink">Click Here to Pay</a>
      </div>
    </div>
    <script>
      history.replaceState({}, document.title, location.pathname);
    </script>
  </body>
  </html>
  `;
}

function landingHTML() {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate Payment URL</title>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        margin: 0;
        padding: 0;
        background: linear-gradient(135deg, #440a67, #330867, #200441);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }
  
      .container {
        max-width: 450px;
        padding: 30px;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 16px;
        box-shadow: 0 0 30px rgba(255, 0, 255, 0.8), 0 0 60px rgba(255, 0, 255, 0.8), inset 0 0 20px rgba(255, 0, 255, 0.5);
      }
  
      h1 {
        text-align: center;
        margin-bottom: 30px;
      }
  
      label {
        display: block;
        margin-top: 10px;
      }
  
      input {
        width: calc(100% - 22px);
        padding: 10px;
        margin-top: 5px;
        border-radius: 8px;
        border: 2px solid #6b146d;
        background-color: #330867;
        color: #fff;
      }
  
      #generateButton {
        text-align: center;
        margin-top: 30px;
      }
  
      #generateButton button {
        color: #fff;
        text-decoration: none;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        background: linear-gradient(135deg, #ae5aea, #6b146d);
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3);
        display: inline-block;
        font-weight: 600;
      }
  
      #generateButton button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6), 0 14px 32px rgba(0, 0, 0, 0.4);
      }
  
      #generatedURLContainer {
        margin-top: 20px;
        padding: 10px;
        border: 2px solid #6b146d;
        border-radius: 8px;
        background-color: #330867;
        display: none;
        position: relative;
        word-wrap: break-word;
      }
  
      #generatedURL {
        text-align: center;
        margin: 0;
      }
  
      #copyButtonContainer {
        text-align: center;
        margin-top: 20px;
      }
  
      #copyButton {
        color: #fff;
        text-decoration: none;
        border: none;
        padding: 15px 30px;
        border-radius: 8px;
        background: linear-gradient(135deg, #ae5aea, #6b146d);
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4), 0 8px 24px rgba(0, 0, 0, 0.3);
        display: inline-block;
        font-weight: 600;
        cursor: pointer;
      }
  
      #copyButton:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(0, 0, 0, 0.6), 0 14px 32px rgba(0, 0, 0, 0.4);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Generate Payment URL</h1>
      <form id="generateForm">
        <label for="upiId">UPI ID:</label>
        <input type="text" id="upiId" name="upiId" required>
        <label for="name">Name (optional):</label>
        <input type="text" id="name" name="name" placeholder="Optional">
        <label for="currency">Currency:</label>
        <input type="text" id="currency" name="currency" value="INR" required>
        <label for="amount">Amount:</label>
        <input type="number" id="amount" name="amount" required>
        <div id="generateButton">
          <button type="button" onclick="generateURL()">Generate URL</button>
        </div>
      </form>
      <div id="generatedURLContainer">
        <p id="generatedURL"></p>
        <div id="copyButtonContainer">
          <button id="copyButton" onclick="copyURL()">Copy URL</button>
        </div>
      </div>
    </div>
    <script>
      function generateURL() {
        const upiId = document.getElementById('upiId').value;
        const name = document.getElementById('name').value;
        const currency = document.getElementById('currency').value;
        const amount = document.getElementById('amount').value;
        const url = new URL(window.location.href);
        url.pathname = '/pay';
        url.searchParams.set('pa', upiId);
        url.searchParams.set('pn', name);
        url.searchParams.set('cu', currency);
        url.searchParams.set('am', amount);
        const generatedURL = url.toString();
        document.getElementById('generatedURL').textContent = generatedURL;
        document.getElementById('generatedURLContainer').style.display = 'block';
      }
  
      function copyURL() {
        const generatedURL = document.getElementById('generatedURL').textContent;
        navigator.clipboard.writeText(generatedURL).then(() => {
          alert('URL copied to clipboard!');
        }).catch(err => {
          console.error('Failed to copy: ', err);
        });
      }
    </script>
  </body>
  </html>
  `;
}

async function generateQR(request) {
  const params = new URL(request.url).searchParams;
  const upiId = params.get('pa');
  const name = params.get('pn');
  const amount = params.get('am');
  const currency = params.get('cu');

  const upiLink = `upi://pay?pa=${upiId}&pn=${name}&am=${amount}&cu=${currency}`;
  const qrDataUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(upiLink)}&size=200x200`;

  return { qrImageUrl: qrDataUrl, upiId: upiId, upiLink: upiLink, amount: `${currency} ${amount}`};
}

async function handleRequest(request) {
  const url = new URL(request.url);

  if (url.pathname === '/') {
    const landingPageHTML = landingHTML();
    return new Response(landingPageHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  }
  else if (url.pathname === '/pay') {
    const { qrImageUrl, upiId, upiLink, amount } = await generateQR(request);
    const paymentPageHTML = paymentHTML(qrImageUrl, upiId, upiLink, amount);
    return new Response(paymentPageHTML, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } else {
    return new Response('404 Not Found', { status: 404 });
  }
}
