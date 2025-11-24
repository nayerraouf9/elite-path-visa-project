import React from 'react'
import { render, act, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { CartProvider, useCart, CartItem } from '../CartContext'

function TestConsumer() {
  const { cartItems, addToCart, removeFromCart, lastRemovedStack, undoRemove } = useCart()
  return (
    <div>
      <div data-testid="count">{cartItems.length}</div>
      <div data-testid="undo-count">{lastRemovedStack.length}</div>
      <button onClick={() => addToCart({ visaType: 'Test', travelDate: '2025-12-01', processingType: 'Standard', count: 1, totalPrice: 100 })}>add</button>
      <button onClick={() => { const id = cartItems[0]?.id; if (id) removeFromCart(id) }}>remove</button>
      <button onClick={() => undoRemove()}>undo</button>
    </div>
  )
}

describe('CartContext undo flow', () => {
  it('removes and undoes an item', async () => {
    render(<CartProvider><TestConsumer /></CartProvider>)
    const addBtn = screen.getByText('add')
    const removeBtn = screen.getByText('remove')
    const undoBtn = screen.getByText('undo')

    // add item
    await act(async () => {
      addBtn.click()
    })
    expect(screen.getByTestId('count').textContent).toBe('1')

    // remove item
    await act(async () => {
      removeBtn.click()
    })
    expect(screen.getByTestId('count').textContent).toBe('0')
    expect(screen.getByTestId('undo-count').textContent).toBe('1')

    // undo removal
    await act(async () => {
      undoBtn.click()
    })
    expect(screen.getByTestId('count').textContent).toBe('1')
    expect(screen.getByTestId('undo-count').textContent).toBe('0')
  })
})
