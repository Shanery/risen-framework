<template>
  <component
    class="contenteditable"
    :is="tag"
    :class="{'is-editing': editing}"
    :contenteditable="editing || alwaysEditable"
    ref="input"
    :placeholder="placeholder"

    @keydown.tab.exact.prevent.stop="handleTab"

    @keydown.shift.tab.prevent.stop="handleShiftTab"

    @input="updateInput"
    @dblclick="edit"
    @keydown.enter.prevent.stop="handleEnter"
    @keydown.backspace="handleBackspace"
    @focus="handleFocus"
    @blur="handleBlur"
    @click="handleClick"
    v-html="content"
  />
</template>

<script>
import { debounce } from 'lodash'
export default {
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    placeholder: {
      type: String,
    },
    value: {
      type: String,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    alwaysEditable: {
      type: Boolean,
      default: false,
    },
    stopPropagation: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      editing: false,
      content: '',
    }
  },
  watch: {
    value (newValue, oldValue) {
      if (!this.editing) {
        this.content = newValue
        if (this.value === '' || this.value === '\n') {
          this.$el.innerHTML = ''
        }
      }
    },
  },
  mounted () {
    this.content = this.value
    if (this.isNew) {
      this.edit()
    }

    if (this.value === '' || this.value === '\n') {
      this.$el.innerHTML = ''
    }
  },
  methods: {
    handleTab () {
      const caretPosition = this.getCaretIndex()

      this.$emit('indent', caretPosition)
    },
    handleShiftTab () {
      const caretPosition = this.getCaretIndex()

      this.$emit('outdent', caretPosition)
    },
    handleFocus () {
      this.editing = true
      this.$nextTick(() => {
        this.$emit('focus')
      })
    },
    handleBlur () {
      this.$emit('blur')
      this.save()
    },
    focus () {
      this.$el.focus()
    },
    edit () {
      this.editing = true

      // Select all of the contents
      if (!this.alwaysEditable) {
        const input = this.$el
        this.$nextTick(() => {
          input.focus()
          document.execCommand('selectAll', false, null)
        })
      }
    },
    save () {
      this.editing = false
      this.$emit('save', this.$el.innerText)
      this.$emit('blur')
    },
    handleBackspace ($event) {
      const position = this.getCaretIndex()

      if (position < 1) {
        $event.preventDefault()
        this.$emit('removeline')
      }
    },
    handleEnter () {
      const position = this.getCaretIndex()
      this.$el.blur()
      this.$nextTick(() => {
        this.$emit('enter', position)
      })
    },
    updateInput: function () {
      this.$emit('input', this.$el.innerText)
    },
    handleClick (e) {
      if (this.stopPropagation) {
        e.stopPropagation()
      }
    },
    setCaretPosition (position) {
      const range = document.createRange()
      const sel = window.getSelection()

      this.focus()
      range.setStart(this.$el.childNodes[0], position)

      range.collapse(true)

      sel.removeAllRanges()
      sel.addRange(range)
    },
    getCaretIndex () {
      const element = this.$el

      let position = 0
      const isSupported = typeof window.getSelection !== 'undefined'
      if (isSupported) {
        const selection = window.getSelection()
        if (selection.rangeCount !== 0) {
          const range = window.getSelection().getRangeAt(0)
          const preCaretRange = range.cloneRange()
          preCaretRange.selectNodeContents(element)
          preCaretRange.setEnd(range.endContainer, range.endOffset)
          position = preCaretRange.toString().length
        }
      }

      return position
    },
    getInputSelection () {
      const range = document.createRange()

      const selection = window.getSelection()
    },
  },
}
</script>

<style lang="stylus" scoped>
.contenteditable {
  outline: none;
  min-height: 1em;

  &:focus:empty:before {
    content: attr(placeholder);
    color: #AAA;
    display: block; /* For Firefox */
  }
  // &:focus {
  //     border-bottom: 2px solid #CCC;
  //     padding-bottom: 0px;
  // }
}
</style>
