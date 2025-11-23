"use client"
import React from 'react'
import { useCurrency } from '../context/CurrencyContext'
import { formatCurrency } from '../lib/currency'

type PriceProps = {
  /** Base amount in USD */
  amountUSD: number
  className?: string
}

export default function Price({ amountUSD, className }: PriceProps){
  const { currency } = useCurrency()
  return (
    <span className={className} data-amount-usd={amountUSD}>
      {formatCurrency(amountUSD, currency)}
    </span>
  )
}
