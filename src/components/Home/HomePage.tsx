'use client'
import React from 'react'
import { CartSheet } from './components/CartSheet/CartSheet'
import { Hero } from './components/Hero/Hero'
import { Features } from './components/Features/Features'
import { Category } from './components/Category/Category'
import { GridProduct } from './components/GridProduct/GridProduct'

export default function HomePage() {
    return (
        <>
            <CartSheet />
            <Hero />
            <Features />
            <Category />
            {/* <GridProduct /> */}

        </>
    )
}
