# Call and SMS Forwarding Function

This Twilio Function provides a template for forwarding both voice calls and SMS messages to another phone number. It includes features like caller restrictions and customizable call forwarding parameters.

## Features

- Forward incoming voice calls to a specified number
- Forward incoming SMS messages to a specified number
- Restrict forwarding to a list of allowed callers
- Customizable caller ID for voice calls
- Adjustable timeout for voice calls

## Setup

1. Deploy this function to your Twilio account.
2. Set the `FORWARD_TO_NUMBER` environment variable with the phone number you want to forward to.
3. Configure your Twilio phone number to use this function for both voice and messaging webhooks.

## Usage

### Voice Calls

When a voice call is received, the function will:
- Check if the caller is allowed (if restrictions are set)
- Forward the call to the specified number
- Use custom caller ID and timeout if provided

### SMS Messages

When an SMS is received, the function will:
- Check if the sender is allowed (if restrictions are set)
- Forward the message content to the specified number

## Configuration

You can customize the function's behavior by passing the following parameters:

- `PhoneNumber`: The number to forward to (overrides environment variable)
- `CallerId`: Custom caller ID for voice calls
- `Timeout`: Custom timeout for voice calls
- `allowedCallers`: Array of phone numbers allowed to be forwarded

## Development

To modify this function:

1. Clone the repository
2. Make your changes in `index.js`
3. Test thoroughly
4. Deploy to Twilio

## License

[MIT License](LICENSE)
