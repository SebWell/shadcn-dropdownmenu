<template>
  <div class="relative">
    <!-- Dropdown Trigger -->
    <div
      ref="triggerRef"
      @click="toggleDropdown"
      @keydown="handleTriggerKeyDown"
      :class="cn('inline-block', content.triggerClass)"
      :tabindex="content.disabled ? -1 : 0"
    >
      <slot name="trigger">
        <button
          type="button"
          :disabled="content.disabled"
          :class="cn(
            'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            'h-10 px-4 py-2'
          )"
        >
          {{ content.triggerText || 'Open Menu' }}
          <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </slot>
    </div>

    <!-- Dropdown Content -->
    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="menuRef"
        role="menu"
        :aria-orientation="'vertical'"
        :style="menuStyles"
        @click.stop
        @keydown="handleMenuKeyDown"
        :class="cn(
          'absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          placementClasses,
          content.size === 'sm' && 'min-w-[6rem] text-xs',
          content.size === 'lg' && 'min-w-[12rem]',
          content.contentClass
        )"
      >
        <!-- Menu Items -->
        <div
          v-for="(item, index) in menuItems"
          :key="item.id || index"
          role="menuitem"
          :tabindex="item.disabled ? -1 : 0"
          @click="handleItemClick(item, index)"
          @mouseenter="highlightedIndex = index"
          @keydown="handleItemKeyDown($event, item, index)"
          :class="cn(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
            'focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            !item.disabled && 'hover:bg-accent hover:text-accent-foreground',
            highlightedIndex === index && 'bg-accent text-accent-foreground',
            item.disabled && 'pointer-events-none opacity-50',
            item.variant === 'destructive' && 'text-destructive focus:bg-destructive focus:text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground',
            item.type === 'separator' && 'h-px bg-border my-1 cursor-default pointer-events-none',
            item.customClass
          )"
        >
          <!-- Separator -->
          <template v-if="item.type === 'separator'">
            <div class="h-px bg-border w-full"></div>
          </template>

          <!-- Regular Item -->
          <template v-else>
            <!-- Icon -->
            <span v-if="item.icon" class="mr-2 h-4 w-4 flex-shrink-0">
              <svg v-if="item.icon === 'check'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <svg v-else-if="item.icon === 'edit'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              <svg v-else-if="item.icon === 'delete'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6l-1 14H6L5 6m5 0V4a2 2 0 012-2h0a2 2 0 012 2v2"></path>
              </svg>
              <svg v-else-if="item.icon === 'copy'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
              </svg>
              <svg v-else-if="item.icon === 'settings'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
              </svg>
              <span v-else v-html="item.icon"></span>
            </span>

            <!-- Label -->
            <span class="flex-1">{{ item.label }}</span>

            <!-- Shortcut -->
            <span v-if="item.shortcut" class="ml-auto text-xs tracking-widest opacity-60">
              {{ item.shortcut }}
            </span>

            <!-- Checkbox -->
            <span v-if="item.type === 'checkbox'" class="ml-auto">
              <svg v-if="item.checked" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>

            <!-- Radio -->
            <span v-if="item.type === 'radio'" class="ml-auto">
              <div v-if="item.checked" class="h-2 w-2 rounded-full bg-current"></div>
            </span>

            <!-- Submenu arrow -->
            <span v-if="item.submenu" class="ml-auto">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </template>
        </div>

        <!-- Empty state -->
        <div
          v-if="menuItems.length === 0"
          class="px-2 py-1.5 text-sm text-muted-foreground"
        >
          {{ content.emptyText || 'No items' }}
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { cn } from './cn.js'

const props = defineProps({
  content: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'itemClick', 'open', 'close'])

// Refs
const triggerRef = ref(null)
const menuRef = ref(null)
const isOpen = ref(props.modelValue)
const menuStyles = ref({})
const highlightedIndex = ref(-1)

// Computed
const placement = computed(() => props.content.placement || 'bottom-start')

const placementClasses = computed(() => {
  const classes = {
    'bottom-start': 'data-[side=bottom]:slide-in-from-top-2',
    'bottom-end': 'data-[side=bottom]:slide-in-from-top-2',
    'top-start': 'data-[side=top]:slide-in-from-bottom-2',
    'top-end': 'data-[side=top]:slide-in-from-bottom-2',
    'right-start': 'data-[side=right]:slide-in-from-left-2',
    'left-start': 'data-[side=left]:slide-in-from-right-2'
  }
  return classes[placement.value] || classes['bottom-start']
})

const menuItems = computed(() => props.content.items || [])

// Watch for external changes
watch(() => props.modelValue, (newValue) => {
  if (newValue !== isOpen.value) {
    if (newValue) {
      openDropdown()
    } else {
      closeDropdown()
    }
  }
})

// Methods
const toggleDropdown = () => {
  if (props.content.disabled) return
  
  if (isOpen.value) {
    closeDropdown()
  } else {
    openDropdown()
  }
}

const openDropdown = async () => {
  if (props.content.disabled) return
  
  isOpen.value = true
  emit('update:modelValue', true)
  emit('open')
  
  await nextTick()
  updatePosition()
  
  // Focus first item
  highlightedIndex.value = findNextEnabledItem(-1)
}

const closeDropdown = () => {
  isOpen.value = false
  emit('update:modelValue', false)
  emit('close')
  
  highlightedIndex.value = -1
  triggerRef.value?.focus()
}

const handleItemClick = (item, index) => {
  if (item.disabled || item.type === 'separator') return
  
  emit('itemClick', { item, index })
  
  // Handle checkbox/radio state
  if (item.type === 'checkbox') {
    item.checked = !item.checked
  } else if (item.type === 'radio') {
    // Uncheck other radio items in the same group
    menuItems.value.forEach(menuItem => {
      if (menuItem.type === 'radio' && menuItem.group === item.group) {
        menuItem.checked = false
      }
    })
    item.checked = true
  }
  
  if (props.content.closeOnClick !== false && item.type !== 'checkbox' && item.type !== 'radio') {
    closeDropdown()
  }
}

const handleTriggerKeyDown = (event) => {
  if (props.content.disabled) return
  
  switch (event.key) {
    case 'Enter':
    case ' ':
    case 'ArrowDown':
      event.preventDefault()
      openDropdown()
      break
      
    case 'Escape':
      closeDropdown()
      break
  }
}

const handleMenuKeyDown = (event) => {
  switch (event.key) {
    case 'Escape':
      closeDropdown()
      break
      
    case 'ArrowDown':
      event.preventDefault()
      highlightedIndex.value = findNextEnabledItem(highlightedIndex.value)
      break
      
    case 'ArrowUp':
      event.preventDefault()
      highlightedIndex.value = findPrevEnabledItem(highlightedIndex.value)
      break
      
    case 'Home':
      event.preventDefault()
      highlightedIndex.value = findNextEnabledItem(-1)
      break
      
    case 'End':
      event.preventDefault()
      highlightedIndex.value = findPrevEnabledItem(menuItems.value.length)
      break
  }
}

const handleItemKeyDown = (event, item, index) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleItemClick(item, index)
  }
}

const findNextEnabledItem = (currentIndex) => {
  for (let i = currentIndex + 1; i < menuItems.value.length; i++) {
    if (!menuItems.value[i].disabled && menuItems.value[i].type !== 'separator') {
      return i
    }
  }
  // Wrap around
  for (let i = 0; i <= currentIndex; i++) {
    if (!menuItems.value[i].disabled && menuItems.value[i].type !== 'separator') {
      return i
    }
  }
  return -1
}

const findPrevEnabledItem = (currentIndex) => {
  for (let i = currentIndex - 1; i >= 0; i--) {
    if (!menuItems.value[i].disabled && menuItems.value[i].type !== 'separator') {
      return i
    }
  }
  // Wrap around
  for (let i = menuItems.value.length - 1; i >= currentIndex; i--) {
    if (!menuItems.value[i].disabled && menuItems.value[i].type !== 'separator') {
      return i
    }
  }
  return -1
}

const updatePosition = () => {
  if (!triggerRef.value || !menuRef.value) return
  
  const triggerRect = triggerRef.value.getBoundingClientRect()
  const menuRect = menuRef.value.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  const offset = props.content.offset || 4
  let top, left
  
  // Calculate position based on placement
  switch (placement.value) {
    case 'bottom-start':
      top = triggerRect.bottom + offset + window.scrollY
      left = triggerRect.left + window.scrollX
      break
      
    case 'bottom-end':
      top = triggerRect.bottom + offset + window.scrollY
      left = triggerRect.right - menuRect.width + window.scrollX
      break
      
    case 'top-start':
      top = triggerRect.top - menuRect.height - offset + window.scrollY
      left = triggerRect.left + window.scrollX
      break
      
    case 'top-end':
      top = triggerRect.top - menuRect.height - offset + window.scrollY
      left = triggerRect.right - menuRect.width + window.scrollX
      break
      
    case 'right-start':
      top = triggerRect.top + window.scrollY
      left = triggerRect.right + offset + window.scrollX
      break
      
    case 'left-start':
      top = triggerRect.top + window.scrollY
      left = triggerRect.left - menuRect.width - offset + window.scrollX
      break
      
    default:
      top = triggerRect.bottom + offset + window.scrollY
      left = triggerRect.left + window.scrollX
  }
  
  // Adjust for viewport boundaries
  if (left < 8) {
    left = 8
  } else if (left + menuRect.width > viewportWidth - 8) {
    left = viewportWidth - menuRect.width - 8
  }
  
  if (top < 8) {
    top = 8
  } else if (top + menuRect.height > viewportHeight + window.scrollY - 8) {
    top = viewportHeight + window.scrollY - menuRect.height - 8
  }
  
  menuStyles.value = {
    position: 'absolute',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: 50
  }
}

const handleOutsideClick = (event) => {
  if (!triggerRef.value?.contains(event.target) && !menuRef.value?.contains(event.target)) {
    closeDropdown()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleOutsideClick)
  window.addEventListener('resize', updatePosition)
  window.addEventListener('scroll', updatePosition)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick)
  window.removeEventListener('resize', updatePosition)
  window.removeEventListener('scroll', updatePosition)
})

// Expose methods
defineExpose({
  open: openDropdown,
  close: closeDropdown,
  toggle: toggleDropdown
})
</script>

<style>
/* Import global shadcn/ui styles */
@import './globals.css';
</style> 