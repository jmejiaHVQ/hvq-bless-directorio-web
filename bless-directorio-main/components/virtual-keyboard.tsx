"use client"

import { Button } from "@/components/ui/button"
import { XIcon, MoveIcon, ChevronsDownIcon, EraserIcon, LockIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useRef, useState } from "react"
import Keyboard from "react-simple-keyboard"
import type { KeyboardLayoutObject } from "react-simple-keyboard"
import type { VirtualKeyboardProps } from "@/lib/types"

export function VirtualKeyboard({ value, onChange, onClose, placeholder, onEnter }: VirtualKeyboardProps) {
  const keyboardRef = useRef<HTMLDivElement>(null)
  const keyboardInstanceRef = useRef<any>(null)
  const [layoutName, setLayoutName] = useState<"default" | "shift">("default")
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  useEffect(() => {
    // Añadir clase para mostrar con animación
    const timer = setTimeout(() => {
      if (keyboardRef.current) {
        keyboardRef.current.classList.add('show')
        // Posicionar un poco más abajo para no tapar el buscador
        const rect = keyboardRef.current.getBoundingClientRect()
        const tentativeTop = (window.innerHeight - rect.height) * 0.65
        const top = Math.min(Math.max(20, tentativeTop), window.innerHeight - rect.height - 20)
        const left = Math.max(20, (window.innerWidth - rect.width) / 2)
        setPosition({ top, left })
      }
    }, 10)
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (keyboardInstanceRef.current) {
      keyboardInstanceRef.current.setInput(value || "")
    }
  }, [value])

  const handleKeyPress = (button: string) => {
    if (button === "{shift}" || button === "{lock}") {
      setLayoutName((prev) => (prev === "default" ? "shift" : "default"))
      return
    }
    if (button === "{enter}") {
      if (onEnter) onEnter()
      return
    }
  }

  // Dragging handlers (mouse)
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.clientX - dragOffsetRef.current.x
      const y = e.clientY - dragOffsetRef.current.y
      setPosition({
        left: Math.min(Math.max(0, x), window.innerWidth - 50),
        top: Math.min(Math.max(0, y), window.innerHeight - 50)
      })
    }
    const handleUp = () => setIsDragging(false)
    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mouseup', handleUp)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mouseup', handleUp)
    }
  }, [isDragging])

  // Dragging handlers (touch)
  useEffect(() => {
    const handleMove = (e: TouchEvent) => {
      if (!isDragging) return
      const t = e.touches[0]
      if (!t) return
      const x = t.clientX - dragOffsetRef.current.x
      const y = t.clientY - dragOffsetRef.current.y
      setPosition({
        left: Math.min(Math.max(0, x), window.innerWidth - 50),
        top: Math.min(Math.max(0, y), window.innerHeight - 50)
      })
    }
    const handleEnd = () => setIsDragging(false)
    window.addEventListener('touchmove', handleMove, { passive: false })
    window.addEventListener('touchend', handleEnd)
    return () => {
      window.removeEventListener('touchmove', handleMove)
      window.removeEventListener('touchend', handleEnd)
    }
  }, [isDragging])

  const startDragMouse = (e: React.MouseEvent) => {
    if (!keyboardRef.current) return
    const rect = keyboardRef.current.getBoundingClientRect()
    dragOffsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    setIsDragging(true)
  }
  const startDragTouch = (e: React.TouchEvent) => {
    if (!keyboardRef.current) return
    const t = e.touches[0]
    const rect = keyboardRef.current.getBoundingClientRect()
    dragOffsetRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top }
    setIsDragging(true)
  }

  // Layout del teclado y etiquetas de teclas
  const layout: KeyboardLayoutObject = {
    default: [
      "q w e r t y u i o p",
      "a s d f g h j k l ñ",
      "{shift} z x c v b n m {bksp}",
      "{space}"
    ],
    shift: [
      "Q W E R T Y U I O P",
      "A S D F G H J K L Ñ",
      "{shift} Z X C V B N M {bksp}",
      "{space}"
    ]
  }

  const display = {
    "{bksp}": "⌫",
    "{enter}": "Enter",
    "{shift}": "⇧",
    "{space}": "Espacio"
  }

  const handleClose = () => {
    if (keyboardRef.current) {
      keyboardRef.current.classList.remove('show')
      // Esperar a que termine la animación antes de cerrar
      setTimeout(() => {
        onClose()
      }, 300)
    } else {
      onClose()
    }
  }

  return (
    <div className="virtual-keyboard-overlay" onClick={handleClose}>
      <div 
        ref={keyboardRef}
        className={`virtual-keyboard-content${isDragging ? ' dragging' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={position ? { top: position.top, left: position.left } : undefined}
      >


        <Keyboard
          keyboardRef={(r) => (keyboardInstanceRef.current = r)}
          layoutName={layoutName}
          layout={layout}
          display={display}
          onChange={(input: string) => onChange(input)}
          onKeyPress={handleKeyPress}
        />

        {/* Controles en la parte inferior centrados */}
        <div className="virtual-keyboard-bottom-controls">
          <Button 
            variant="ghost" 
            size="icon" 
            className="virtual-keyboard-nudge-btn" 
            onClick={() => setPosition((pos) => pos ? { ...pos, top: Math.min(pos.top + 60, window.innerHeight - (keyboardRef.current?.getBoundingClientRect().height || 0) - 20) } : pos)} 
            aria-label="Bajar teclado"
            style={{ backgroundColor: '#8C3048', color: 'white' }}
          >
            <ChevronsDownIcon className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="virtual-keyboard-drag-btn" 
            onMouseDown={startDragMouse} 
            onTouchStart={startDragTouch} 
            aria-label="Mover teclado"
            style={{ backgroundColor: '#8C3048', color: 'white' }}
          >
            <MoveIcon className="w-5 h-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="virtual-keyboard-clear-btn" 
            onClick={() => onChange("")} 
            aria-label="Limpiar texto"
            style={{ backgroundColor: '#8C3048', color: 'white' }}
          >
            <Trash2Icon className="w-5 h-5" />
          </Button>
          <Button 
            onClick={handleClose} 
            variant="ghost" 
            size="icon" 
            className="virtual-keyboard-close-btn"
            style={{ backgroundColor: '#8C3048', color: 'white' }}
          >
            <XIcon className="w-5 h-5" />
            <span className="sr-only">Cerrar teclado</span>
          </Button>
        </div>
      </div>

      <style jsx>{`
        .virtual-keyboard-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          opacity: 0;
          animation: fadeIn 0.3s forwards;
        }
        
        @keyframes fadeIn {
          to { opacity: 1; }
        }
        
        .virtual-keyboard-content {
          position: fixed;
          background-color: white;
          border-radius: 16px;
          width: 100%;
          max-width: 800px;
          padding: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        }
        .virtual-keyboard-content.dragging {
          box-shadow: 0 16px 28px rgba(0,0,0,0.28);
        }
        
        .virtual-keyboard-close-btn {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 10;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .virtual-keyboard-bottom-controls {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e5e5;
        }
        
        .virtual-keyboard-drag-btn, 
        .virtual-keyboard-nudge-btn, 
        .virtual-keyboard-clear-btn,
        .virtual-keyboard-close-btn {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .virtual-keyboard-keys {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .virtual-keyboard-row {
          display: flex;
          justify-content: center;
          gap: 6px;
        }
        
        .virtual-keyboard-key {
          min-width: 44px;
          height: 44px;
          font-size: 1.125rem;
          font-weight: 500;
          border-radius: 8px;
          flex: 1;
        }
        
        .virtual-keyboard-action-btn {
          height: 44px;
          font-size: 1rem;
          font-weight: 500;
          border-radius: 8px;
          flex: 1;
          max-width: 120px;
        }
        
        .virtual-keyboard-action-btn.delete {
          background-color: #f87171;
        }
        
        .virtual-keyboard-action-btn.clear {
          background-color: #94a3b8;
        }
        
        .virtual-keyboard-action-btn.enter {
          background-color: #4ade80;
        }
        
        @media (min-width: 640px) {
          .virtual-keyboard-content {
            padding: 24px;
          }
          
          .virtual-keyboard-key {
            min-width: 50px;
            height: 50px;
            font-size: 1.25rem;
          }
          
          .virtual-keyboard-action-btn {
            height: 50px;
            font-size: 1.125rem;
            max-width: 140px;
          }
        }
      `}</style>
    </div>
  )
}