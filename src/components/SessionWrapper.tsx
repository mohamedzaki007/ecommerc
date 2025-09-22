// src/components/SessionWrapper.tsx

"use client";

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export default function SessionWrapper({ children }: { children: React.ReactNode }) {
    // SessionProvider يتيح استخدام useSession في جميع المكونات الأبناء
    return <SessionProvider>{children}</SessionProvider>;
}