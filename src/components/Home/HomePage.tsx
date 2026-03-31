'use client'
import React from 'react'
import { Hero } from './components/Hero/Hero'
import { Features } from './components/Features/Features'
import { Category } from './components/Category/Category'
import { GridProduct } from './components/GridProduct/GridProduct'

export default function HomePage() {
    return (
        <>
            <Hero />
            <Features />
            <Category />
            <GridProduct />
        </>
    )
}
