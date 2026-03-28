'use client'
import React from 'react'
import { CartSheet } from './components/CartSheet/CartSheet'
import { Hero } from './components/Hero/Hero'
import { Features } from './components/Features/Features'

export default function HomePage() {
    return (
        <>
            <CartSheet />
            <Hero />
            <Features />

        </>
    )
}
