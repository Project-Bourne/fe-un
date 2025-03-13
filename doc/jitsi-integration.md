# Jitsi Meet Integration

This document explains how to use and configure the Jitsi Meet video conferencing integration in the application.

## Overview

Jitsi Meet is a fully encrypted, open-source video conferencing solution that provides high-quality video and audio conferencing capabilities. It has been integrated into the application to enable real-time collaboration between users.

## Features

- High-quality video and audio conferencing
- Screen sharing capabilities
- Integration with the application's user system
- Custom branding and UI configuration
- Direct room creation and joining

## Configuration

The Jitsi integration uses environment variables for configuration. Add the following to your `.env.local` file:

```env
# Jitsi Configuration
NEXT_PUBLIC_JITSI_URL=192.168.17.200
NEXT_PUBLIC_JITSI_PORT=8443
```

### Important Notes on Environment Variables

- `NEXT_PUBLIC_JITSI_URL` - The IP address or domain name of your Jitsi server
- `NEXT_PUBLIC_JITSI_PORT` - The port on which Jitsi is running (typically 8443)

## How It Works

1. The application generates a unique room ID using UUID
2. When a user starts a meeting, a Jitsi Meet instance is initialized with this room ID
3. The JitsiMeetExternalAPI loads the Jitsi interface within an iframe
4. User information from the application is passed to Jitsi for display names

## Components

The integration consists of three main files:

1. `src/utils/jitsi.ts` - Utility functions for loading the Jitsi script
2. `src/pages/calls/components/video.tsx` - The component that renders the Jitsi interface
3. `src/components/ui/CallModal.tsx` - The modal for creating and sharing meeting links

## Usage

To start a video conference:

1. Click the "Call" button in the document view
2. The call modal will appear with a generated meeting link
3. Copy the link to share with others or click "Start Meeting" to join immediately
4. Other participants can join by navigating to the shared link

## Troubleshooting

If you encounter issues with the Jitsi integration:

### Script Loading Issues

If you see errors like "JitsiMeetExternalAPI is not a constructor":

- Check your browser console for network errors loading the external_api.js script
- Ensure your Jitsi server is accessible at the configured URL and port
- Verify that the Jitsi server is properly serving the external API file

### Connection Issues

- Check that your browser allows camera and microphone access
- Ensure your firewall allows connections to the Jitsi server
- Check browser console for any error messages
- Verify that the Jitsi service is accessible from your network

### Video Quality Issues

- Ensure you have sufficient bandwidth
- Try reducing the resolution in Jitsi settings
- Close other applications using your camera or microphone

## Deployment Considerations

When deploying to production:

1. Consider setting up a dedicated Jitsi Meet server for better performance
2. Configure HTTPS for secure communication
3. Set up proper DNS entries for your Jitsi server
4. Consider implementing authentication for your Jitsi server

## References

- [Jitsi Meet GitHub Repository](https://github.com/jitsi/jitsi-meet)
- [Jitsi Meet External API Documentation](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe)
- [Self-Hosting Guide](https://jitsi.github.io/handbook/docs/devops-guide/devops-guide-start)
