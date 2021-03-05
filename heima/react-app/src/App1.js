import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, useSlate, Slate } from 'slate-react'
import {
  Editor,
  Transforms,
  createEditor,
  Node,
  Element as SlateElement,
} from 'slate'
// import { withHistory } from 'slate-history'


const deserialize = string => {
  // 分隔字符串，返回一个包含value的child数组。
  return string.split('\n').map(line => {
    return {
      children: [{ text: line }],
    }
  })
}

const serialize = value => {  
  return (
    value
      // 返回这个 value 中每一个段落中的子节点的字符串内容。
      .map(n => Node.string(n))
      // 用换行符（用换行符来区分段落）来连接他们。
      .join('\n')
  )
}

const App = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState(
    JSON.parse(localStorage.getItem('content')) ||
    [
    {
      type: 'paragraph',
      children: [{ text: '段落中的一段文本。' }],
    },
  ])

  return (
    <Slate
      editor={editor}
      value={value}
      // selection={selection}
      onChange={value => {
        setValue(value);
        // const content = JSON.stringify(value);
        // localStorage.setItem('content',content);
        console.log(value);
        const content = serialize(value);
        console.log(content);
      }}>
      <Editable />
    </Slate>
  )
}

export default App
