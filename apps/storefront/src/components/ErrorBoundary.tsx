'use client';

import { Component, ReactNode } from 'react';
import { Button } from '@astryxdesign/core/Button';
import { Text } from '@astryxdesign/core/Text';
import { Section } from '@astryxdesign/core/Section';
import { Center } from '@astryxdesign/core/Center';
import { Stack } from '@astryxdesign/core/Stack';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <Section style={{ padding: '4rem 0' }}>
          <Center>
            <Stack gap={4} style={{ textAlign: 'center' }}>
              <Text type="body" weight="medium" style={{ fontSize: '1.5rem' }}>Something went wrong</Text>
              <Text type="body" color="secondary">We apologize for the inconvenience. Please try again.</Text>
              <Button label="TRY AGAIN" onClick={() => this.setState({ hasError: false })} />
            </Stack>
          </Center>
        </Section>
      );
    }
    return this.props.children;
  }
}
