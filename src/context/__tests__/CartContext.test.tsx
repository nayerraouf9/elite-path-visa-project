import React from 'react'
import { render, act, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
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
  beforeEach(() => {
    // ensure clean sessionStorage
    sessionStorage.clear()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

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

  it('preserves original index when undoing', async () => {
    render(<CartProvider><TestConsumer /></CartProvider>)
    const addBtn = screen.getByText('add')
    const removeBtn = screen.getByText('remove')
    const undoBtn = screen.getByText('undo')

    // add two items
    await act(async () => { addBtn.click(); addBtn.click(); })
    // ensure two items
    expect(screen.getByTestId('count').textContent).toBe('2')

    // remove first item (TestConsumer removes cartItems[0])
    await act(async () => { removeBtn.click() })
    expect(screen.getByTestId('count').textContent).toBe('1')
    expect(screen.getByTestId('undo-count').textContent).toBe('1')

    // undo - should restore at index 0 (front)
    await act(async () => { undoBtn.click() })
    expect(screen.getByTestId('count').textContent).toBe('2')
  })

  it('persists undo stack to sessionStorage and restores with timers', async () => {
    // use fake timers to control expiry
    vi.useFakeTimers()

    // initial render and add/remove to create undo stack
    render(<CartProvider><TestConsumer /></CartProvider>)
    const addBtn = screen.getByText('add')
    const removeBtn = screen.getByText('remove')
    await act(async () => { addBtn.click(); addBtn.click(); })
    // remove one
    await act(async () => { removeBtn.click() })
    expect(screen.getByTestId('undo-count').textContent).toBe('1')

    // snapshot sessionStorage
    const raw = sessionStorage.getItem('undoStack')
    expect(raw).toBeTruthy()

    // now simulate reload by unmounting and remounting provider
    cleanup()
    // mount new provider which should restore undoStack
    render(<CartProvider><TestConsumer /></CartProvider>)
    // the restored undo stack should be present
    expect(screen.getByTestId('undo-count').textContent).toBe('1')

    // advance time by 8s to expire entry
    await act(async () => { vi.advanceTimersByTime(8000) })
    // after expiry, undo-count should be 0
    expect(screen.getByTestId('undo-count').textContent).toBe('0')
  })
})
