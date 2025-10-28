import React from 'react';
import { Container } from './Container';

export default function Footer() {
  return (
    <footer className="bg-white/0 text-[#0f1724] py-8 mt-auto">
      <Container>
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">Triket</p>
          <p className="text-sm text-muted">
            © 2025 Triket. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}