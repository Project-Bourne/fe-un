# MiroTalk P2P Integration

This document explains how to use and configure the MiroTalk P2P video conferencing integration in the application.

## Overview

MiroTalk P2P is an open-source WebRTC video conferencing solution that provides peer-to-peer communication. It has been integrated as a replacement for Jitsi Meet to provide reliable video conferencing capabilities.

## Features

- P2P WebRTC video and audio calls
- No server-side recording or storage of calls
- Simple UI with minimal configuration
- Works with HTTP protocol
- Direct peer-to-peer connections for better privacy

## Configuration

The MiroTalk integration uses environment variables for configuration. Add the following to your `.env.local` file:

```env
# MiroTalk P2P Configuration
NEXT_PUBLIC_MIROTALK_URL=http://192.168.17.200:8856
NEXT_PUBLIC_MIROTALK_API_URL=http://192.168.17.200:8856/api/v1
NEXT_PUBLIC_MIROTALK_API_KEY=mirotalkp2p_default_secret
```

### Important Notes on Environment Variables

- `NEXT_PUBLIC_MIROTALK_URL` - The base URL for the MiroTalk P2P service
  - Do not include a trailing slash (e.g., use `http://192.168.17.200:8856` instead of `http://192.168.17.200:8856/`)
- `NEXT_PUBLIC_MIROTALK_API_URL` - The API URL for MiroTalk P2P
  - Should include `/api/v1` path
- `NEXT_PUBLIC_MIROTALK_API_KEY` - The API key for authentication (keep this secret in production)

## How It Works

1. The application generates a unique room ID using UUID
2. The room ID is used to create a meeting URL
3. When a user starts or joins a meeting, they're connected to the MiroTalk service via an iframe
4. All communication is direct P2P between participants, with WebRTC handling the media streams

## Components

The integration consists of three main files:

1. `src/utils/mirotalk.ts` - Utility functions for interacting with the MiroTalk API
2. `src/pages/calls/components/MiroTalkVideo.tsx` - The main component that renders the MiroTalk interface
3. `src/components/ui/CallModal.tsx` - The modal for creating and sharing meeting links

## Usage

To start a video conference:

1. Click the "Call" button in the document view
2. The call modal will appear with a generated meeting link
3. Copy the link to share with others or click "Start Meeting" to join immediately
4. Other participants can join by navigating to the shared link

## Troubleshooting

If you encounter issues with the MiroTalk integration:

### URL Issues

If you see double slashes in the URL (e.g., `http://192.168.17.200:8856//join/...`):

- Check your `.env` file and make sure `NEXT_PUBLIC_MIROTALK_URL` does not have a trailing slash
- The system has automatic URL cleaning to prevent this, but it's best to set it correctly

### Connection Issues

- Check that your browser allows camera and microphone access
- Ensure you're using HTTP URLs as specified in the configuration
- Check browser console for any error messages
- Verify that the MiroTalk service is accessible from your network
- Make sure the MiroTalk server is running on the specified IP and port

### CORS Issues

If you're experiencing cross-origin issues:

- Make sure the MiroTalk server has CORS configured to allow your application domain
- Check the browser console for specific CORS error messages

## Deployment Considerations

When deploying to production:

1. Consider using a self-hosted MiroTalk instance for better control and privacy
2. Update the API key to a secure value
3. If using HTTPS for your application, you'll need to use HTTPS for MiroTalk as well
4. Ensure consistent URL formatting across all environment configurations

## References

- [MiroTalk P2P GitHub Repository](https://github.com/miroslavpejic85/mirotalk)
- [MiroTalk P2P API Documentation](https://github.com/miroslavpejic85/mirotalk/blob/master/app/api/README.md)
