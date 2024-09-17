exports.handler = function(context, event, callback) {
    // REQUIRED - you must set this
    let phoneNumber = event.PhoneNumber || process.env.FORWARD_TO_NUMBER;
    // OPTIONAL
    let callerId =  event.CallerId || null;
    // OPTIONAL
    let timeout = event.Timeout || null;
    // OPTIONAL
    let allowedCallers = event.allowedCallers || [];

    // Check if the incoming request is a voice call or SMS
    if (event.hasOwnProperty('Body')) {
        // SMS handling
        handleSMS(event, phoneNumber, allowedCallers, callback);
    } else {
    // Voice call handling
        handleVoiceCall(event, phoneNumber, callerId, timeout, allowedCallers, callback);
    }
};

function handleSMS(event, phoneNumber, allowedCallers, callback) {
    let messagingResponse = new Twilio.twiml.MessagingResponse();

    if (isAllowedCaller(event.From, allowedCallers)) {
        // Check if this is a forwarded message response
        if (event.Body.startsWith('➡️')) {
            // Extract the original sender's number and the message content
            const [originalSender, ...messageParts] = event.Body.slice(2).split(':');
            const messageContent = messageParts.join(':').trim();

            // Forward the response back to the original sender
            messagingResponse.message({ to: originalSender }, messageContent);
        } else {
            // Tag the message with the original sender's number
            const taggedMessage = `➡️${event.From}:${event.Body}`;
            messagingResponse.message({ to: phoneNumber }, taggedMessage);
        }
    } else {
        messagingResponse.message('Sorry, you are sending from a restricted number. Message not forwarded.');
    }

    callback(null, messagingResponse);
}

function handleVoiceCall(event, phoneNumber, callerId, timeout, allowedCallers, callback) {
    let twiml = new Twilio.twiml.VoiceResponse();

    if (isAllowedCaller(event.From, allowedCallers)) {
        let dialParams = {};
        if (callerId) {
            dialParams.callerId = callerId;
        }
        if (timeout) {
            dialParams.timeout = timeout;
        }
        twiml.dial(dialParams, phoneNumber);
    } else {
        twiml.say('Sorry, you are calling from a restricted number. Good bye.');
    }

    callback(null, twiml);
}

function isAllowedCaller(from, allowedCallers) {
    return allowedCallers.length === 0 || allowedCallers.includes(from);
}
